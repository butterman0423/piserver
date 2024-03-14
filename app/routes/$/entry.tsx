import type { EntryInfo } from "src/types/entry_types";
import { ENTRY_ICON_MAP } from "src/entry_maps";
import { Link } from "@remix-run/react";

export default function Entry({ entry }: { entry: EntryInfo }) {
    const { info_id, name } = entry;
    const { img_res, alt } = ENTRY_ICON_MAP[entry.type];
    
    return (
        <Link to={{pathname: ".", search: `?file=${info_id}`}} relative="path">
            <div>
                <img
                    src={img_res}
                    alt={alt}
                />
            </div>
            <div>
                <p>{name}</p>
            </div>
        </Link>
    )
}