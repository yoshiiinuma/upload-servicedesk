
import fs from 'fs';
import readline from 'readline';
import { Connection, Request } from 'tedious'

import MSSQL from './mssql-client.js';
import loadSql from './sql-loader.js'; 
import createTaskRunner from './task-runner.js';

const getUploader = (config, parser) => {

  const setupBulkLoader = async (config, table, id) => {
    console.log('SetupBulkload Started with Task ' + id);
    const conn = await MSSQL.createConnection(config);
    const bulkLoader = await MSSQL.createBulkLoad(conn, 'Tickets', (err, rowCount) => {
        if (err) {
          console.log('SetupBulkLoad Error Task ' + id);
          console.log(err);
          conn.emit('BULKLOAD-ERROR', err);
        } else {
          console.log('SetupBulkLoad Callback End with Task ' + id);
          if (rowCount) {
            console.log('SetupBulkLoad Row Count: ' + rowCount);
          }
          conn.emit('BULKLOAD-END');
        }
      });

    parser.addColumns(bulkLoader);
    return [ conn, bulkLoader ];
  };

  const createUploadTask = (dataSet, id) => {
    const data = dataSet;
    console.log('Creating Task ' + id + ' with ' + data.length + ' records');

    return async () => {
      console.log('Starting Task ' + id + ' with ' + data.length + ' records');

      const [ conn, bulkLoader ] = await setupBulkLoader(config, 'Tickets', id);
      data.forEach((params) => {
        bulkLoader.addRow(params);
      });

      return new Promise((resolve, reject) => {
        conn.on('BULKLOAD-END', () => {
          console.log('Completing Task ' + id + ' with ' + data.length + ' records');
          conn.close();
          resolve();
        });
        conn.on('BULKLOAD-ERROR', (err) => {
          console.log('EXECBULKLOAD ERROR FIRED: ' + id);
          conn.cancel();
          reject(err);
        });
        conn.execBulkLoad(bulkLoader);
      });
    };
  };

  /*
   * Parses CSV file, and creates upload tasks and puts into TaskRunner Queue.
   *
   * csv: csv file path
   * per: the number of records which uploader sends to SQL Server each time
   */
  const uploadCsv = async (csv, per) => {
    const runner = createTaskRunner();
    let cnt = 0;
    let curTaskId = 1;
    let set = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(csv),
      terminal: false
    });

    rl.on('error', (e) => {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 2');
      console.log(e)
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 2');
      runner.stop();
    });
    rl.on('close', async () => {
      console.log('UploadCsv Finished Reading CSV Total: ' + cnt + 'Lines');
      if (cnt > 0) {
        runner.push(createUploadTask(set, curTaskId++));
      }
      runner.stop();
    });
    rl.on('line', async (line) => {
      try {
        const params = parser.convToParams(line);
        if (params.id && params.id != 'id') {
          cnt += 1;
          //console.log('ID: ' + params.id + ', CNT: ' + cnt);
          set.push(params);
          if (cnt > 0 && cnt % per === 0) {
            runner.push(createUploadTask(set, curTaskId++));
            set = [];
            //cnt = 0;
          }
        }
      }
      catch (err) {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 1');
        console.log(err);
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 1');
        process.exit();
      }
    });

    runner.start();
  }

  return { uploadCsv };
};

export default getUploader;

