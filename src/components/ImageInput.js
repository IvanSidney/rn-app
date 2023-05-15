import React, { useEffect } from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import Icon from "./Icon";
import colors from "../config/colors";

const ImageInput = ({ imageUri, onChangeImage }) => {
    useEffect(() => {
        requestPermission();
    }, []);

    const requestPermission = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (!granted)
            alert("You need to enable permission to acces the library");
    };

    const handlerPress = () => {
        if (!imageUri) selectImage();
        else
            Alert.alert("Delete Image", "Do you want delete this image?", [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { text: "OK", onPress: () => onChangeImage(null) },
            ]);
    };

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5,
            });
            if (!result.canceled) onChangeImage(result.assets[0].uri);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlerPress}>
            <View style={[styles.container]}>
                {imageUri && (
                    <Image style={styles.image} source={{ uri: imageUri }} />
                )}
                {!imageUri && (
                    <Icon
                        size={80}
                        name="camera"
                        iconColor={colors.medium}
                        backgroundColor={colors.light}
                    />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        backgroundColor: colors.light,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
});

export default ImageInput;
