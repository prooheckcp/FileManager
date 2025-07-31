import {Folder, File} from "./FileManager"
import path from "path"

// cannot resolve path

let exampleFolder: Folder = await Folder.create(path.join(__dirname, "ExampleFolder"))

await Folder.create(path.join(__dirname, "TargetFolder"))

await exampleFolder.Clone(path.join(__dirname, "TargetFolder"))