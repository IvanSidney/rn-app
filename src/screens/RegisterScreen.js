import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../config/firabase";
import Screen from "../components/Screen";
import {
    AppForm,
    AppFormField,
    ErrorMessage,
    SubmitButton,
} from "../components/forms";

const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password"),
});

const RegisterScreen = ({}) => {
    const [registerFailed, setRegisterFailed] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = ({ name, email, password }, { resetForm }) => {
        setError(null);
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res);
                updateProfile(auth.currentUser, {
                    //Replace "Jane Q. User" to the username you desire
                    //And Replace the PhotoURL with the desired Image
                    displayName: name,
                    photoURL: "https://i.pravatar.cc/300",
                })
                    .then(() => {
                        console.log("Update");
                    })
                    .catch((error) => {
                        console.log("Error: ", error);
                    });
            })
            .catch((error) => {
                if (error)
                    return setRegisterFailed(true), setError(error.message);
                else {
                    resetForm();
                }
            });
    };

    return (
        <Screen style={styles.container}>
            <AppForm
                initialValues={{ name: "", email: "", password: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <ErrorMessage error={error} visible={registerFailed} />
                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="account"
                    name="name"
                    placeholder="Name"
                    textContentType="name"
                />
                <AppFormField
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    icon="email"
                    name="email"
                    placeholder="Email"
                    textContentType="emailAddress"
                />
                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />
                <SubmitButton title={"Register"} />
            </AppForm>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 20,
    },
});

export default RegisterScreen;
