import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import ImageInput from "./ImageInput";

const ImageInputList = ({ imageUris = [], onRemoveImage, onAddImage }) => {
    const scrollView = useRef();
    const uri = imageUris[0];
    return (
        <View>
            <ScrollView
                ref={scrollView}
                horizontal
                onContentSizeChange={() => scrollView.current.scrollToEnd()}
            >
                <View style={styles.container}>
                    {uri ? (
                        <ImageInput
                            onChangeImage={() => onRemoveImage(uri)}
                            imageUri={uri}
                        />
                    ) : (
                        <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: "row", padding: 4 },
});

export default ImageInputList;
