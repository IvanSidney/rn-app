import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import AppButton from "../components/AppButton";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import ActivitiIndicator from "../components/ActivitiIndicator";
import useApi from "../hooks/useApi";
import { uploadImage } from "../api/images";

const ListingScreen = ({ navigation }) => {
    // const error = false;
    // const loading = false;
    // const listings = [
    //     {
    //         id: 1,
    //         title: "Red jacket for sale",
    //         price: 100,
    //         image: require("../../assets/jacket.jpg"),
    //     },
    //     {
    //         id: 2,
    //         title: "Couch in great condition",
    //         price: 1000,
    //         image: require("../../assets/couch.jpg"),
    //     },
    // ];

    const {
        data: listings,
        error,
        loading,
        request: loadListings,
    } = useApi(listingsApi.getListings);

    // const loadListings = async () => {
    //     const list = await listingsApi.getListings();
    //     list.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // };

    // const docRef = doc(database, "listings", "M2IhnKgy7hFZm3z5Cl8E");
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    // } else {
    //     // docSnap.data() will be undefined in this case
    //     console.log("No such document!");
    // };

    useEffect(() => {
        loadListings();
    }, []);

    return (
        <Screen style={styles.screen}>
            {error && (
                <>
                    <AppText>Couldn't retrieve the listings.</AppText>
                    <AppButton title="Retry" onPress={loadListings} />
                </>
            )}
            <ActivitiIndicator visible={loading} />
            <FlatList
                data={listings}
                keyExtractor={(listings) => listings?.id.toString()}
                renderItem={({ item }) => (
                    <Card
                        title={item?.title}
                        subTitle={"$" + item?.price}
                        imageUrl={item.images[0]}
                        onPress={() =>
                            navigation.navigate(routes.LISTING_DETAILS, item)
                        }
                    />
                )}
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 10,
        backgroundColor: colors.light,
    },
});

export default ListingScreen;
