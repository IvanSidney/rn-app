import React from "react";
import { Image, View, StyleSheet, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../AppText";
import colors from "../../config/colors";

const ListItem = ({
    title,
    subTitle,
    image,
    IconComponent,
    onPress,
    renderRightActions,
}) => {
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
                <View style={styles.container}>
                    {IconComponent}
                    {image ? (
                        <Image style={styles.image} source={image} />
                    ) : null}
                    <View style={styles.titleContainer}>
                        <AppText style={styles.title} numberOfLines={1}>
                            {title}
                        </AppText>
                        {subTitle && (
                            <AppText style={styles.subTitle} numberOfLines={2}>
                                {subTitle}
                            </AppText>
                        )}
                    </View>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        size={25}
                        color={colors.medium}
                    />
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        padding: 15,
        backgroundColor: colors.white,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    titleContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
    },
    title: {
        fontWeight: "800",
    },
    subTitle: {
        color: colors.medium,
    },
});

export default ListItem;