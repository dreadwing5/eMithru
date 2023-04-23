import React from 'react'
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
firstName: "",
middleName: "",
lastName: "",
email: "",
relationWithGuardian: "",
mobileNumber: "",
phoneNumber: "",
residenceAddress: "",
taluka: "",
village: "",
pincode: "",
};



export default function LocalGuardianForm() {
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
      
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
<Grid container spacing={2}>


<Grid item xs={12}>

<RHFTextField
         name="firstName"
         label="First Name"
         fullWidth
         autoComplete="given-name"
         required
       />
</Grid>
<Grid item xs={12}>
<RHFTextField
         name="middleName"
         label="Middle Name"
         fullWidth
         autoComplete="additional-name"
       />
</Grid>
<Grid item xs={12}>
<RHFTextField
         name="lastName"
         label="Last Name"
         fullWidth
         autoComplete="family-name"
         required
       />
</Grid>
<Grid item xs={12}>
<RHFTextField
         name="email"
         label="Email"
         type="email"
         fullWidth
         autoComplete="email"
         required
       />
</Grid>
<Grid item xs={12}>
<RHFTextField
         name="relationWithGuardian"
         label="Relation with Guardian"
         fullWidth
         required
       />
</Grid>
<Grid item xs={12} md={6}>
<RHFTextField
         name="mobileNumber"
         label="Mobile Number"
         type="tel"
         fullWidth
         required
       />
</Grid>
<Grid item xs={12} md={6}>
<RHFTextField
         name="phoneNumber"
         label="Phone Number"
         type="tel"
         fullWidth
       />
</Grid>
<Grid item xs={12}>
<RHFTextField
         name="residenceAddress"
         label="Residence Address"
         multiline
         fullWidth
         rows={4}
         required
       />
</Grid>
<Grid item xs={12} md={4}>
<RHFTextField name="taluka" label="Taluka" fullWidth required />
</Grid>
<Grid item xs={12} md={4}>
  <RHFTextField name="district" label="District" fullWidth required />
</Grid>
<Grid item xs={12} md={4}>
  <RHFTextField name="state" label="State" fullWidth required />
</Grid>
<Grid item xs={12} md={4}>
  <RHFTextField name="pincode" label="Pincode" fullWidth required />
</Grid>
{/* <Grid item xs={12}>
  <FormControlLabel
    control={
      <Controller
        name="termsAndConditions"
        control={control}
        defaultValue={false}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            color="primary"
            onChange={(e) => onChange(e.target.checked)}
            checked={value}
          />
        )}
      />
    }
    label="I agree to the terms and conditions"
    required
  />
</Grid> */}
<Grid item xs={12}>
  <LoadingButton type="submit" variant="contained" color="primary">
    Submit
  </LoadingButton>
 

</Grid>
</Grid>
</Card>

</FormProvider>





    </div>
  )
}
