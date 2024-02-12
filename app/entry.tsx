export default function Entry({entryName, entryType}: {entryName: string, entryType: string}) {
    return <div>
        <img></img>
        <p>{entryName}.{entryType}</p>
    </div>
}