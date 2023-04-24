import React from 'react'
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import api from "../../utils/axios";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
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
    line1: "123 Main Street",
    line2: "Apt 4B",
    country: "United States",
    state: "New York",
    city: "New York City",
    district: "Manhattan",
    taluka: "Midtown",
    pinCode: "10001",
  };


export default function ContactDetails() {



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
      <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ mt: 1}}>
                <h3>Current Address :</h3>

                <RHFTextField
  name="line1"
  label="Line 1"
  multiline
  required
  fullWidth
/>
<RHFTextField
  name="line2"
  label="Line 2"
  multiline
  fullWidth
/>         

<RHFTextField
  name="country"
  label="Country"
  fullWidth
  required
/>
<RHFTextField
  name="state"
  label="State"
  multiline
  fullWidth
/>
<RHFTextField
  name="city"
  label="City"
  fullWidth
/>
<RHFTextField
  name="district"
  label="District"
  fullWidth
/>
<RHFTextField
  name="taluka"
  label="Taluka"
  fullWidth
/>
<RHFTextField
  name="pincode"
  label="Pin-Code"
  fullWidth
  required
/>
            </Stack>
            
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
        <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ mt: 1}}>
                <h3>Permanent Address :
                <FormControlLabel sx={{float:'right'}} control={<Switch defaultChecked />} label="Same as Current" />
</h3>

                
                <RHFTextField
  name="line1"
  label="Line 1"
  multiline
  required
  fullWidth
/>
<RHFTextField
  name="line2"
  label="Line 2"
  multiline
  fullWidth
/>         

<RHFTextField
  name="country"
  label="Country"
  fullWidth
  required
/>
<RHFTextField
  name="state"
  label="State"
  multiline
  fullWidth
/>
<RHFTextField
  name="city"
  label="City"
  fullWidth
/>
<RHFTextField
  name="district"
  label="District"
  fullWidth
/>
<RHFTextField
  name="taluka"
  label="Taluka"
  fullWidth
/>
<RHFTextField
  name="pincode"
  label="Pin-Code"
  fullWidth
  required
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
  )
}
