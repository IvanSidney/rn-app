import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";

import { storage } from "./src/config/firabase";
import AppButton from "./src/components/AppButton";
import Screen from "./src/components/Screen";
import ImageInput from "./src/components/ImageInput";
import { uploadImage } from "./src/api/images";

const Test = ({}) => {
    const [image, setImage] = useState();
    console.log(image);
    const { url, addImage, error, progress } = uploadImage();
    const onPress = () => {
        addImage(image, 44);
    };

    return (
        <Screen style={styles.container}>
            <ImageInput imageUri={image} onChangeImage={setImage} />
            <AppButton title={"Press"} onPress={onPress} />
            <Image
                style={{ width: 300, height: 300 }}
                source={{
                    uri: url,
                }}
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default Test;
