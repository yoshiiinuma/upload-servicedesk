
import { TYPES } from 'tedious'

import parse from './csv-parser.js';

export const convToParams = (line) => {
  let [ detailNotes, modified, createdBy,
    timeSpent, id, modifiedBy, created,
    title, ticketId ] = parse(line.trim());

  id = parseInt(id);
  ticketId = parseInt(ticketId);
  if (timeSpent) timeSpent = parseInt(timeSpent);
  if (created) created = new Date(created);
  if (modified) modified = new Date(modified);

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
  bulkLoader.addColumn('timeSpent', TYPES.Int, { nullable: true });
  bulkLoader.addColumn('detailNotes', TYPES.NVarChar, { nullable: true, length: 63999 });
  bulkLoader.addColumn('createdBy', TYPES.NVarChar, { nullable: true, length: 256 });
  bulkLoader.addColumn('created', TYPES.DateTime, { nullable: true });
  bulkLoader.addColumn('modifiedBy', TYPES.NVarChar, { nullable: true, length: 256 });
  bulkLoader.addColumn('modified', TYPES.DateTime, { nullable: true });
};

