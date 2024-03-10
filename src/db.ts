import { EntryInfo, QueryRow, ENTRY_TYPE } from "./types/entry_types";

import { Database, Statement } from "sqlite3";
import { EventEmitter, once } from "node:events"

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

export async function query(tbl: string) : Promise<EntryInfo[]> {
    const stmt: Statement = db.prepare("SELECT * FROM ?", tbl);
    const res = await run(stmt, (waiter, err, rows) => {
        if(err) {
            throw err;
        }

        const entries = rows.map((row: QueryRow) : EntryInfo => 
            ({
                id: row.fid,
                name: row.name,
                extension: row.extension,
                type: ENTRY_TYPE.UNKNOWN        // Placeholder for now
            })
        );

        waiter.emit(SQL_DONE, entries);
    });

    return res as EntryInfo[]
}