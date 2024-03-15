/**
 * THIS FILE IS NOT MEANT TO BE RUN BY ITSELF!!!
 * 
 * RUN configure.sh TO CONFIGURE THIS SERVER'S DATABASE.
 */

import { lstat } from "node:fs/promises"
import sqlite3 from 'sqlite3'
import dbstrings from './res/db_strings.json' with { type: "json" }

const { Database } = sqlite3
let id = 1;

function get_ftype(stat, name) {
    if( stat.isDirectory() ) {
        return 1;
    }

    const ext = name.match(/\..+$/g);
    if(ext) {
        switch( ext[0] ) {
            case ".txt":
                return 2;
            case ".mp4":
                return 3;
        }
    }
    
    return 0; // Otherwise, unknown
}

async function add_entry(db, path) {
    const stat = await lstat(path);
    const idx = path.lastIndexOf("/");

    const pdir = path.substring(0, idx);
    const fname = path.substring(idx);

    db.run(dbstrings.INSERT_FINFO, {
        name: fname,
    });
    db.run(dbstrings.INSERT_FILE, {
        name: fname,
        path: path,
        parent_path: pdir,
        type: get_ftype(stat, fname),
        info_id: id++
    });
}

// Create new database file
const db = new Database("./res/explorer.db", err => { if(err) throw err });

process.stdin.once('data', buffer => {
    const data = buffer.toString('ascii').split("\n");

    db.serialize(async () => {
        db.run(dbstrings.CREATE_FILE_TABLE);
        db.run(dbstrings.CREATE_FINFO_TABLE);
        
        data.forEach(async path => await add_entry(db, path));

        console.log("Configuration successful.")
        db.close();
    })
})