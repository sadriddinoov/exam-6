import fs from 'fs';
import { resolve } from 'path';

function read(fileName) {
  let data = fs.readFileSync(resolve('database', fileName + '.json'), 'utf-8')
  return JSON.parse(data)
}


function write(fileName, data) {
  fs.writeFileSync(resolve('database', fileName + '.json'), JSON.stringify(data, null, 4))
  return true
}


export {
  read,
  write
}