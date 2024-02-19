import { EntryInfo } from "src/types/entry_types"
import Entry from "./entry"

export default function Explorer({ entries } : { entries: Array<EntryInfo> }) {
    const entryEls = entries.map((data, idx) => <Entry key={idx} entry={data}/>)
    
    return (
        <div>
            {entries.length ? 
                <div>
                    { entries.map((data, idx) => <Entry key={idx} entry={data}/>) }
                </div> 
            :
                <p>No content found</p>
            }
        </div>
    )
}