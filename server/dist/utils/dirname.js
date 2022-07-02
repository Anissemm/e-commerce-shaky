import { fileURLToPath } from "url";
import { dirname } from "path";
const getDirname = (url) => {
    return dirname(fileURLToPath(url));
};
export default getDirname;
