import { Database } from "sqlite3";

const db: Database = new Database("../res/explorer.db")

export async function query(tbl: string) {
    db.serialize(() => {
        db.all("SELECT * FROM (?)", tbl, (err, rows) => {

        })
    });

    db.close();
}