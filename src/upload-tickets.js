
import config from '../config/config.js';
//import * as TicketParser from './csv-ticket-parser.js';
import { getTicketUploader } from './uploader.js';

const file = 'ServiceDeskAdmin.csv';
//const file = 'ServiceDeskAdmin-small.csv';
const PER = 1000; // Send a BulkLoad Request per this number
//const PER = 5; // Send a BulkLoad Request per this number

//const uploader = getUploader(config, TicketParser);
const uploader = getTicketUploader(config);
uploader.uploadCsv(file, PER);

