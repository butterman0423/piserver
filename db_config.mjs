/**
 * THIS FILE IS NOT MEANT TO BE RUN BY ITSELF!!!
 * 
 * RUN configure.sh TO CONFIGURE THIS SERVER'S DATABASE.
 */

import { lstat } from "node:fs/promises"
import sqlite3 from 'sqlite3'
import dbstrings from './res/db_strings.json'

const { Database } = sqlite3
const dirmap = {};
const id = 0;

async function add_entry(db, path) {
    const stat = await lstat(path);
    const idx = path.lastIndexOf("/");

    const pdir = path.substring(0, idx);
    const fname = path.substring(idx);

    if(dirmap.size == 0) {
        dirmap.set(pwd, id++)
    }

    if( stat.isDirectory() ) {
        dirmap.set(path, id++);
    }

    db.run(dbstrings.INSERT_FINFO, {
        name: "",
    });
    db.run(dbstrings.INSERT_FILE, {
        name: fname,
        path: path,
        type: 1 + !stat.isDirectory(),      // This is temporary
        parent_id: dirmap[pdir],
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