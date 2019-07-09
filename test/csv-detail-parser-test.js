
import { expect } from 'chai';

import * as Helper from './helper.js';
import * as parser from '../src/csv-detail-parser.js';

const line1 = '"DetailNotes","03/03/2019 04:04:04","Original, Created, By",' +
  '"555","123","Original, Modified, By","01/01/2019 02:02:02","Title","234"';

const expArray = [
  'DetailNotes', '03/03/2019 04:04:04', 'Original, Created, By', '555',
  '123', 'Original, Modified, By', '01/01/2019 02:02:02', 'Title', '234'];

const expObj = {
  detailNotes: 'DetailNotes',
  modified: new Date('03/03/2019 04:04:04'),
  createdBy: 'Original, Created, By',
  timeSpent: 555,
  id: 123,
  modifiedBy: 'Original, Modified, By',
  created: new Date('01/01/2019 02:02:02'),
  title: 'Title',
  ticketId: 234
};

const expCols = {
  id: { type: 'INT4', opts: { nullable: false } },
  ticketId: { type: 'INT4', opts: { nullable: false } },
  title: { type: 'NVARCHAR', opts: { nullable: true, length: 1024 } },
  detailNotes: { type: 'NVARCHAR', opts: { nullable: true, length: 63999 } },
  timeSpent: { type: 'INT4', opts: { nullable: true } },
  created: { type: 'DATETIME', opts: { nullable: true } },
  modified: { type: 'DATETIME', opts: { nullable: true } },
  createdBy: { type: 'NVARCHAR', opts: { nullable: true, length: 256 } },
  modifiedBy: { type: 'NVARCHAR', opts: { nullable: true, length: 256 } }
};

describe('#convToParams', () => {
  it('splits a comma-separated-string into array', () => {
    expect(parser.convToParams(line1)).to.be.eql(expObj);
  });
});

describe('#addColumns', () => {
  it('add columns to BulkLoader instance', () => {
    const r = Helper.createFakeBulkLoader();
    parser.addColumns(r);
    expect(r.getColumns()).to.eql(expCols);
  });
});
