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

const ListingScreen = ({ navigation }) => {
    const {
        data: listing,
        error,
        loading,
        request: loadListings,
    } = useApi(listingsApi.getListings);

    useEffect(() => {
        loadListings();
    }, []);

    return (
        <Screen style={styles.screen}>
            {error && (
                <>
                    <AppText style={{ alignSelf: "center" }}>
                        Couldn't retrieve the listings.
                    </AppText>
                    <AppButton title="Retry" onPress={() => loadListings()} />
                </>
            )}
            {loading ? (
                <ActivitiIndicator visible={loading} />
            ) : (
                <FlatList
                    data={listing}
                    refreshing={false}
                    onRefresh={() => loadListings()}
                    keyExtractor={(listings) => listings.id.toString()}
                    renderItem={({ item }) => (
                        <Card
                            title={item?.title}
                            subTitle={"$" + item?.price}
                            imageUrl={item.imageUrl}
                            onPress={() =>
                                navigation.navigate(
                                    routes.LISTING_DETAILS,
                                    item
                                )
                            }
                        />
                    )}
                />
            )}
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
