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
  RHFSelect,
} from "../../components/hook-form";

const DEFAULT_VALUES = {
  MeetingNo: "1",
  Reason:"Low Attendance of the student ",
  Conclusion:"Will not happen again"
 
};

export default function ParentTeacherMeet() {

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
      MeetingNo: "",
      Reason: "",
      Conclusion:"",
      
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
           

        <Card sx={{ p: 3,my:2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Typography variant="h5">Parent Teachers Meeting</Typography>
                  
                </Grid>
                {fields.map((field) => (
                  <React.Fragment key={field.id}>
                      <Grid item xs={12} md={2}>
                      <RHFTextField
                        name="MeetingNo"
                        label="Meeting No"
                    
                        fullWidth
                        register={methods.register}
                      />
                    </Grid>
                    <Grid item xs={12} md={10}>
                      <RHFTextField
                        name="Reason"
                        label="Reason"
                    
                        fullWidth
                        register={methods.register}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                    <RHFTextField
                        name="Conclusion"
                        label="Conclusion"
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
