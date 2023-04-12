import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContext, useRef } from "react";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const UserCreate = () => {
  const email = useRef();
  const password = useRef();
  const confirmpassword = useRef();
  const name = useRef();
  const location = useRef();
  const clickSubmit = () => {
    console.log(email.current.value,password.current.value,confirmpassword.current.value,location.current.value);

    console.log(gender,role)
  };

  const [gender, setgender] = React.useState("");
  const [role, setrole] = React.useState("");
  const handle = (event) => {
    setgender(event.target.value);
    
  };
  const handlerole = (event) => {
    setrole(event.target.value);
    
  };

  return (
    <>
      <h1 >Create User</h1>

      <Box
        sx={{
          flexGrow: 1,
          mx: 10,
          my: 5,
          background: "#21295c",
          borderRadius: "20px",
          padding: 3,
        }}
      >
        <Grid
          container
          spacing={5}
          style={{ borderRadius: "20px" }}
          sx={{ rowSpacing: 15, background: "transparent" }}
        >
          <Grid
            item
            xs={6}
            md={6}
            sx={{ background: "transparent", outline: "none", width: "100%" }}
          >
            <Item
              sx={{
                background: "transparent",
                outline: "none",
                boxShadow: "none",
              }}
            >
              {" "}
              <TextField
                fullWidth
                label="Name"
                id="fullWidth"
                inputRef={name}
              />
            </Item>
           

            <Item
              sx={{
                background: "transparent",
                outline: "none",
                boxShadow: "none",
              }}
            >
              {" "}
              <TextField
                fullWidth
                label="Email"
                id="fullWidth"
                inputRef={email}
              />
            </Item>
            <Item
              sx={{
                background: "transparent",
                outline: "none",
                boxShadow: "none",
              }}
            >
            <TextField fullWidth label="Confirm Password" id="fullWidth"    inputRef={confirmpassword}/>
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
          
            <Item
              sx={{
                background: "transparent",
                outline: "none",
                boxShadow: "none",
              }}
            >
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Role"
                    onChange={handlerole}
                  >
                    <MenuItem value={"Student"}>Student</MenuItem>
                    <MenuItem value={"Faculty"}>Faculty</MenuItem>
                    <MenuItem value={"HOD"}>HOD</MenuItem>
                    <MenuItem value={"Admin"}>Admin</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Item>
            <Item
              sx={{
                background: "transparent",
                outline: "none",
                boxShadow: "none",
              }}
            >
              {" "}
              <TextField fullWidth label="Password" id="fullWidth"    inputRef={password} />
            </Item>
            <Item
              sx={{
                background: "transparent",
                outline: "none",
                boxShadow: "none",
              }}
            >
              {" "}
              <Button
                onClick={clickSubmit}
                sx={{ mt: 2, float: "right" }}
                variant="contained"
                type="submit"
              >
                Add User
              </Button>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UserCreate;
