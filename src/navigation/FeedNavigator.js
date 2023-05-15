import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ListingScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";

const Stack = createStackNavigator();

const FeedNavigator = ({}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                presentation: "modal",
                headerShown: false,
            }}
        >
            <Stack.Screen name="Listings" component={ListingScreen} />
            <Stack.Screen
                name="ListingDetails"
                component={ListingDetailsScreen}
                options={{ gestureEnabled: true }}
            />
        </Stack.Navigator>
    );
};

export default FeedNavigator;
