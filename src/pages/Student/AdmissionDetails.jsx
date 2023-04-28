import React from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Box, Grid, Card, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// utils

// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from "../../components/hook-form";

export default function AdmissionDetails() {
  const { enqueueSnackbar } = useSnackbar();
  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required("Name is required"),
  });

  const defaultValues = {
    displayName: "",
    email: "",
    photoURL: "",
    phoneNumber: "",
    country: "",
    address: "",
    state: "",
    city: "",
    zipCode: "",
    about: "",
    isPublic: false || false,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      console.log(methods.getValues());
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar("Update success!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "photoURL",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  const Type = ["COMEDK", "CET", "MANAGEMENT", "SNQ"];
  const Semester = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <h3>Admission Details at CMRIT</h3>

              <Divider sx={{ mb: 3 }} />
              <Box
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  },
                }}
              >
                <RHFTextField name="Admission Year" label="Admission Year" />
                <RHFTextField name="Branch" label="Branch " />
                <RHFSelect name="Semester" label="Semester" placeholder="Board">
                  <option value="" />
                  {Semester.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect
                  name="Type of admission"
                  label="Type of admission"
                  placeholder="Board"
                >
                  <option value="" />
                  {Type.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
                <RHFTextField name="Category" label="Category" />
                <RHFTextField
                  name="USN(University Seat Number)"
                  label="USN(University Seat Number)"
                />
                <RHFTextField
                  name="College ID Number"
                  label="College ID Number"
                />
              </Box>
              <h3>Change of Branch (if applicable)</h3>

              <Divider sx={{ mb: 3 }} />
              <Box
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  },
                }}
              >
                <RHFTextField name="Year of Change" label="Year of Change" />
                <RHFTextField name="Branch" label="Branch " />

                <RHFTextField
                  name="USN(University Seat Number)"
                  label="USN(University Seat Number)"
                />
                <RHFTextField
                  name="College ID Number"
                  label="College ID Number"
                />
              </Box>

              <Divider sx={{ mb: 3 }} />
              <Box
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                }}
              >
                <FormControl component="fieldset">
                  <FormLabel component="legend">Documents Submitted</FormLabel>
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="SSLC/ X Marks Card"
                      control={<Checkbox />}
                      label="SSLC/ X Marks Card"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="PUC/ XII Marks Card"
                      control={<Checkbox />}
                      label="PUC/ XII Marks Card"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="Caste Certificate"
                      control={<Checkbox />}
                      label="Caste Certificate"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="Migration Certificate"
                      control={<Checkbox />}
                      label="Migration Certificate"
                      labelPlacement="end"
                    />
                  </FormGroup>
                </FormControl>
              </Box>

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Save Changes
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
}
