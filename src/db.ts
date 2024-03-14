import { EntryInfo, QueryRow, FileInfo } from "./types/entry_types";

import { Database, Statement } from "sqlite3";
import { EventEmitter, once } from "node:events";
import dbstrings from "res/db_strings.json";

type DBCallback = (waiter: EventEmitter, err: Error | null, rows: QueryRow[]) => void;
const SQL_DONE = 'done';

const db: Database = new Database("../res/explorer.db");

async function run(stmt: Statement, clbk: DBCallback): Promise<any[]> {
    const waiter = new EventEmitter();

    const [res, _] = await Promise.all([
        once(waiter, SQL_DONE),
        stmt.all((err, rows: QueryRow[]) => clbk(waiter, err, rows))
    ]);
    
    return res;
}

export async function fetchContents(path: string) : Promise<EntryInfo[]> {
    const stmt: Statement = db.prepare(dbstrings.QUERY_FILE, path);
    const res = await run(stmt, (waiter, err, rows) => {
        if(err) { throw err; }

        const entries = rows.map(row => row as EntryInfo);
        waiter.emit(SQL_DONE, entries);
    });

    return res as EntryInfo[];
}

// TODO
export async function fetchFileInfo(id: number) : Promise<FileInfo> {
    return {};
}