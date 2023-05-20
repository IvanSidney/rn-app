import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import uuid from "react-native-uuid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc, disableNetwork, enableNetwork } from "firebase/firestore";

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
import { storage } from "../config/firabase";
import { database } from "../config/firabase";
import UploadScreen from "./UploadScreen";
import AppButton from "../components/AppButton";

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
    const [progress, setProgress] = useState(0);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [error, setError] = useState(null);

    const getInitialValues = () => ({
        title: "",
        price: "",
        description: "",
        category: null,
        images: [],
    });
    const location = useLocation();
    const id = uuid.v4();
    const offDB = async () => {
        await disableNetwork(database);
    };
    const onDB = async () => {
        await enableNetwork(database);
    };

    const handlerSubmit = (listing, { resetForm }) => {
        setProgress(0);
        setUploadVisible(true);
        // function fileNameFromUrl(url) {
        //     var matches = url.match(/\/([^\/?#]+)[^\/]*$/);
        //     if (matches.length > 1) {
        //         return matches[1];
        //     }
        //     return null;
        // }
        // const imgName = fileNameFromUrl(listing.images[0]);

        // await addImage(listing.images[0], id);
        addPost(listing);
        if (error !== null) {
            setUploadVisible(false);
            return alert("Could not save the losting");
        }

        resetForm({ ...getInitialValues() });
    };
    const addPost = async (listing) => {
        const img = await fetch(listing.images[0]);
        const blob = await img.blob();

        const imageRef = ref(storage, `images/${id}.jpg`);
        const uploadTask = uploadBytesResumable(imageRef, blob);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setProgress(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                setError(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setDoc(doc(database, "listings", id), {
                        categoryId: listing.category.value,
                        id: id,
                        title: listing.title,
                        price: listing.price,
                        location: location,
                        description: listing.description,
                        images: [url],
                    }).catch((error) => setError(error));
                });
            }
        );
    };

    return (
        <Screen style={styles.container}>
            <UploadScreen
                onDone={() => {
                    setUploadVisible(false);
                }}
                progress={progress}
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
                <AppButton onPress={offDB} title={"off"} />
                <AppButton onPress={onDB} title={"on"} />
            </AppForm>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: { padding: 10 },
});

export default ListingEditScreen;
