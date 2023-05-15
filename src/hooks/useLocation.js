import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default useLocation = () => {
    const [location, setLocation] = useState();

    const getLocation = async () => {
        try {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (!status) return;
            const {
                coords: { latitude, longitude },
            } = await Location.getCurrentPositionAsync();
            setLocation({ latitude, longitude });
        } catch (error) {}
    };

    useEffect(() => {
        getLocation();
    }, []);

    return location;
};
