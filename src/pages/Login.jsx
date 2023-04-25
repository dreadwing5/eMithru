import * as React from "react";
import logo from "../public/logo.png";
import {
  Box,
  Card,
  Typography,
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Link,
  Avatar,
  useTheme,
} from "@mui/material";
import { useContext, useRef } from "react";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";
import Image from "mui-image";

import Illustration from "../public/login_illustration.png";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <Container maxWidth="lg">
      {/* <Avatar
        sx={{
          background: theme.palette.background.paper,
          width: 90,
          height: 90,
          margin: "0 auto",
          mt: 2,
          mb: 2,
        }}
      >
        <img
          src={logo}
          alt="CMRIT Logo"
          width="100"
          style={{
            transform: "scale(1.3)",
            filter:
              theme.palette.mode === "dark"
                ? "invert(100%) hue-rotate(180deg)"
                : "none",
          }}
        />
      </Avatar> */}
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
                    <Box>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Keep me logged in"
                      />
                    </Box>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, borderRadius: 1, p: 2 }}
                      disabled={isFetching}
                      onClick={handleSubmit}
                    >
                      {isFetching ? (
                        <CircularProgress size="20px" sx={{ color: "#fff" }} />
                      ) : (
                        "Log In"
                      )}
                    </Button>
                    <Box sx={{ display: "flex" }}>
                      <Link
                        component="button"
                        variant="body1"
                        onClick={() => {
                          // handle forgot password logic here
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Box>
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
  );
};

export default Login;
