import type { LoaderFunctionArgs } from "@remix-run/node"

import Entry from "./entry"
import { query } from "src/db";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export const loader = async ({ params } : LoaderFunctionArgs) => {
    const path = params["*"];

    if(path === undefined) {
        throw "File path is undefined!";
    }

    return json( await query(path) );
}

export default function Explorer() {
    const entries = useLoaderData<typeof loader>()
    
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