
import { expect } from 'chai';

import * as Helper from './helper.js';
import * as parser from '../src/csv-detail-parser.js';

const line = '"DetailNotes","OriginalModified","Original, Created, By","TimeSpent","OriginalID","Original, Modified, By","Original, Created","Title","Ticket"';


const expArray = ['DetailNotes', 'OriginalModified', 'Original, Created, By', 'TimeSpent', 'OriginalID', 'Original, Modified, By', 'Original, Created', 'Title', 'Ticket'];

const expObj = {
  detailNotes: 'DetailNotes',
  modified: 'OriginalModified',
  createdBy: 'Original, Created, By',
  timeSpent: 'TimeSpent',
  id: 'OriginalID',
  modifiedBy: 'Original, Modified, By',
  created: 'Original, Created',
  title: 'Title',
  ticketId: 'Ticket'
};

const expCols = {
  id: { type: 'INT4', opts: { nullable: false } },
  ticketId: { type: 'INT4', opts: { nullable: false } },
  title: { type: 'NVARCHAR', opts: { nullable: true, length: 1024 } },
  detailNotes: { type: 'NTEXT', opts: { nullable: true } },
  timeSpent: { type: 'INT4', opts: { nullable: true } },
  created: { type: 'DATETIME', opts: { nullable: true } },
  modified: { type: 'DATETIME', opts: { nullable: true } },
  createdBy: { type: 'NVARCHAR', opts: { nullable: true, length: 256 } },
  modifiedBy: { type: 'NVARCHAR', opts: { nullable: true, length: 256 } }
};

describe('#parse', () => {
  it('splits a comma-separated-string into array', () => {
    expect(parser.parse(line)).to.be.eql(expArray);
  });
});

describe('#convToParams', () => {
  it('splits a comma-separated-string into array', () => {
    expect(parser.convToParams(line)).to.be.eql(expObj);
  });
});

describe('#addColumns', () => {
  it('add columns to BulkLoader instance', () => {
    const r = Helper.createFakeBulkLoader();
    parser.addColumns(r);
    expect(r.getColumns()).to.eql(expCols);
  });
});
