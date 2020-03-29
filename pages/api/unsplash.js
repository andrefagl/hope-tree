import fs from "fs";
import { promisify } from "util";
import {
    createInstance as createUnsplashInstance,
    getTreeOfHopeCollectionPhotos
} from "../../utils/unsplash";

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
            unsplash = createUnsplashInstance();
        }

        // Fetch collections data from unsplash
        const collectionPhotos = await getTreeOfHopeCollectionPhotos(unsplash);

        await createFile(
            filePath,
            `export default ${collectionPhotos};`,
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
