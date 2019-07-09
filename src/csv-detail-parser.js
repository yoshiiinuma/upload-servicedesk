
import { TYPES } from 'tedious'

const rgxTicketCsv = /("([^"]*)")*,?(.*)$/;

export const parse = (line) => {
  const columns = [];
  do {
    var match = rgxTicketCsv.exec(line);
    //console.log('----------------------------------------------');
    //console.log('>>>' + match[2] + '<<<');
    //console.log('----------------------------------------------');
    columns.push(match[2]);
    line = match[3];
    //console.log(line);
    //console.log(match);
  } while (!!line && line.length > 0)
  
  return columns;
}

export const convToParams = (line) => {
  let [ detailNotes, modified, createdBy,
    timeSpent, id, modifiedBy, created,
    title, ticketId ] = parse(line.trim());

  const r = {
    detailNotes, modified, createdBy,
    timeSpent, id, modifiedBy, created,
    title, ticketId
  };

  return r;
}

/*
 * bulkLoader: BulkLoad instance: tedious (new Connection()).newBulkLoad() returns
 */
export const addColumns = (bulkLoader) => {
  bulkLoader.addColumn('id', TYPES.Int, { nullable: false });
  bulkLoader.addColumn('ticketId', TYPES.Int, { nullable: false });
  bulkLoader.addColumn('title', TYPES.NVarChar, { nullable: true, length: 1024 });
  bulkLoader.addColumn('detailNotes', TYPES.NText, { nullable: true });
  bulkLoader.addColumn('timeSpent', TYPES.Int, { nullable: true });
  bulkLoader.addColumn('createdBy', TYPES.NVarChar, { nullable: true, length: 256 });
  bulkLoader.addColumn('created', TYPES.DateTime, { nullable: true });
  bulkLoader.addColumn('modifiedBy', TYPES.NVarChar, { nullable: true, length: 256 });
  bulkLoader.addColumn('modified', TYPES.DateTime, { nullable: true });
};

