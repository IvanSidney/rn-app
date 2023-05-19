import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";

const AppFormField = ({ name, width, ...otherProps }) => {
    const { setFieldTouched, handleChange, errors, touched, values } =
        useFormikContext();
    return (
        <>
            <AppTextInput
                value={values[name]}
                onBlur={() => setFieldTouched(name)}
                onChangeText={handleChange(name)}
                width={width}
                {...otherProps}
            />

            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
};

export default AppFormField;
