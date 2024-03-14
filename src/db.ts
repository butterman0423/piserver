import { EntryInfo, QueryRow, FileInfo } from "./types/entry_types";

import sqlite3 from 'sqlite3'
import { EventEmitter, once } from "node:events";
import dbstrings from "res/db_strings.json";

type Database = sqlite3.Database;
const { Database } = sqlite3;

type DBCallback = (db: Database, waiter: EventEmitter) => void;
const SQL_DONE = 'done';

async function run(clbk: DBCallback): Promise<QueryRow[]> {
    const db: Database = new Database("../res/explorer.db");
    const waiter = new EventEmitter();

    const [res, _] = await Promise.all([
        once(waiter, SQL_DONE) as Promise<QueryRow[]>,
        db.serialize(() => clbk(db, waiter))
    ]);
    
    return res;
}

export async function fetchContents(path: string) : Promise<EntryInfo[]> {
    const res = await run((db, waiter) => {
        const entries: QueryRow[] = [];
        db.each(dbstrings.QUERY_FILE, path, (err, row: QueryRow) => {
            if(err) { throw err; }
            entries.push(row);
        })
        
        waiter.emit(SQL_DONE, entries);
    });

    return res as EntryInfo[];
}

// TODO
export async function fetchFileInfo(id: number) : Promise<FileInfo> {
    return {};
}