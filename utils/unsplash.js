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
    const collectionsResponse = await instance.collections.getCollectionPhotos(
        9772745,
        1,
        30
    );
    const collections = await toJson(collectionsResponse);
    return JSON.stringify(collections);
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
