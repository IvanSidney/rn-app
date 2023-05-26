import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import LottieView from "lottie-react-native";

const UploadScreen = ({ onDone, visible = false }) => {
    return (
        <Modal visible={visible}>
            <View style={styles.container}>
                <LottieView
                    autoPlay
                    onAnimationFinish={onDone}
                    loop={false}
                    style={styles.animation}
                    source={require("../../assets/animations/done.json")}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    animation: { width: 250 },
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
});

export default UploadScreen;
