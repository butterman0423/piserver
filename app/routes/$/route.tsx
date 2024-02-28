import type { LoaderFunctionArgs, TypedResponse } from "@remix-run/node"
import type { EntryInfo } from "src/types/entry_types"

import Entry from "./entry"
import { query } from "src/db";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

type LoadResult = {
    file_query: boolean,
    res: EntryInfo[] | null,
}

export const loader = async ({ params, request } : LoaderFunctionArgs) : Promise<TypedResponse<LoadResult>> => {
    const path = params["*"];

    if(path === undefined) {
        throw "File path is undefined!";
    }

    const url = new URL(request.url)
    const fid = url.searchParams.get("file");

    if(fid === null) {
        return json({
            file_query: false,
            res: await query(path)
        });
    }

    return json({
        file_query: true,
        res: null
    });
}

export default function Explorer() {
    const { file_query, res } = useLoaderData<typeof loader>()
    
    if(file_query) {
        return (
            <p>To be implemented</p>
        )
    }

    const entries = res as EntryInfo[]
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