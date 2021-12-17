import { readFile } from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);

/**
 * Returns parsed data
 *
 * @param {string} fileName The file location where the desired data is located.
 * @param {function} parsingFn A function used to parse the data in a problem specific way.
 * This function should return the post-parsed data. (optional)
 */
 export default async (fileName: string, separator: string, parsingFn: Function): Promise<[]> => {
    const data = await readFileAsync(fileName, {encoding: 'utf8'});
    const dataArr = data.split(separator ? separator : '\n');

    return parsingFn ? parsingFn(dataArr) : dataArr;
}