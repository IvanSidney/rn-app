import { useState } from "react";

export default useApi = (apiFunc) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const request = async (...args) => {
        setLoading(true);
        const response = await apiFunc(...args);
        // console.log(11, response);
        setLoading(false);
        if (!response) {
            setError(true);

            return;
        }
        setError(false);
        setData(response);
    };
    return {
        request,
        data,
        error,
        loading,
    };
};
