import logo from "../public/logo.png";
import {
  Box,
  Card,
  Typography,
  Container,
  TextField,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Link,
  Avatar,
  useTheme,
} from "@mui/material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Image from "mui-image";
import Page from "../components/Page";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { loginCall } from "../apiCalls"; // Import the loginCall function

import Illustration from "../public/login_illustration.png";

const Login = () => {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const { isFetching, dispatch } = useContext(AuthContext);

  const [isFacultyDemoChecked, setIsFacultyDemoChecked] = useState(false);
  const [isStudentDemoChecked, setIsStudentDemoChecked] = useState(false);

  const handleFacultyDemoChange = (event) => {
    setIsFacultyDemoChecked(event.target.checked);
    if (event.target.checked) {
      email.current.value = "facultydemo@emithru.com";
      password.current.value = "facultypassword";
      setIsStudentDemoChecked(false);
    } else {
      email.current.value = "";
      password.current.value = "";
    }
  };

  const handleStudentDemoChange = (event) => {
    setIsStudentDemoChecked(event.target.checked);
    if (event.target.checked) {
      email.current.value = "studentdemo@emithru.com";
      password.current.value = "studentpassword";
      setIsFacultyDemoChecked(false);
    } else {
      email.current.value = "";
      password.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!email.current.value || !password.current.value) {
      enqueueSnackbar("Please enter email and password", {
        variant: "warning",
      });
      return;
    }

    try {
      const res = await loginCall(
        {
          email: email.current.value,
          password: password.current.value,
        },
        dispatch
      );

      console.log("API response:", res); // Debug statement

      if (res.status === "success") {
        const { user, accessToken } = res.data;
        console.log("Access Token:", accessToken); // Add this line
        localStorage.setItem("accessToken", accessToken); // Log the user's role
        enqueueSnackbar("Login Successful", { variant: "success" });

        // Store the user's role in local storage or session storage
        localStorage.setItem("userRole", user.role);

        // Redirect based on user's role
        if (user.role === "admin") {
          console.log("Navigating to admin dashboard"); // Debug statement
          navigate("/admin/dashboard");
        } else if (user.role === "faculty") {
          console.log("Navigating to faculty dashboard"); // Debug statement
          navigate("/faculty/dashboard");
        } else if (user.role === "student") {
          console.log("Navigating to student dashboard"); // Debug statement
          navigate("/student/dashboard");
        } else {
          console.log("Navigating to default route"); // Debug statement
          navigate("/");
        }
      } else {
        enqueueSnackbar("Invalid email or password", { variant: "error" });
      }
    } catch (error) {
      console.log("error", error);
      enqueueSnackbar("Error logging in. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <Page title="LOGIN | CMRIT">
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              p: 4,
              width: "100%",
              borderRadius: 2,
              backgroundColor: "background.paper",
              boxShadow: " 0px 0px 20px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Grid container spacing={8}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    ml: 3,
                    postion: "relative",
                  }}
                >
                  <Box sx={{ mb: 7 }}>
                    <Typography variant="h3" gutterBottom>
                      Sign in to e-mithru
                    </Typography>

                    <Typography gutterBottom sx={{ color: "text.secondary" }}>
                      Welcome back! Please Login to your account.
                    </Typography>
                  </Box>
                  <Box>
                    <Stack spacing={2} sx={{ textAlign: "left" }}>
                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: "background.default",
                          borderRadius: 1,
                          mt: 2,
                        }}
                      >
                        <Typography variant="subtitle1" gutterBottom>
                          Demo Credentials
                        </Typography>
                        <FormControlLabel
                          control={
                            <Radio
                              checked={isFacultyDemoChecked}
                              onChange={handleFacultyDemoChange}
                            />
                          }
                          label="Faculty Demo"
                        />
                        <FormControlLabel
                          control={
                            <Radio
                              checked={isStudentDemoChecked}
                              onChange={handleStudentDemoChange}
                            />
                          }
                          label="Student Demo"
                        />
                      </Box>
                      <Typography variant="subtitle1">Email Address</Typography>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        inputRef={email}
                      />
                      <Typography variant="subtitle1">Password</Typography>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputRef={password}
                      />

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: 1, p: 2 }}
                        disabled={isFetching}
                        onClick={handleSubmit}
                      >
                        {isFetching ? (
                          <CircularProgress
                            size="20px"
                            sx={{ color: "#fff" }}
                          />
                        ) : (
                          "Log In"
                        )}
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    height: "70vh",
                  }}
                >
                  <Image
                    src={Illustration}
                    height="65vh"
                    sx={{
                      width: "100%",
                      objectFit: "cover",
                    }}
                    duration={1000}
                  />
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>
    </Page>
  );
};

export default Login;
