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

// utils
import { fData } from "../../utils/formatNumber";
// _mock
import { countries } from "../../../../_mock";
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from "../../components/hook-form";

// ----------------------------------------------------------------------

export default function PersonalDetails() {
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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "300px", py: 10, px: 3, textAlign: "center" }}>
            <RHFUploadAvatar
              name="photoURL"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                rowGap: 5.3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <RHFTextField name="displayName" label="Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFSelect name="Gender" label="Gender" placeholder="Gender" />
              <RHFTextField name="phoneNumber" label="Phone Number" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="nationality" label="Nationality" />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
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
              <RHFTextField name="displayName" label="Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFSelect name="Gender" label="Gender" placeholder="Gender" />
              <RHFTextField name="phoneNumber" label="Phone Number" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="nationality" label="Nationality" />
              <RHFTextField name="fathersname" label="Father's Name" />
              <RHFTextField name="fathersemail" label="Father's Email" />
              <RHFTextField name="occupation" label="Father's Occupation" />
              <RHFTextField
                name="office address"
                multiline
                rows={4}
                label="Office Address"
              />
              <RHFTextField name="Mothersname" label="Mother's Name" />
              <RHFTextField name="Mothersemail" label="Mother's Email" />
              <RHFTextField name="occupation" label="Mother's Occupation" />
              <RHFTextField
                name="office address"
                multiline
                rows={4}
                label="Office Address"
              />
              <RHFTextField
                name="Permanent address"
                multiline
                rows={4}
                label="Permanent Address"
              />
              <RHFTextField
                name="brotherssister"
                multiline
                rows={4}
                label="How many brothers and sisters do you have and what are they doing?"
              />

              <RHFSelect name="country" label="Country" placeholder="Country">
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="state" label="State/Region" />

              <RHFTextField name="city" label="City" />
              <RHFTextField name="zipCode" label="Zip/Code" />
            </Box>

            <Divider sx={{ mt: 3 }} />
            <h3>Local Guardian's Details</h3>

            <Divider />

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="GuardiansName" label="Name" />
              <RHFTextField name="Guardiansemail" label="Email Address" />
              <RHFTextField name="GuardiansphoneNumber" label="Phone Number" />
              <RHFTextField name="Guardiansaddress" label="Address" />

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
  );
}
