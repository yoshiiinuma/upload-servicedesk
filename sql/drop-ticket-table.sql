IF EXISTS (SELECT * FROM sysobjects WHERE name='Tickets' AND xtype='U')
  DROP TABLE Tickets
