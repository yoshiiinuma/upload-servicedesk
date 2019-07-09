
const rgxCsv = /("([^"]*)")*,?(.*)$/;
const rgxDDQ = /(?<!,)""(?!,)/g;

const parse = (line) => {
  if (rgxDDQ.test(line)) {
    line = line.replace(rgxDDQ, "'");
  }
  const columns = [];
  do {
    var match = rgxCsv.exec(line);
    //console.log('----------------------------------------------');
    //console.log('>>>' + match[2] + '<<<');
    //console.log('----------------------------------------------');
    columns.push(match[2]);
    if (line === match[3]) {
      throw new Error('CSVDetailParser Infinite Loop: ' + line);
    }
    line = match[3];
    //console.log(line);
    //console.log(match);
  } while (!!line && line.length > 0)
  
  return columns;
}

export default parse;
