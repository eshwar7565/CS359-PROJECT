import React from 'react'

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Stack, Button } from "@mui/material";

import FormProvider from '../../../components/hook-form/FormProvider';
import RHFTextField from '../../../components/hook-form/RHFTextFiled';
import {
     useDispatch, 
    useSelector
} from "react-redux";
import { ForgotPassword } from '../../../redux/slices/auth';

const ResetPasswordForm = () => {
    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.auth);
    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Email must be a valid email address"),

    });
    const defaultValues = {
        email: "demo@gmail.com",

    };
    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues,
    });
    const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
    } = methods;

    const onSubmit = async (data) => {
        try {
            console.log(data);
            // submit data to backend
            dispatch(ForgotPassword(data));
        } catch (error) {
            console.error(error);
            reset();
            setError("afterSubmit", {
                ...error,
                message: error.message,
            });
        }
    };
    return (
        <FormProvider methods={methods}  onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>


                <RHFTextField name="email" label="Email address" />
                
            <Button
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"

            sx={{
                bgcolor: "text.primary",
                color: (theme) =>
                    theme.palette.mode === "light" ? "common.white" : "grey.800",
                "&:hover": {
                    bgcolor: "text.primary",
                    color: (theme) =>
                        theme.palette.mode === "light" ? "common.white" : "grey.800",
                },
            }}
        >
            Send Request
        </Button>


            </Stack>




        </FormProvider>
    )
}

export default ResetPasswordForm
