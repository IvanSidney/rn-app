import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import Icon from "./Icon";
import AppText from "./AppText";

const CategoryPickerItem = ({ item, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <Icon
                    backgroundColor={item.backgroundColor}
                    name={item.icon}
                    size={80}
                />
            </TouchableOpacity>
            <AppText style={styles.label}>{item.label}</AppText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingVertical: 20,
        alignItems: "center",
        width: "33%",
    },
    label: {
        marginTop: 10,

        textAlign: "center",
    },
});

export default CategoryPickerItem;
