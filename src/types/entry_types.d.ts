export enum ENTRY_TYPE {
    REGULAR, DIRECTORY
}

export interface EntryInfo {
    id: number          // db row id
    type: ENTRY_TYPE
    name: string        
    extension: string
}