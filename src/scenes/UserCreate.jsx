import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const UserCreate = () => {
  return (
    <>
      <h1>Add User</h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 3, ml: 8, width: "55ch" },
          "& .MuiButton-root": { m: 3, ml: 8, width: "80%" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            label="Enter Full Name"
            id="outlined-size-small"
            defaultValue=""
            size="small"
          />
          <TextField
            label="Enter Email ID"
            id="outlined-size-small"
            defaultValue=""
            size="small"
          />
        </div>
        <div>
          <TextField
            label="Enter Password"
            id="outlined-size-small"
            defaultValue=""
            size="small"
            type="password"
          />
          <TextField
            label="Confirm Password"
            id="outlined-size-small"
            defaultValue=""
            size="small"
            type="password"
          />
        </div>
        <div>
          <TextField
            label="Phone"
            id="outlined-size-small"
            defaultValue=""
            size="small"
          />
        </div>
        <Button variant="contained">Add User</Button>
      </Box>
    </>
  );
};

export default UserCreate;
