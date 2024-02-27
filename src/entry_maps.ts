import { ENTRY_TYPE, EntryIcon } from "./types/entry_types";
import strings from "res/strings.json";

export const ENTRY_ICON_MAP : {[key: number]: EntryIcon } = {
    [ENTRY_TYPE.UNKNOWN]: {
        img_res: strings.img_unknown,
        alt: strings.img_alt_unknown
    },
    [ENTRY_TYPE.DIRECTORY]: {
        img_res: strings.img_directory,
        alt: strings.img_alt_directory
    },
    [ENTRY_TYPE.TEXT]: {
        img_res: strings.img_text,
        alt: strings.img_alt_text
    },
    [ENTRY_TYPE.VIDEO]: {
        img_res: strings.img_video,
        alt: strings.img_alt_video
    }
}