import {Folder, File} from "./FileManager.js"
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// cannot resolve path

let exampleFolder: Folder = await Folder.create(path.join(__dirname, "ExampleFolder"))

await Folder.create(path.join(__dirname, "TargetFolder"))

await exampleFolder.Clone(path.join(__dirname, "TargetFolder"))