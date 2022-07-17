import { dirname, relative } from 'path'
import { fileURLToPath } from 'url'

interface AbsoluteDirname {
    (url: string): string 
}
/**
 * Returns module's __dirname in ESM
 * @param {any} url filename url equivalent to import.module.dirname
 * @returns {any} The dirname path
 */

const getAbsoluteDirname: AbsoluteDirname = (url) => {
    return dirname(fileURLToPath(url))
}

export default getAbsoluteDirname