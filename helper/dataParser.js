import fs from 'fs';
import Promise from 'bluebird';

const readFileAsync= Promise.promisify(fs.readFile);

/**
 * Returns parsed data
 *
 * @param {string} fileName The file location where the desired data is located.
 * @param {function} parsingFn A function used to parse the data in a problem specific way.
 * This function should return the post-parsed data. (optional)
 */
export default async (fileName, separator, parsingFn) => {
    let data = await readFileAsync(fileName, 'utf8');
    data = data.split(separator ? separator : '\n');

    return parsingFn ? parsingFn(data) : data;
};