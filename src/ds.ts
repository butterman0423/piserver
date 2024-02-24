import { Database } from "sqlite3";

// Temporary db, will reference file later
const db = new Database(":memory:")

export async function query(tbl: string) {
    db.serialize(() => {
        db.prepare("SELECT * FROM (?)", tbl)
        .all()

        db.all("SELECT * FROM (?)", tbl, (err, rows) => {

        })
    });

    db.close();
}