export enum ENTRY_TYPE {
    UNKNOWN, DIRECTORY, TEXT, VIDEO
}

export type QueryRow = {
    fid: number,
    name: string,
    extension: string,
    is_dir: number
}

export type EntryInfo = {
    id: number          // db row id
    type: ENTRY_TYPE
    name: string        
    extension: string
}