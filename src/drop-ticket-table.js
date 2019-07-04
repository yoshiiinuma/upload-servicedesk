
import config from '../config/config.js';
import MSSQL from './mssql-client.js';
import loadSql from './sql-loader.js'; 

const sql = loadSql('drop-ticket-table');
MSSQL.exec(config, sql);

