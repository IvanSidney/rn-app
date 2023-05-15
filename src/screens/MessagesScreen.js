import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import {
    ListItem,
    ListItemSeparator,
    ListItemDeleteAction,
} from "../components/lists";
import Screen from "../components/Screen";

const initialMessages = [
    {
        id: 1,
        title: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit debitis accusantium consequatur facilis ipsum repudiandae inventore dolores porro pariatur dolorem, quod laboriosam incidunt a mollitia at cupiditate dolor aliquam modi.",
        description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit debitis accusantium consequatur facilis ipsum repudiandae inventore dolores porro pariatur dolorem, quod laboriosam incidunt a mollitia at cupiditate dolor aliquam modi.",
        image: require("../../assets/ivan.jpg"),
    },
    {
        id: 2,
        title: "T2",
        description: "D2",
        image: require("../../assets/ivan.jpg"),
    },
];

const MessagesScreen = (props) => {
    const [messages, setMessages] = useState(initialMessages);
    const [refreshing, setRefreshing] = useState(false);

    const handlerDelete = (message) => {
        setMessages(messages.filter((m) => m.id !== message.id));
    };

    return (
        <Screen>
            <FlatList
                data={messages}
                keyExtractor={(message) => message.id.toString()}
                renderItem={({ item }) => (
                    <ListItem
                        title={item.title}
                        subTitle={item.description}
                        image={item.image}
                        onPress={() => {
                            console.log("Message press: ", item);
                        }}
                        renderRightActions={() => (
                            <ListItemDeleteAction
                                onPress={() => handlerDelete(item)}
                            />
                        )}
                    />
                )}
                ItemSeparatorComponent={ListItemSeparator}
                refreshing={refreshing}
                onRefresh={() => {
                    setMessages([
                        {
                            id: 2,
                            title: "T2",
                            description: "D2",
                            image: require("../../assets/ivan.jpg"),
                        },
                    ]);
                }}
            />
        </Screen>
    );
};
const styles = StyleSheet.create({});

export default MessagesScreen;
