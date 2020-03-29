import fetch from "isomorphic-unfetch";
import Unsplash, { toJson } from "unsplash-js";
import collectionPhotos from "../fixtures/unsplash-collection";

const createInstance = () =>
    new Unsplash({
        accessKey: process.env.UNSPLASH_ACCESS_KEY,
        secret: process.env.UNSPLASH_SECRET,
        callbackUrl: process.env.UNSPLASH_CALLBACK_URL,
        bearerToken: process.env.UNSPLASH_BEARER_TOKEN
    });

const getTreeOfHopeCollectionPhotos = async instance => {
    const collectionID = 9772745;
    const collectionDetailsResponse = await instance.collections.getCollection(
        collectionID
    );
    const collectionDetails = await toJson(collectionDetailsResponse);
    const maxItemsPerRequest = 30;
    const totalPhotos =
        ("object" === typeof collectionDetails &&
            collectionDetails.total_photos) ||
        maxItemsPerRequest;
    const totalPages = Math.ceil(Number(totalPhotos / maxItemsPerRequest));

    let collectionPhotos = [];
    for (let page = 1; page <= totalPages; page++) {
        const collectionsResponse = await instance.collections.getCollectionPhotos(
            collectionID,
            page,
            maxItemsPerRequest
        );
        const collectionPageResults = await toJson(collectionsResponse);
        collectionPhotos = [...collectionPhotos, ...collectionPageResults];
    }

    return JSON.stringify(collectionPhotos);
};

const getRandomPhoto = () => {
    const selectedPhoto =
        (Array.isArray(collectionPhotos) &&
            collectionPhotos.length &&
            collectionPhotos[
                Math.floor(Math.random() * collectionPhotos.length)
            ]) ||
        null;

    if (selectedPhoto === null) return "";

    return selectedPhoto.urls.raw;
};

export { createInstance, getTreeOfHopeCollectionPhotos, getRandomPhoto };
