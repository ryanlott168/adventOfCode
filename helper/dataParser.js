import fs from 'fs';
import Promise from 'bluebird';

const readFileAsync= Promise.promisify(fs.readFile);

export default async fileName => {
    let data = await readFileAsync(fileName, 'utf8');
    data = data.split('\n').map(num => parseInt(num));
    return data;
};