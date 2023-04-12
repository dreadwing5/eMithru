import { capitalCase } from "change-case";
// @mui
import { Container, Tab, Box, Tabs } from "@mui/material";
// routes

// hooks
import useTabs from "../../hooks/useTabs";
// _mock_
import {
  _userPayment,
  _userAddressBook,
  _userInvoices,
  _userAbout,
} from "../../_mock";
// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
// sections
import { AccountGeneral } from "../../sections/@dashboard/user/account";
import PrevAcademic from "../../sections/@dashboard/user/account/PrevAcademic";
import AdmissionDetails from "../../sections/@dashboard/user/account/AdmissionDetails";

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { currentTab, onChangeTab } = useTabs("general");

  const ACCOUNT_TABS = [
    {
      value: "general",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <AccountGeneral />,
    },
  
  
    {
      value: "previous academic result",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <PrevAcademic/>,
    },
    {
      value: "Admission Details",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <AdmissionDetails/>,
    }
  ];
 

  return (
    <Page title="User: Account Settings">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Account"
          links={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "User", href: "/user" },
            { name: "Account Settings" },
          ]}
        />

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
