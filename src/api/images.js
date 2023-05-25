import { ref, getDownloadURL } from "firebase/storage";

import { storage } from "../config/firabase";

export default useImage = () => {
    const getUrl = async (id) => {
        let imgUrl = "";
        const imageRef = ref(storage, `images/${id}.jpg`);
        await getDownloadURL(imageRef).then((url) => (imgUrl = url));
        return imgUrl;
    };

    const addImage = async (listings) => {
        const img = await fetch(listings.images[0]);
        const blob = await img.blob();

        const imageRef = ref(storage, `images/${listings.id}.jpg`);
        uploadBytes(imageRef, blob).then((getDownloadURL) =>
            console.log("1", getDownloadURL)
        );
        console.log("2", getDownloadURL(imageRef));
    };
    return {
        addImage,
        getUrl,
    };
};
