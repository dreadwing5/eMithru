import React from "react";
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

const DEFAULT_VALUES = {
  fatherFirstName: "",
  fatherMiddleName: "",
  fatherLastName: "",
  motherFirstName: "",
  motherMiddleName: "",
  motherLastName: "",
  fatherOccupation: "",
  motherOccupation: "",
  fatherOrganization: "",
  motherOrganization: "",
  fatherDesignation: "",
  motherDesignation: "",
  fatherOfficeAddress: "",
  motherOfficeAddress: "",
  fatherAnnualIncome: "",
  motherAnnualIncome: "",
  fatherOfficePhone: "",
  motherOfficePhone: "",
  fatherResidencePhone: "",
  motherResidencePhone: "",
  fatherEmail: "",
  motherEmail: "",
  mobileNumber: "",
  residenceAddress: "",
  fax: "",
  district: "",
  taluka: "",
  village: "",
  state: "",
  pincode: "",
};
export default function ParentsDetails() {
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    defaultValues: DEFAULT_VALUES,
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
      await api.post("/api/my-form-endpoint", formData);
      enqueueSnackbar("Form submitted successfully!", {
        variant: "success",
      });
      reset(DEFAULT_VALUES);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("An error occurred while processing the request", {
        variant: "error",
      });
    }
  }, []);

  return (
    <div>
      {/* <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Grid item xs={6} md={6}>
                <RHFTextField
                  name="fatherFirstName"
                  label="Father's First Name"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <RHFTextField
                  name="fatherMiddleName"
                  label="Father's Middle Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFTextField
                  name="fatherLastName"
                  label="Father's Last Name"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <RHFTextField
                  name="motherFirstName"
                  label="Mother's First Name"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFTextField
                  name="motherMiddleName"
                  label="Mother's Middle Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RHFTextField
                  name="motherLastName"
                  label="Mother's Last Name"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="fatherOccupation"
                  label="Father's Occupation"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="motherOccupation"
                  label="Mother's Occupation"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="fatherOrganization"
                  label="Father's Organization"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="motherOrganization"
                  label="Mother's Organization"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="fatherDesignation"
                  label="Father's Designation"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="motherDesignation"
                  label="Mother's Designation"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="fatherOfficeAddress"
                  label="Father's Office Address"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="motherOfficeAddress"
                  label="Mother's Office Address"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="fatherAnnualIncome"
                  label="Father's Annual Income"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="motherAnnualIncome"
                  label="Mother's Annual Income"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="fatherOfficePhoneNo"
                  label="Father's Office Phone No."
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="motherOfficePhoneNo"
                  label="Mother's Office Phone No."
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="father"
                  label="Mother's Office Phone No."
                  fullWidth
                />
              </Grid>

              <Box sx={{ mb: 2 }}>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  color="primary"
                >
                  Submit
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </FormProvider> */}



<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
              <RHFTextField
                  name="fatherFirstName"
                  label="Father's First Name"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
             <RHFTextField
                  name="fatherMiddleName"
                  label="Father's Middle Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
              <RHFTextField
                  name="fatherLastName"
                  label="Father's Last Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
              <RHFTextField
                  name="MotherFirstName"
                  label="Mother's First Name"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
             <RHFTextField
                  name="MotherMiddleName"
                  label="Mother's Middle Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
              <RHFTextField
                  name="MotherLastName"
                  label="Mother's Last Name"
                  fullWidth
                />
              </Grid>
           
              
            </Grid>
           
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
        <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ mt: 1}}>
                <h3>Father's Details</h3>
                <RHFTextField
                  name="fatherOccupation"
                  label="Father's Occupation"
                  fullWidth
                  required
                />
                 <RHFTextField
                  name="fatherOrganization"
                  label="Father's Organization"
                  fullWidth
                />
                <RHFTextField
                  name="fatherDesignation"
                  label="Father's Designation"
                  fullWidth
                />
              <RHFTextField
                  name="fatherOfficeAddress"
                  label="Father's Office Address"
                  fullWidth
                />
               <RHFTextField
                  name="fatherAnnualIncome"
                  label="Father's Annual Income"
                  fullWidth
                />
                <RHFTextField
                  name="fatherOfficePhoneNo"
                  label="Father's Office Phone No."
                  fullWidth
                />
            </Stack>
            
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
          <Stack spacing={3} sx={{ mt: 1}}>
                <h3>Mother's Details</h3>
                <RHFTextField
                  name="MotherOccupation"
                  label="Mother's Occupation"
                  fullWidth
                  required
                />
                 <RHFTextField
                  name="MotherOrganization"
                  label="Mother's Organization"
                  fullWidth
                />
                <RHFTextField
                  name="MotherDesignation"
                  label="Mother's Designation"
                  fullWidth
                />
              <RHFTextField
                  name="MotherOfficeAddress"
                  label="Mother's Office Address"
                  fullWidth
                />
               <RHFTextField
                  name="MotherAnnualIncome"
                  label="Mother's Annual Income"
                  fullWidth
                />
                <RHFTextField
                  name="MotherOfficePhoneNo"
                  label="Mother's Office Phone No."
                  fullWidth
                />
            </Stack>
          
          </Card>
        </Grid>

       <Grid item xs={12} md={12}>
        <Card sx={{p:3}}>
        <Stack spacing={3} alignItems="flex-end" >
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
    </div>
  );
}
