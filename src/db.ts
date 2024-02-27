import { Database } from "sqlite3";

const db: Database = new Database("../res/explorer.db");

export function query(tbl: string) {
    db.serialize(() => {
        db.all("SELECT * FROM (?)", tbl, (err, rows) => {

        });
    });
}