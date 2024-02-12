import { EntryInfo } from "src/explorer"

export default function Entry({ entry }: { entry: EntryInfo }) {
    const { name, extension } = entry;
    
    return ( 
        <div>
            <p>{name}.{extension}</p>
        </div>
    )
}