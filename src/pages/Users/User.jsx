import { capitalCase } from "change-case";
// @mui
import { Container, Tab, Box, Tabs } from "@mui/material";
// routes

// hooks
import useTabs from "../../hooks/useTabs";

// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
// sections

import UserForm from "./UserForm";
import UserList from "./UserList";

// ----------------------------------------------------------------------

export default function User() {
  const { currentTab, onChangeTab } = useTabs("Create User");

  const ACCOUNT_TABS = [
    {
      value: "Create User",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <UserForm />,
    },
    {
      value: "User List",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <UserList />,
    },
  ];

  return (
    <Page title="User: Account Settings">
      <Container maxWidth="lg">
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
