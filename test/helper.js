
export const createFakeBulkLoader = () => {
  let cols = {};

  return {
    getColumns: () => {
      return cols;
    },
    addColumn: (name, type, opts) => {
      cols[name] = { type: type.type, opts };
    }
  };
};

