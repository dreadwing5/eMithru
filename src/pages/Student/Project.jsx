import React from 'react'
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
} from "../../components/hook-form";


const DEFAULT_VALUES = {
    Domain: "AI/ML",
    ProjectTitle:"Mentoring Tool",
    location: "Bangalore",
    dateOfStart: "April 15, 2023",
    dateOfEnd:"June 15, 2023",
  TeamInformation:"1. 1CR19IS189  -ZOHEB ,\n 2.1CR19IS184  -KEDIA,\n 3.1CR19IS125  -SACHIN",
  Projectdescription:"I am excited to start my career at ABC Corp and grateful for this opportunity. I hope to contribute to the company's growth and learn from my colleagues.",
  };


export default function Project() {

    const location = [
        { label: "College", value: "College" },
        { label: "Public Section", value: "Public Section" },
        { label: "Private", value: "Private" },
      ];

      const { enqueueSnackbar } = useSnackbar();

      const methods = useForm({
        defaultValues: {
            Domain: "",
            ProjectTitle:"",
            location: "",
            dateOfStart: "",
            dateOfEnd:"",
          TeamInformation:"",
          Projectdescription:"",
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
             
 <Grid item  xs={12} md={12}>

                <RHFTextField
                  name="Domain"
                  label="Domain"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <RHFTextField
                  name="ProjectTitle"
                  label="Project Title"
                
                  fullWidth
                  
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name="dateOfStart"
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
              <RHFSelect
                    name="location"
                    label="Location"
                    fullWidth
                    register={methods.register}
                  >
                    {location.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </RHFSelect>
              </Grid>
              <Grid item xs={12} md={12}>
                <RHFTextField
                  name="TeamInformation"
                  label="Team Information(USN & Name)"
                  multiline
                  fullWidth
                  autoComplete="off"
                  register={methods.register}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <RHFTextField
                  name="Projectdescription"
                  label="Project Description"
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
