import React from "react";
import {
    Image,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";

const Card = ({ title, subTitle, imageUrl, onPress }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <Image
                    style={styles.image}
                    source={{ uri: imageUrl }}

                    // { uri: imageUrl }
                    // }
                />
                <View style={styles.titleContainer}>
                    <AppText style={styles.title}>{title}</AppText>
                    <AppText style={styles.subTitle}>{subTitle}</AppText>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 200,
    },
    titleContainer: {
        padding: 20,
    },
    title: {
        marginBottom: 2,
    },
    subTitle: {
        color: colors.secondary,
        fontWeight: "bold",
    },
});

export default Card;
