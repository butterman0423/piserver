import { ENTRY_TYPE } from "src/explorer";
import { EntryInfo } from "src/explorer"

function handleClick(ev: React.MouseEvent<HTMLDivElement, MouseEvent>, entry: EntryInfo): void {
    const {id, type} = entry;

    switch(type) {
        case ENTRY_TYPE.DIRECTORY:
            break;
        case ENTRY_TYPE.REGULAR:
            break;
        default:
            console.error("Error: Unknown Entry Type");
    }
}

export default function Entry({ entry }: { entry: EntryInfo }) {
    const { name, extension } = entry;
    
    return ( 
        <div onClick={(ev) => handleClick(ev, entry)}>
            <p>{name}.{extension}</p>
        </div>
    )
}