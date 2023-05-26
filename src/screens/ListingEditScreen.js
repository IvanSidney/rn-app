import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import uuid from "react-native-uuid";

import {
    AppForm,
    AppFormField,
    AppFormPicker,
    SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";
import useImage from "../api/images";

import listings from "../api/listings";

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    price: Yup.number().required().min(1).max(10000).label("Price"),
    category: Yup.object().required().nullable().label("Category"),
    description: Yup.string().label("Description"),
    images: Yup.array().min(1, "Please, select at least one"),
});

const categories = [
    {
        backgroundColor: "#fc5c65",
        icon: "floor-lamp",
        label: "Furniture",
        value: 1,
    },
    {
        backgroundColor: "#fd9644",
        icon: "car",
        label: "Cars",
        value: 2,
    },
    {
        backgroundColor: "#fed330",
        icon: "camera",
        label: "Cameras",
        value: 3,
    },
    {
        backgroundColor: "#26de81",
        icon: "cards",
        label: "Games",
        value: 4,
    },
    {
        backgroundColor: "#2bcbba",
        icon: "shoe-heel",
        label: "Clothing",
        value: 5,
    },
    {
        backgroundColor: "#45aaf2",
        icon: "basketball",
        label: "Sports",
        value: 6,
    },
    {
        backgroundColor: "#4b7bec",
        icon: "headphones",
        label: "Movies & Music",
        value: 7,
    },
    {
        backgroundColor: "#a55eea",
        icon: "book-open-variant",
        label: "Books",
        value: 8,
    },
    {
        backgroundColor: "#778ca3",
        icon: "application",
        label: "Other",
        value: 9,
    },
];

const ListingEditScreen = ({ navigation }) => {
    const { addImage } = useImage();

    const [uploadVisible, setUploadVisible] = useState(false);

    const getInitialValues = () => ({
        title: "",
        price: "",
        description: "",
        category: null,
        images: [],
    });
    const location = useLocation();
    const id = uuid.v4();

    const handlerSubmit = async (listing, { resetForm }) => {
        listing.id = id;
        listing.location = location;

        setUploadVisible(true);
        const imageUrl = await addImage(listing);
        console.log(1, imageUrl);
        listings.addListing({ ...listing, imageUrl });
        resetForm({ ...getInitialValues() });
    };

    return (
        <Screen style={styles.container}>
            <UploadScreen
                onDone={() => {
                    setUploadVisible(false);
                }}
                visible={uploadVisible}
            />
            <AppForm
                initialValues={getInitialValues()}
                onSubmit={handlerSubmit}
                validationSchema={validationSchema}
            >
                <FormImagePicker name="images" />
                <AppFormField
                    maxLength={255}
                    name="title"
                    placeholder="Title"
                />
                <AppFormField
                    keyboardType="numeric"
                    maxLength={8}
                    name="price"
                    placeholder="Price"
                    width={120}
                />
                <AppFormPicker
                    items={categories}
                    name={"category"}
                    numColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder={"Category"}
                    width={"50%"}
                />
                <AppFormField
                    maxLength={255}
                    multiline
                    name="description"
                    numberOfLines={3}
                    placeholder="Description"
                />
                <SubmitButton title={"Post"} />
            </AppForm>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: { padding: 10 },
});

export default ListingEditScreen;
