import { Database } from "sqlite3";
import { EventEmitter } from "node:events"

const db: Database = new Database("../res/explorer.db");

export async function query(tbl: string) : Promise<unknown[]> {
    const waiter = new EventEmitter();

    return await Promise.all([
        new Promise(res => waiter.once('done', res)),
        () => {
            db.serialize(() => {
                db.all("SELECT * FROM ?", tbl, (err, rows) => {
                    waiter.emit('done', rows);
                })
            })
        }
    ])
}