import React from 'react'
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import api from "../../utils/axios";
import { useForm } from "react-hook-form";
import { Box, Grid, Card, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  FormProvider,
  RHFTextField,
  RHFSelect,
  RHFUploadAvatar,
  RHFCheckbox,
} from "../../components/hook-form";
const placementType = [
  { label: "In-Campus", value: "In-Campus" },
  { label: "Off-Campus", value: "Off-Campus" },
  { label: "Pool", value: "Pool" },
];

const DEFAULT_VALUES = {
  companyName: "ABC Corp",
  location:"Bangalore",
  semester: "7",
  dateOfSelection: "April 15, 2023",
  dateOfEnd:"June 15, 2023",
  Stipend: "40000",

  description:
    "I am excited to start my career at ABC Corp and grateful for this opportunity. I hope to contribute to the company's growth and learn from my colleagues.",
};
export default function InternshipDetails() {
    const { enqueueSnackbar } = useSnackbar();

    const methods = useForm({
      defaultValues: {
        companyName: "",
        location:"",
        semester: "",
        dateOfSelection: "",
        dateOfEnd:"",
        Stipend: "",
        
        description: "",
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
        await api.post("/api/abc", formData);
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
    <div>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item sx={{ textAlign: "center" }} xs={12} md={12}>
              <h3>Internship - 01</h3>
 </Grid>
 <Grid item  xs={12} md={6}>

                <RHFTextField
                  name="companyName"
                  label="Company Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="location"
                  label="Location"
                
                  fullWidth
                  
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="dateOfSelection"
                  label="Start Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  register={methods.register}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="dateOfEnd"
                  label="End Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  register={methods.register}
                />
              </Grid>
             
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="Stipend"
                  label="Stipend"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="semester"
                  label="Semester"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <RHFTextField
                  name="description"
                  label="Description"
                  multiline
                  fullWidth
                  autoComplete="off"
                  register={methods.register}
                />
              </Grid>
            
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
            <Grid item sx={{ textAlign: "center" }} xs={12} md={12}>
              <h3>Internship - 02</h3>
 </Grid>
 <Grid item  xs={12} md={6}>

                <RHFTextField
                  name="companyName"
                  label="Company Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="location"
                  label="Location"
                
                  fullWidth
                  
                />
              </Grid>
             
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="dateOfSelection"
                  label="Start Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  register={methods.register}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="dateOfEnd"
                  label="End Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  register={methods.register}
                />
              </Grid>
             
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="Stipend"
                  label="Stipend"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="semester"
                  label="Semester"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <RHFTextField
                  name="description"
                  label="Description"
                  multiline
                  fullWidth
                  autoComplete="off"
                  register={methods.register}
                />
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
  </div>
  )
}
