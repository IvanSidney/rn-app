import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firabase";

import Screen from "../components/Screen";
import {
    ErrorMessage,
    AppForm,
    SubmitButton,
    AppFormField,
} from "../components/forms";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password"),
});

const LoginScreen = ({}) => {
    const [loginFailed, setLogitFailed] = useState(false);

    const handleSubmit = ({ email, password }, { resetForm }) => {
        signInWithEmailAndPassword(auth, email, password).catch((error) => {
            if (error) return setLogitFailed(true);
            else {
                resetForm();
            }
        });
    };

    return (
        <Screen style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../../assets/logo-red.png")}
            />
            <AppForm
                initialValues={{ email: "", password: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <ErrorMessage
                    error="Invalid email and/or password."
                    visible={loginFailed}
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
                <SubmitButton title={"Login"} />
            </AppForm>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: { padding: 10 },
    logo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20,
    },
});

export default LoginScreen;
