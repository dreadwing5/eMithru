import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const UserProfile = () => {
  return (
    <>
      <div>
        <h1>User Profile</h1>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { mt: 5, ml: 10, width: "50ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              label="First Name"
              id="outlined-size-normal"
              defaultValue=""
            />
            <TextField
              label="Last Name"
              id="outlined-size-normal"
              defaultValue=""
            />
          </div>
          <div>
            <TextField label="USN" id="outlined-size-normal" defaultValue="" />
            <TextField
              label="Department"
              id="outlined-size-normal"
              defaultValue=""
            />
          </div>
          <div>
            <TextField
              id="date"
              label="Date Of Birth"
              type="date"
              defaultValue="2017-05-24"
            />

            <TextField
              label="Gender"
              id="outlined-size-normal"
              defaultValue=""
            />
            <TextField
              label="Nationality"
              id="outlined-size-normal"
              defaultValue=""
            />
            <TextField
              label="Religion"
              id="outlined-size-normal"
              defaultValue=""
            />
            <TextField
              label="Address"
              id="outlined-size-normal"
              defaultValue=""
            />
            <TextField
              label="Mentor"
              id="outlined-size-normal"
              defaultValue=""
            />
          </div>
        </Box>
      </div>
    </>
  );
};

export default UserProfile;
