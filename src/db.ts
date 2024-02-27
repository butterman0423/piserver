import { EntryInfo, QueryRow, ENTRY_TYPE } from "./types/entry_types";

import { Database, RunResult } from "sqlite3";
import { EventEmitter } from "node:events"

const db: Database = new Database("../res/explorer.db");

export async function query(tbl: string) : Promise<EntryInfo[]> {
    const waiter = new EventEmitter();

    const [data, _] = await Promise.all([
        new Promise((res: (value: EntryInfo[]) => void) => waiter.once('done', res)),
        () => {
            db.serialize(() => {
                db.all("SELECT * FROM ?", tbl, (err: Error | null, rows: any[]) => {
                    const entries = rows.map((row: QueryRow) : EntryInfo => 
                        ({
                            id: row.fid,
                            name: row.name,
                            extension: row.extension,
                            type: ENTRY_TYPE.UNKNOWN        // Placeholder for now
                        })
                    );

                    waiter.emit('done', entries);
                })
            })
        }
    ])

    return data;
}