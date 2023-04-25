import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import api from "../../utils/axios";
import { useForm } from "react-hook-form";
import { Box, Grid, Card, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  FormProvider,
  RHFTextField,
} from "../../components/hook-form";

const DEFAULT_VALUES = {
  Details: "Low Attendance and Low Performance",
  PhoneNo: "+91 987654321",
  Remarks: "Resolved",
  CallingReason:"Low Attendance",
 
};

export default function Counselling() {
  const [fields, setFields] = useState([{ id: 1 }]);
  const addFields = () => {
    const newId = fields.length + 1;
    setFields([...fields, { id: newId }]);
  };
  const remove = () => {
    const newFields = [...fields];
    newFields.pop();
    setFields(newFields);
  };
  

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    defaultValues: {
      Details: "",
      PhoneNo: "",
      Remarks: "",
      CallingReason:"",
      
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
                <Grid item xs={12} md={12}>
                <Typography variant="h5">Counselling</Typography>
                </Grid>
                {fields.map((field) => (
                  <React.Fragment key={field.id}>
                    <Grid item xs={12} md={2}>
                      <RHFTextField
                        name={`dateOfStart${field.id}`}
                        label="Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        register={methods.register}
                      />
                    </Grid>
                    <Grid item xs={12} md={10}>
                      <RHFTextField
                        name="Details"
                        label="Details"
                        multiline
                        fullWidth
                        register={methods.register}
                      />
                    </Grid>
                  

                    
                    </React.Fragment>
            ))}
            <Grid item xs={12} md={12}>
              <Box display="flex" justifyContent="flex-end">
                <LoadingButton
                  variant="outlined"
                  color="primary"
                  sx={{mx:1}}
                  onClick={addFields}
                >
                  Add More
                </LoadingButton>
                {fields.length >0 && (
                
                
                <LoadingButton
                sx={{mx:1}}
                  variant="outlined"
                  color="primary"
                  onClick={() => remove()}
                >
                  Remove Last
                </LoadingButton>
                )}
              </Box>
            </Grid>
          </Grid>
        
        </Card>

        <Card sx={{ p: 3,my:2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Typography variant="h5">Telephonic Conversation</Typography>
                  
                </Grid>
                {fields.map((field) => (
                  <React.Fragment key={field.id}>
                    <Grid item xs={12} md={2}>
                      <RHFTextField
                        name={`dateOfStart${field.id}`}
                        label="Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        register={methods.register}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <RHFTextField
                        name="PhoneNo"
                        label="Phone No."
                        fullWidth
                        register={methods.register}
                      />
                    </Grid>

                    <Grid item xs={12} md={7}>
                      <RHFTextField
                        name="CallingReason"
                        label="Calling Reason"
                        multiline
                        fullWidth
                        register={methods.register}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                    <RHFTextField
                        name="Remarks"
                        label="Remarks"
                        multiline
                        fullWidth
                        />

                    </Grid>
                  

                    
                    </React.Fragment>
            ))}
            <Grid item xs={12} md={12}>
              <Box display="flex" justifyContent="flex-end">
                <LoadingButton
                  variant="outlined"
                  color="primary"
                  sx={{mx:1}}
                  onClick={addFields}
                >
                  Add More
                </LoadingButton>
                {fields.length >0 && (
                
                
                <LoadingButton
                sx={{mx:1}}
                  variant="outlined"
                  color="primary"
                  onClick={() => remove()}
                >
                  Remove Last
                </LoadingButton>
                )}
              </Box>
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
