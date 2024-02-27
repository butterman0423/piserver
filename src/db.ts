import { EntryInfo, QueryRow, ENTRY_TYPE } from "./types/entry_types";

import { Database } from "sqlite3";
import { EventEmitter, once } from "node:events"

const db: Database = new Database("../res/explorer.db");

export async function query(tbl: string) : Promise<EntryInfo[]> {
    const waiter = new EventEmitter();

    const [data, _] = await Promise.all([
        once(waiter, 'done'),
        () => {
            db.serialize(() => {
                db.all("SELECT * FROM ?", tbl, (err: Error | null, rows: QueryRow[]) => {
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

                    waiter.emit('done', entries);
                })
            })
        }
    ])

    return data as EntryInfo[];
}