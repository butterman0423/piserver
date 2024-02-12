import { EntryInfo } from "src/explorer"
import Entry from "./entry"

export default function Explorer({ entries } : { entries: Array<EntryInfo> }) {
    const entryEls = entries.map(data => <Entry entry={data}/>)
    
    return (
        <div>
            <div>{entryEls}</div>
        </div>
    )
}