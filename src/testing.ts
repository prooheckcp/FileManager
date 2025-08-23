import {Folder, File} from "./FileManager.js"
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// cannot resolve path

let exampleFolder: Folder = await Folder.create(path.join(__dirname, "..", "Test"))
let targetFolder: Folder = await Folder.create(path.join(exampleFolder.Directory, "Target"))
let target2Folder: Folder = await Folder.create(path.join(exampleFolder.Directory, "Target2"))

let ancestors = await target2Folder.GetAncestors();

console.log(ancestors);

await targetFolder.Clone(target2Folder.Directory)