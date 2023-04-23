import * as React from "react";
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
} from "@mui/material";
import { useContext, useRef } from "react";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";

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
            mt: 4,
            width: "100%",
            boxShadow:
              "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
            borderRadius: 2,
            backgroundColor: "background.paper",
          }}
        >
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  ml: 3,
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
                  alignItems: "flex-end",
                  minHeight: 600,
                }}
              >
                <img
                  alt="Illustration"
                  src="https://via.placeholder.com/500x600"
                  sx={{ width: "100%" }}
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
