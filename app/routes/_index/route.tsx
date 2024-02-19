import { EntryInfo } from "src/types/entry_types"
import Entry from "./entry"

export default function Explorer({ entries } : { entries: Array<EntryInfo> }) {
    const entryEls = entries.map((data, idx) => <Entry key={idx} entry={data}/>)
    
    return (
        <div>
            <div>{entryEls}</div>
        </div>
    )
}