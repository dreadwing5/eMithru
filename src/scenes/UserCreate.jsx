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
            sx={{
              width: { sm: 300, md: 300 },
              "& .MuiInputBase-root": {
                width: 1030,
              },
            }}
            label="Phone"
            id="outlined-size-small"
            defaultValue=""
            size="small"
          />
        </div>

        <Button sx={{ m: 3, ml: 8, p: 1, width: "137ch" }} variant="contained">
          Add User
        </Button>
      </Box>
    </>
  );
};

export default UserCreate;
