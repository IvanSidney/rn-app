import React from "react";
import { View, StyleSheet, Image } from "react-native";

import AppText from "../components/AppText";
import colors from "../config/colors";
import { ListItem } from "../components/lists";

const ListingDetailsScreen = ({ route }) => {
    const listing = route.params;

    return (
        <View>
            <Image
                style={styles.image}
                source={{ uri: listing.images[0].url }}
            />
            <View style={styles.titleContainer}>
                <AppText style={styles.title}>{listing.title}</AppText>
                <AppText style={styles.price}>${listing.price}</AppText>
                <View style={styles.userContainer}>
                    <ListItem
                        image={require("../../assets/ivan.jpg")}
                        title="Ivan Sidielnikov"
                        subTitle="5 Listings"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
    },
    titleContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
    },
    price: {
        color: colors.secondary,
        fontSize: 20,
        fontWeight: "500",
        marginVertical: 10,
    },
    userContainer: {
        marginVertical: 40,
    },
});

export default ListingDetailsScreen;
