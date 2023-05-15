import React from "react";

import AnimatedLottieView from "lottie-react-native";

const ActivitiIndicator = ({ visible = false }) => {
    if (!visible) return null;
    return (
        <AnimatedLottieView
            autoPlay
            loop
            source={require("../../assets/animations/loading.json")}
        />
    );
};

export default ActivitiIndicator;
