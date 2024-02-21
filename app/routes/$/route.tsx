import type { LoaderFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { EntryInfo } from "src/types/entry_types"
import Entry from "./entry"

export const loader = async ({ params } : LoaderFunctionArgs) => {
    const path = params["*"];

    // Something that parses the path and returns file data

    return json("");
}

export default function Explorer({ entries } : { entries: Array<EntryInfo> }) {
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