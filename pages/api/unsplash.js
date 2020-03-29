import fetch from "isomorphic-unfetch";
import Unsplash, { toJson } from "unsplash-js";
import fs from "fs";
import { promisify } from "util";

const createFile = promisify(fs.writeFile);
const fileExists = promisify(fs.exists);

let unsplash;

export default async (req, res) => {
    try {
        const filePath = "fixtures/unsplash-collection.js";

        // If collection fixture already exists we do nothing
        if ((await fileExists(filePath)) && req.query.forceUpdate !== "true") {
            return res.status(200).json({
                error: "Unsplash collection file already exists!"
            });
        }

        // Create an unsplash instance if one does not already exists
        if (!unsplash) {
            unsplash = new Unsplash({
                accessKey: process.env.UNSPLASH_ACCESS_KEY,
                secret: process.env.UNSPLASH_SECRET,
                callbackUrl: process.env.UNSPLASH_CALLBACK_URL,
                bearerToken: process.env.UNSPLASH_BEARER_TOKEN
            });
        }

        // Fetch collections data from unsplash
        const collectionsResponse = await unsplash.collections.getCollectionPhotos(
            9772745,
            1,
            30
        );
        const collections = await toJson(collectionsResponse);
        const fileContent = JSON.stringify(collections);

        await createFile(
            "fixtures/unsplash-collection.js",
            `export default ${fileContent};`,
            "utf8",
            err => {
                if (err) {
                    return res.status(200).json({
                        error:
                            "An error occured while creating unsplash collection file: " +
                            err
                    });
                }

                return res.status(200).json({
                    success: "Unsplash collection file created successfully"
                });
            }
        );
    } catch (err) {
        return res.status(200).json({
            error: "An error occured: " + err
        });
    }
};
