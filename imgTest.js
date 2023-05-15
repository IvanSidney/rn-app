import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// import { database } from "./src/config/firabase";
import { storage } from "./src/config/firabase";
import AppButton from "./src/components/AppButton";
import Screen from "./src/components/Screen";
import ImageInput from "./src/components/ImageInput";

const Test = ({}) => {
    const [image, setImage] = useState();
    // const file = new Blob([image], { type: "image/jpeg" });
    // console.log(file);

    const onPress = async () => {
        const img = await fetch(image);
        const blob = await img.blob();
        const metadata = {
            contentType: "image/jpeg",
        };
        const storageRef = ref(storage, `images/couch.jpg`);
        const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                });
            }
        );
    };

    return (
        <Screen style={styles.container}>
            <ImageInput imageUri={image} onChangeImage={setImage} />
            <AppButton title={"Press"} onPress={onPress} />
            <Image
                style={{ width: 300, height: 300 }}
                source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/initial-4b2a8.appspot.com/o/images%2Fname.jpg?alt=media&token=1788b50f-a74a-49d4-b8ea-983781039892",
                }}
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default Test;
