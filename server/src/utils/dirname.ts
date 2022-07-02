import { fileURLToPath } from "url"
import { dirname} from "path"

const getDirname = (url: string): string => {
    return dirname(fileURLToPath(url))
}  

export default getDirname