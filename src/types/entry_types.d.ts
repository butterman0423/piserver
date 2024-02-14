export enum ENTRY_TYPE {
    UNKNOWN, DIRECTORY, TEXT, VIDEO
}

export interface EntryInfo {
    id: number          // db row id
    type: ENTRY_TYPE
    name: string        
    extension: string
}