import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const UserDetails = () => {
  return (
    <>
      <div>
        <h1>User Details</h1>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { mt: 5, ml: 15, mr: 5, width: "50ch" },
            "& .MuiFormControl-root": { mt: 5, ml: 15, mr: 5, width: "50ch" },
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
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //value={15}
                label="Department"
                // onChange={handleChange}
              >
                <MenuItem value={"CSE"}>CSE</MenuItem>
                <MenuItem value={"ISE"}>ISE</MenuItem>
                <MenuItem value={"ECE"}>ECE</MenuItem>
                <MenuItem value={"AI/ML"}>AI/ML</MenuItem>
                <MenuItem value={"EEE"}>EEE</MenuItem>
                <MenuItem value={"CIVIL"}>CIVIL</MenuItem>
                <MenuItem value={"MECH"}>MECH</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              id="date"
              label="Date Of Birth"
              type="date"
              defaultValue="2017-05-24"
            />

            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //value={15}
                label="Gender"
                // onChange={handleChange}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
              </Select>
            </FormControl>

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
