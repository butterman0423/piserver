import { ENTRY_TYPE, EntryInfo } from "src/types/entry_types";
import strings from "res/strings.json";

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

function getIconInfo(entry: EntryInfo) : {img_res: string, alt: string} {
    const { type } = entry;
    let img_res, alt : string;
    switch(type) {
        case ENTRY_TYPE.DIRECTORY:
            img_res = strings.img_directory;
            alt = strings.img_alt_directory;
            break;
        case ENTRY_TYPE.TEXT:
            img_res = strings.img_text;
            alt = strings.img_alt_text;
            break;
        case ENTRY_TYPE.VIDEO:
            img_res = strings.img_video;
            alt = strings.img_alt_text;
            break;
        default:
            img_res = strings.img_unknown;
            alt = strings.img_alt_unknown;
    }

    return {img_res: img_res, alt: alt};
}

export default function Entry({ entry }: { entry: EntryInfo }) {
    const { name, extension } = entry;
    const url = getDestURL(entry);
    const { img_res, alt } = getIconInfo(entry);
    
    return (
        <a href={url}>
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