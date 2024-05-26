// AdminDashboard.jsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  styled,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  PeopleAlt as PeopleAltIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Root = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const CardContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const CustomCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const CardIcon = styled(Box)(({ theme }) => ({
  fontSize: "4rem",
  marginBottom: theme.spacing(2),
}));

const AdminDashboard = () => {
  return (
    <Root>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <CardContainer container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CustomCard component={Link} to="/admin/add-user">
            <CardActionArea>
              <CardContent>
                <CardIcon>
                  <PersonAddIcon color="primary" />
                </CardIcon>
                <Typography variant="h6">Add New User</Typography>
              </CardContent>
            </CardActionArea>
          </CustomCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomCard component={Link} to="/admin/users">
            <CardActionArea>
              <CardContent>
                <CardIcon>
                  <PeopleAltIcon color="primary" />
                </CardIcon>
                <Typography variant="h6">View All Users</Typography>
              </CardContent>
            </CardActionArea>
          </CustomCard>
        </Grid>
      </CardContainer>
    </Root>
  );
};

export default AdminDashboard;
