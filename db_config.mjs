/**
 * This file creates the database for the server.
 * Only meant to be run via 'npm run configure'
 */

import * as fs from 'node:fs/promises'
import { Database } from 'sqlite3'

const CREATE_INST =
`CREATE TABLE ? (
fid INTEGER PRIMARY KEY
name TEXT NOT NULL
extension TEXT
is_dir INTEGER NOT NULL
)`;

const INSERT_INST = 
`INSERT INTO ? (name, extension, is_dir)
VALUES ($name, $ext, $is_dir)
`;

async function fill_db(db, path) {
    const dir = await fs.opendir(path);
    const files = [];

    for await (const dirent of dir) {
        if(dirent.isDirectory()) {
            fill_db(db, dirent.path);
        }

        let dot_ext = dirent.name.lastIndexOf(".");
        files.push({
            name: dirent.name,
            ext: dot_ext != -1 ? dirent.name.substring(dot_ext) : null,
            is_dir: dirent.isDirectory() ? 1 : 0
        });
    }

    db.serialize(() => {
        db.run(CREATE_INST, path);

        const stmt = db.prepare(INSERT_INST, path);
        files.forEach(entry => {
            stmt.run(entry);
        })
    })
}

// MAIN //
(async () => {
    // Argument check
    if(process.argv.length != 2) {
        throw "Usage: npm run configure -- <path>";
    }
    
    // Remove any existing db file
    fs.unlink("../res/explorer.db")
    
    // Create new database file
    const db = new Database("../res/explorer.db", err => {if(err) throw err});
    
    await fill_db(db, process.argv[1]);

    db.close();
}) ()


