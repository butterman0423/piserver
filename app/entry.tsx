import { ENTRY_TYPE, EntryInfo } from "src/explorer";
import strings from "res/strings.json";

function getDestURL(entry: EntryInfo) : string {
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

function getIconInfo(entry: EntryInfo) : {img_res: string, alt: string} {
    const { extension } = entry;

    switch(extension) {
        // TODO
        default:
            return {img_res: "", alt: ""};
    }
}

export default function Entry({ entry }: { entry: EntryInfo }) {
    const { name, extension } = entry;
    const { img_res, alt } = getIconInfo(entry);
    
    return (
        <a href={getDestURL(entry)}>
            <div>
                <img
                    src={img_res}
                    alt={alt}
                />
            </div>
            <div>
                <p>{name}.{extension}</p>
            </div>
        </a>
    )
}