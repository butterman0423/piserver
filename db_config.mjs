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

function error_thrower(err) {
    if(err) { throw err }
}

function fill_db(db, path) {
    fs.opendir(path)
    .then(dir => {
        const files = [];
        
        let file;
        while( file = dir.readSync() ) {
            files.push(file);
            if(file.isDirectory()) {
                fillDatabase(db, file.path);
            }
        }

        files.map( dirent => {
            let dot_ext = dirent.name.lastIndexOf(".");
            return {
                name: dirent.name,
                ext: dot_ext != -1 ? dirent.name.substring(dot_ext) : null,
                is_dir: dirent.isDirectory() ? 1 : 0
            }
        });

        db.serialize(async () => {
            db.run(CREATE_INST, path);

            const stmt = db.prepare(INSERT_INST, path);
            files.forEach(entry => {
                stmt.run(entry);
            })
        })
    })
    .catch(error_thrower);
}

// MAIN //
(() => {
    // Argument check
    if(process.argv.length != 2) {
        throw "Usage: npm run configure -- <path>";
    }
    
    // Remove any existing db file
    fs.unlink("../res/explorer.db")
    
    // Create new database file
    const db = new Database("../res/explorer.db", error_thrower);
    
    fill_db(db, process.argv[1]);
}) ()


