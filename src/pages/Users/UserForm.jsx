import { useState } from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import axios from "axios";

// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// @mui
import { Box, Grid, Card, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Divider from "@mui/material/Divider";

// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from "../../components/hook-form";

// validation schema
const UserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirm: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function UserForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [avatar, setAvatar] = useState(null);

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
      role: "admin",
    },
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (formData) => {
      try {
        const userData = {
          ...formData,
          avatar,
        };
        console.log(userData);

        await axios.post("/api/users", userData);

        enqueueSnackbar("User created successfully!", { variant: "success" });
        methods.reset();
        setAvatar(null);
      } catch (error) {
        console.error(error);
        enqueueSnackbar("An error occurred while creating the user", {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar, methods, avatar]
  );

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "avatar",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        setAvatar(file);
      }
    },
    [setValue, setAvatar]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "300px", py: 10, px: 3, textAlign: "center" }}>
            <RHFUploadAvatar
              name="avatar"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of 3MB
                </Typography>
              }
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField
                name="name"
                label="Name"
                required
                fullWidth
                autoComplete="given-name"
              />
              <RHFTextField
                name="email"
                label="Email"
                type="email"
                required
                fullWidth
                autoComplete="email"
              />
              <RHFTextField
                name="phone"
                label="Phone"
                type="tel"
                required
                fullWidth
                autoComplete="tel"
              />
              <RHFTextField
                name="password"
                label="Password"
                type="password"
                required
                fullWidth
                autoComplete="new-password"
              />
              <RHFTextField
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                required
                fullWidth
                autoComplete="new-password"
              />
              <RHFSelect
                name="role"
                label="Role"
                fullWidth
                required
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                ]}
              />
              <Divider sx={{ my: 2 }} />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={isSubmitting}
              >
                Create User
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
