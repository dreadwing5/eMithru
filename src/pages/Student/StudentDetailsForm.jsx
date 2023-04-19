import { useState } from "react";
import { useSnackbar } from "notistack";
import { useCallback } from "react";

import api from "../../utils/axios";

// form
import { useForm } from "react-hook-form";

// @mui
import { Box, Grid, Card, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// components
import {
  FormProvider,
  RHFTextField,
  RHFSelect,
  RHFUploadAvatar,
  RHFCheckbox,
} from "../../components/hook-form";

const sportsLevels = [
  { label: "State", value: "state" },
  { label: "National", value: "national" },
  { label: "International", value: "international" },
  { label: "Not Applicable", value: "notApplicable" },
];

const defenceStatus = [
  { label: "Defence", value: "defence" },
  { label: "Ex-Serviceman", value: "exServiceman" },
  { label: "Not Applicable", value: "notApplicable" },
];

const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const DEFAULT_VALUES = {
  fullName: {
    firstName: "John",
    middleName: "A",
    lastName: "Doe",
  },
  department: "Computer Science",
  nameOnMarksheet: "John A Doe",
  personalEmail: "john.doe@example.com",
  email: "john.doe@college.edu",
  usn: "CS101",
  dateOfBirth: "2000-01-01",
  bloodGroup: "O+",
  mobileNumber: "1234567890",
  alternatePhoneNumber: "0987654321",
  nationality: "American",
  domicile: "California",
  religion: "Christianity",
  category: "General",
  caste: "N/A",
  hostelite: "no",
  subCaste: "N/A",
  aadharCardNumber: "123456789012",
  physicallyChallenged: "no",
  admissionDate: "2022-09-01",
  sportsLevel: "national",
  defenceOrExServiceman: "notApplicable",
  isForeigner: "no",
  photo: null,
};

export default function StudentDetailsForm() {
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    defaultValues: {
      fullName: {
        firstName: "",
        middleName: "",
        lastName: "",
      },
      department: "",
      nameOnMarksheet: "",
      personalEmail: "",
      email: "",
      usn: "",
      dateOfBirth: "",
      bloodGroup: "",
      mobileNumber: "",
      alternatePhoneNumber: "",
      nationality: "",
      domicile: "",
      religion: "",
      category: "",
      caste: "",
      hostelite: "",
      subCaste: "",
      aadharCardNumber: "",
      physicallyChallenged: "",
      admissionDate: "",
      sportsLevel: "",
      defenceOrExServiceman: "",
      isForeigner: "",
      photo: null,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const handleFillMockData = () => {
    reset(DEFAULT_VALUES);
  };

  const handleReset = () => {
    reset();
  };

  const onSubmit = useCallback(async (formData) => {
    try {
      await api.post("/api/student-profile", formData);
      enqueueSnackbar("Student profile created successfully!", {
        variant: "success",
      });
      reset();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("An error occurred while processing the request", {
        variant: "error",
      });
    }
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%", py: 10, px: 3, textAlign: "center" }}>
            <RHFUploadAvatar
              name="photo"
              accept="image/*"
              maxSize={3145728}
              helperText={
                <Box
                  component="span"
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
                </Box>
              }
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ mt: 3 }}>
              <RHFTextField
                name="fullName.firstName"
                label="First Name"
                fullWidth
                autoComplete="given-name"
              />
              <RHFTextField
                name="fullName.middleName"
                label="Middle Name"
                fullWidth
                autoComplete="additional-name"
              />
              <RHFTextField
                name="fullName.lastName"
                label="Last Name"
                fullWidth
                autoComplete="family-name"
              />
              <RHFTextField
                name="department"
                label="Department"
                fullWidth
                autoComplete="off"
              />
              <RHFTextField
                name="nameOnMarksheet"
                label="Name on Marksheet"
                fullWidth
                autoComplete="off"
              />
              <RHFTextField
                name="personalEmail"
                label="Personal Email"
                type="email"
                fullWidth
                autoComplete="email"
              />
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="usn"
                  label="USN"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="dateOfBirth"
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="bloodGroup"
                  label="Blood Group"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="mobileNumber"
                  label="Mobile Number"
                  type="tel"
                  fullWidth
                  autoComplete="tel"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="alternatePhoneNumber"
                  label="Alternate Phone Number"
                  type="tel"
                  fullWidth
                  autoComplete="tel"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="nationality"
                  label="Nationality"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="domicile"
                  label="Domicile"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="religion"
                  label="Religion"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="category"
                  label="Category"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="caste"
                  label="Caste"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="subCaste"
                  label="Sub-Caste"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="aadharCardNumber"
                  label="Aadhar Card Number"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFSelect name="sportsLevel" label="Sports Level" fullWidth>
                  {sportsLevels.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFSelect
                  name="defenceOrExServiceman"
                  label="Defence or Ex-Serviceman"
                  fullWidth
                >
                  {defenceStatus.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="admissionDate"
                  label="Admission Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFSelect name="hostelite" label="Hostelite" fullWidth>
                  {yesNoOptions.map((option) => (
                    <option key={option.value}>{option.label}</option>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFSelect
                  name="physicallyChallenged"
                  label="Physically Challenged"
                  fullWidth
                >
                  {yesNoOptions.map((option) => (
                    <option key={option.value}>{option.label}</option>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFSelect name="isForeigner" label="Is Foreigner" fullWidth>
                  {yesNoOptions.map((option) => (
                    <option key={option.value}>{option.label}</option>
                  ))}
                </RHFSelect>
              </Grid>
            </Grid>
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <Box display="flex" gap={1}>
                {import.meta.env.MODE === "development" && (
                  <LoadingButton
                    variant="outlined"
                    onClick={handleFillMockData}
                  >
                    Fill Mock Data
                  </LoadingButton>
                )}
                <LoadingButton variant="outlined" onClick={handleReset}>
                  Reset
                </LoadingButton>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Save
                </LoadingButton>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
