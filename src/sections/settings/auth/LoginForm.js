import React from 'react'
import { useState } from "react";
import * as Yup from "yup";




import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Link, Stack, Button, IconButton, InputAdornment } from "@mui/material";

import FormProvider from '../../../components/hook-form/FormProvider';
import RHFTextField from '../../../components/hook-form/RHFTextFiled';
import {
    //  useDispatch, 
    // useSelector
} from "react-redux";
import { Eye, EyeSlash } from "phosphor-react";
const LoginForm = () => {
    // const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    // const { isLoading } = useSelector((state) => state.auth);
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Email must be a valid email address"),
        password: Yup.string().required("Password is required"),
    });
    const defaultValues = {
        email: "demo@gmail.com",
        password: "demo1234",
    };
    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });
    // const {
    // reset,
    // setError,
    // handleSubmit,
    // formState: { errors },
    // } = methods;

    // const onSubmit = async (data) => {
    //     try {
    //         console.log(data);
    //         // submit data to backend
    //         // dispatch(LoginUser(data));
    //     } catch (error) {
    //         console.error(error);
    //         reset();
    //         setError("afterSubmit", {
    //             ...error,
    //             message: error.message,
    //         });
    //     }
    // };
    return (
        <FormProvider methods={methods} >
            <Stack spacing={3}>


                <RHFTextField name="email" label="Email address" />

                <RHFTextField
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Stack alignItems="flex-end" sx={{ my: 2 }}>
                <Link>
                    Forgot password?
                </Link>
            </Stack>
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
                Login
            </Button>


        </FormProvider>
    )
}

export default LoginForm
