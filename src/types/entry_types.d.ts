export enum ENTRY_TYPE {
    UNKNOWN, DIRECTORY, TEXT, VIDEO
}

export type QueryRow = EntryInfo | FileInfo

export type EntryInfo = {
    fid: number          // db row id
    type: ENTRY_TYPE
    name: string
    info_id: number
}

export type EntryIcon = {
    img_res: string,
    alt: string
}

export type FileInfo = {

}