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
import { fData } from "../../utils/formatNumber";
// _mock
import { countries } from "../../_mock";
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from "../../components/hook-form";
export default function PrevAcademic() {
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
  const Board = ["CBSE", "ICSE", "State Board", "Others"];

  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <h3>SSLC / Class X</h3>

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
                <RHFTextField name="School" label="School" />
                <RHFTextField name="GPA/ %" label="GPA/ % " />
                <RHFSelect name="Board" label="Board" placeholder="Board">
                  <option value="" />
                  {Board.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
                <RHFTextField name="Year of Passing" label="Year of Passing" />
                <RHFTextField name="SchoolAddress" label="SchoolAddress" />
              </Box>
              <h3>PUC / Class XII</h3>

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
                <RHFTextField name="School" label="School" />
                <RHFTextField name="GPA/ %" label="GPA/ % " />
                <RHFSelect name="Board" label="Board" placeholder="Board">
                  <option value="" />
                  {Board.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
                <RHFTextField name="Year of Passing" label="Year of Passing" />

                <FormControl component="fieldset">
                  <FormLabel component="legend">Subjects</FormLabel>
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="Physics"
                      control={<Checkbox />}
                      label="Physics"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="Chemistry"
                      control={<Checkbox />}
                      label="Chemistry"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="Mathematics"
                      control={<Checkbox />}
                      label="Mathematics"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="Biology"
                      control={<Checkbox />}
                      label="Biology"
                      labelPlacement="start"
                    />
                  </FormGroup>
                </FormControl>

                <RHFTextField name="SchoolAddress" label="SchoolAddress" />
              </Box>
              <Divider sx={{ mt: 3 }} />
              <h3>Lateral Entry/Diploma</h3>

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
                <RHFTextField name="College" label="College" />
                <RHFTextField name="Branch" label="Branch" />

                <RHFTextField name="GPA/ %" label="GPA/ % " />
                <RHFSelect name="Board" label="Board" placeholder="Board">
                  <option value="" />
                  {Board.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
                <RHFTextField name="Year of Passing" label="Year of Passing" />

                <RHFTextField name="CollegeAddress" label="CollegeAddress" />
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
