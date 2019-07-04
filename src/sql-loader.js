
import path from 'path'
import fs from 'fs'

/**
 * id: sql filename without .sql extension
 */
const loadSql = (id) => {
  if (!id) {
    throw new Error('LOADSQL No Id Specified')
  }
  if (!id.endsWith('.sql')) id += '.sql';
  const file = path.resolve(path.dirname(fs.realpathSync(__filename)), '../sql', id);
  if (!fs.existsSync(file)) {
    throw new Error('LOADSQL File Not Found: ' + file)
  }
  return fs.readFileSync(file, 'utf8');
}

export default loadSql;

