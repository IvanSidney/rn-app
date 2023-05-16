import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage } from "../config/firabase";
import { useState } from "react";

export const uploadImage = () => {
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(false);

    const addImage = async (images, id) => {
        const img = await fetch(images);
        const blob = await img.blob();
        const metadata = {
            contentType: "image/jpeg",
        };

        const storageRef = ref(storage, `images/${id}.jpg`);
        const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

                setProgress(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                setError(true);
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL);
                    setError(false);
                    console.log("File available at", downloadURL);
                });
            }
        );
    };
    return {
        url,
        addImage,
        error,
        progress,
    };
};
