import { ENTRY_TYPE, EntryInfo } from "src/types/entry_types";
import { ENTRY_ICON_MAP } from "src/entry_maps";
import strings from "res/strings.json";
import { Link } from "@remix-run/react";

function getDestURL(entry: EntryInfo) : string {
    const {id, type} = entry;
    switch(type) {
        case ENTRY_TYPE.DIRECTORY:
            return `${strings.path_explorer_path}${id}`;
        case ENTRY_TYPE.UNKNOWN:
            console.error(strings.error_unknown_entry);
            return "";
        default:
            return `${strings.path_file_path}${id}`;
    }
}

export default function Entry({ entry }: { entry: EntryInfo }) {
    const { name, extension } = entry;
    const url = getDestURL(entry);
    const { img_res, alt } = ENTRY_ICON_MAP[entry.type];
    
    return (
        <Link to={url}>
            <div>
                <img
                    src={img_res}
                    alt={alt}
                />
            </div>
            <div>
                <p>{name}.{extension}</p>
            </div>
        </Link>
    )
}