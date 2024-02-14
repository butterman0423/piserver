import { ENTRY_TYPE, EntryInfo } from "src/explorer";
import strings from "res/strings.json";

function getDestURL(entry: EntryInfo): string {
    const {id, type} = entry;
    switch(type) {
        case ENTRY_TYPE.DIRECTORY:
            return `${strings.path_explorer_path}${id}`;
        case ENTRY_TYPE.REGULAR:
            return `${strings.path_file_path}${id}`;
        default:
            console.error(strings.error_unknown_entry);
            return "";
    }
}

export default function Entry({ entry }: { entry: EntryInfo }) {
    const { name, extension } = entry;
    
    return (
        <a href={getDestURL(entry)}>
            <div>
                <p>{name}.{extension}</p>
            </div>
        </a>
    )
}