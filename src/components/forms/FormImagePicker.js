import React from "react";
import { useFormikContext } from "formik";

import ImageInputList from "../ImageInputList";
import ErrorMessage from "./ErrorMessage";

const FormImagePicker = ({ name }) => {
    const { errors, setFieldValue, touched, values } = useFormikContext();
    const imageUris = values[name];

    const handlerAdd = (uri) => {
        setFieldValue(name, [...imageUris, uri]);
    };

    const handlerRemove = (uri) => {
        setFieldValue(
            name,
            imageUris.filter((imageUri) => imageUri !== uri)
        );
    };

    return (
        <>
            <ImageInputList
                imageUris={imageUris}
                onAddImage={handlerAdd}
                onRemoveImage={handlerRemove}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
};

export default FormImagePicker;
