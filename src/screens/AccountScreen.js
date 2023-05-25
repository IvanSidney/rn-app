import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Screen from "../components/Screen";
import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import { signOut } from "firebase/auth";
import { auth } from "../config/firabase";
import AuthContext from "../auth/context";

const menuItems = [
    {
        title: "My Listing",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.primary,
        },
    },
    {
        title: "My Messages",
        icon: {
            name: "email",
            backgroundColor: colors.secondary,
        },
        targetScreen: routes.MESSAGES,
    },
];

const AccountScreen = ({ navigation }) => {
    const { user } = useContext(AuthContext);

    const onSignOut = () => {
        signOut(auth)
            .then(() => {
                alert("Sign Out");
            })
            .catch((e) => console.log("Error logging out: ", e));
    };

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem
                    title={user.displayName}
                    subTitle={user.email}
                    image={{ uri: user.photoURL }}
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    keyExtractor={(menuItem) => menuItem.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.title}
                            onPress={() =>
                                navigation.navigate(item.targetScreen)
                            }
                            IconComponent={
                                <Icon
                                    name={item.icon.name}
                                    backgroundColor={item.icon.backgroundColor}
                                />
                            }
                        />
                    )}
                />
            </View>
            <ListItem
                onPress={onSignOut}
                title={"Log Out"}
                IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
    screen: { backgroundColor: colors.light },
    container: {
        marginVertical: 20,
    },
});

export default AccountScreen;
