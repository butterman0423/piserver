import { readFile } from "fs";

let strings_data;

readFile(`${__dirname}/strings.json`, 'utf8', (err, data) => {
    if(err) {
        throw new Error("Error: Failed to load string resources.");
    }

    strings_data = JSON.parse(data);
    console.log("Successfully loaded string resources");
});

export const strings = strings_data;