# FileManager

A modern, instance-based file and folder management library for Node.js inspired by Roblox’s object hierarchy. With `FileManager`, you can treat files and directories as "instances," easily navigating, cloning, and manipulating them like objects in a tree. Supports JSON and TOML file serialization out of the box.

---

## Installation

```bash
npm i @prooheckcp/file-manager
```

---

## Quick Start

```ts
import { FileManager } from "FileManager";

async function main() {
    // Create or retrieve a folder
    const root = await FileManager.Folder.create("./myProject");

    // Create a file
    const file = await FileManager.File.create("./myProject/data.json", "{}");

    // Write an object to JSON
    await file.WriteObject({ name: "Alice", age: 25 });

    // Read object from file
    const data = await file.ReadObject<{ name: string; age: number }>();
    console.log(data.name); // Alice

    // List children
    const children = await root.GetChildren();
    console.log(children.map(c => c.Name));
}

main();
```

---

## Classes & API

### `Instance`

Base class for `File` and `Folder`.

| Method                                                 | Args                                                                      | Returns             | Description                                                                                         |
| ------------------------------------------------------ | ------------------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------- |
| `Clone(targetDirectory?: string, overwrite?: boolean)` | `targetDirectory: string \| undefined`, `overwrite: boolean \| undefined` | `Promise<Instance>` | Creates a copy of the instance in the target directory. Handles both files and folders recursively. |
| `SetName(name: string)`                                | `name: string`                                                            | `Promise<void>`     | Renames the instance.                                                                               |
| `SetParent(newDirectory: string \| Folder)`            | `newDirectory: string \| Folder`                                          | `Promise<void>`     | Moves the instance to a new directory or folder instance.                                           |
| `Destroy()`                                            | -                                                                         | `Promise<void>`     | Deletes the instance (file or folder) from disk.                                                    |
| `Parent` (getter)                                      | -                                                                         | `Folder`            | Returns the parent folder as a `Folder` instance.                                                   |
| `Directory` (getter)                                   | -                                                                         | `string`            | Absolute path of the instance.                                                                      |
| `Name` (getter)                                        | -                                                                         | `string`            | Name of the file or folder.                                                                         |

---

### `Folder`

Represents a directory on disk.

| Method                                             | Args                                 | Returns                     | Description                                                                       |
| -------------------------------------------------- | ------------------------------------ | --------------------------- | --------------------------------------------------------------------------------- |
| `static create(path: string)`                      | `path: string`                       | `Promise<Folder>`           | Creates a new folder or returns existing.                                         |
| `GetChildren(extension?: string)`                  | `extension: string \| undefined`     | `Promise<Instance[]>`       | Returns immediate children as `Instance` objects. Optionally filter by extension. |
| `GetDescendants(extension?: string)`               | `extension: string \| undefined`     | `Promise<Instance[]>`       | Recursively returns all nested children as `Instance` objects.                    |
| `FindFirstChild(name: string, extension?: string)` | `name: string`, `extension?: string` | `Promise<Instance \| null>` | Returns the first child (any depth) matching name and optionally extension.       |
| `FindFirstFolder(folderName: string)`              | `folderName: string`                 | `Promise<Folder \| null>`   | Returns the first folder matching the name.                                       |
| `FindFirstFile(fileName: string)`                  | `fileName: string`                   | `Promise<File \| null>`     | Returns the first file matching the name.                                         |
| `Empty()`                                          | -                                    | `Promise<void>`             | Deletes all children inside the folder.                                           |
| `MoveChildren(newDirectory: string \| Folder)`     | `newDirectory: string \| Folder`     | `Promise<void>`             | Moves all children into a new folder or path.                                     |

**Example:**

```ts
const folder = await FileManager.Folder.create("./myProject");

// Create subfolders
await FileManager.Folder.create("./myProject/assets");
await FileManager.Folder.create("./myProject/scripts");

// Find a folder by name
const assets = await folder.FindFirstFolder("assets");

// Move all children into another folder
await folder.MoveChildren("./backupProject");
```

---

### `File`

Represents a file on disk.

| Method                                          | Args                               | Returns           | Description                                                                                |
| ----------------------------------------------- | ---------------------------------- | ----------------- | ------------------------------------------------------------------------------------------ |
| `static create(path: string, content?: string)` | `path: string`, `content?: string` | `Promise<File>`   | Creates a new file with optional content.                                                  |
| `Read()`                                        | -                                  | `Promise<string>` | Reads the file content as a string.                                                        |
| `Write(newContent: string)`                     | `newContent: string`               | `Promise<void>`   | Writes string content to the file.                                                         |
| `WriteObject<T>(object: T)`                     | `object: T`                        | `Promise<void>`   | Writes an object to the file. Automatically serializes to JSON or TOML based on extension. |
| `ReadObject<T>()`                               | -                                  | `Promise<T>`      | Reads and parses the file content as JSON or TOML.                                         |
| `Extension` (getter)                            | -                                  | `string`          | Returns the file’s extension.                                                              |

**Example:**

```ts
const file = await FileManager.File.create("./data.toml");

// Write object as TOML
await file.WriteObject({ username: "bob", score: 42 });

// Read object back
const data = await file.ReadObject<{ username: string; score: number }>();
console.log(data.score); // 42
```

---

### `FileManager` (Static Utilities)

| Method                          | Args                | Returns                   | Description                                 |
| ------------------------------- | ------------------- | ------------------------- | ------------------------------------------- |
| `GetFolder(directory: string)`  | `directory: string` | `Promise<Folder \| null>` | Returns a `Folder` instance if path exists. |
| `GetFile(directory: string)`    | `directory: string` | `Promise<File \| null>`   | Returns a `File` instance if path exists.   |
| `PathExists(directory: string)` | `directory: string` | `Promise<boolean>`        | Checks if the path exists on disk.          |
| `GetStat(directory: string)`    | `directory: string` | `Promise<Stats \| null>`  | Returns Node.js `fs.Stats` for the path.    |

---