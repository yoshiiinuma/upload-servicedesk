
import config from '../config/config.js';
import MSSQL from './mssql-client.js';
import loadSql from './sql-loader.js'; 


const sql = loadSql('create-ticket-detail-table');
MSSQL.exec(config, sql);

