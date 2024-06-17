import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  Avatar,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
} from "@mui/icons-material";

import { useSnackbar } from "notistack";

const Root = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
}));

const FormCard = styled(Card)(({ theme }) => ({
  display: "flex",
  width: "100%",
  maxWidth: 900,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  overflow: "hidden",
}));

const LeftPanel = styled(Box)(({ theme }) => ({
  width: "35%",
  backgroundColor: "#0D47A1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  color: theme.palette.common.white,
}));

const RightPanel = styled(CardContent)(({ theme }) => ({
  width: "65%",
  padding: theme.spacing(4),
}));

const FormButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const AddUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        name,
        email,
        password,
        passwordConfirm,
        phone,
        role,
        avatar,
      };

      const response = await api.post("/users/signup", formData);

      console.log("User created:", response.data);
      enqueueSnackbar("User created. Waiting for verification.", {
        variant: "success",
      });
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error adding user:", error);
      if (
        error.response &&
        error.response.data.message === "Email already exists"
      ) {
        enqueueSnackbar(
          "Email already exists. User is waiting for verification.",
          {
            variant: "warning",
          }
        );
      } else {
        enqueueSnackbar("Error creating user. Please try again.", {
          variant: "error",
        });
      }
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <Root>
      <FormCard>
        <LeftPanel>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              bgcolor: "#42a5f5",
              color: "#fff",
              fontSize: 48,
            }}
            src={avatar ? URL.createObjectURL(avatar) : null}
          >
            {!avatar && name.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h5">Let's get you set up</Typography>
          <Typography variant="body1" align="center">
            It should only take a couple of minutes to pair with your watch.
          </Typography>
        </LeftPanel>
        <RightPanel>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    label="Role"
                    required
                  >
                    <MenuItem value="">Select Role</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="faculty">Faculty</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Avatar
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <FormButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Add User
                </FormButton>
              </Grid>
            </Grid>
          </form>
        </RightPanel>
      </FormCard>
    </Root>
  );
};

export default AddUserForm;
