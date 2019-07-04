
import { Connection, Request } from 'tedious'

const MSSQL = {};

const connect = (config) => {
  return new Promise((resolve, reject) => {
    const conn = new Connection(config);

    conn.on('error', (err) => {
      console.log('MSSQL Connect Error');
      conn.close();
      reject(err);
    });

    conn.on('connect', (err) => {
      if (err) {
        console.log('MSSQL Connect Connection Error');
        console.log(err);
        reject(err);
        return;
      }
      resolve(conn);
    });
  });
};

const execSql = (conn, sql) => {
  return new Promise((resolve, reject) => {
    const req = new Request(sql, (err, rowCount, rows) => {
      if (err) {
        console.log('MSSQL ExecSql Request Error');
        console.log(err);
        conn.close();
        reject(err);
        return;
      }
      resolve(conn, rowCount, rows);
    })

    req.on('error', (err) => {
      console.log('MSSQL ExecSql Error');
      console.log(err);
      conn.close();
      reject(err);
    });

    conn.execSql(req);
  });
}

MSSQL.exec = (config, sql) => {
  return connect(config)
    .then((conn) => execSql(conn, sql))
    .then((conn, rowCount) => {
      if (rowCount) {
        console.log('Row Count: ' + rowCount);
      }
      conn.close();
    })
    .catch((err) => console.log(err))
}

const newBulkLoad = (conn, table, callback) => {
  const opts = { keepNulls: true };

  return new Promise((resolve, reject) => {
    const bulkLoad = conn.newBulkLoad(table, opts, callback);
    resolve(bulkLoad);
  });
};

MSSQL.createConnection = connect;
MSSQL.createBulkLoad = newBulkLoad;

export default MSSQL;

