import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import { storage } from "../config/firabase";

export default useImage = () => {
    const addImage = async (listings) => {
        const img = await fetch(listings.images[0]);
        const blob = await img.blob();

        const imageRef = ref(storage, `images/${listings.id}.jpg`);
        const imageUrl = await uploadBytes(imageRef, blob).then((snanshot) =>
            getDownloadURL(snanshot.ref).then((url) => {
                return url;
            })
        );
        return imageUrl;
    };
    return {
        addImage,
    };
};
