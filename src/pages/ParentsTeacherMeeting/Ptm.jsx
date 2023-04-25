import { Container, Tab, Box, Tabs } from "@mui/material";
import useTabs from "../../hooks/useTabs";
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import React from "react";
import Counselling from "./Counselling";
import ParentTeacherMeet from "./ParentTeacherMeet";

export default function Ptm() {
    const { currentTab, onChangeTab } = useTabs("Counselling Record");
    const ACCOUNT_TABS = [
      {
        value: "Counselling Record",
        icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
        component: <Counselling />,
      },
      {
        value: "Parent-Teachers Meet Record",
        icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
        component: <ParentTeacherMeet />,
      },
     
    ];
  return (
    <div>
       <Page title="PTM">
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
              label={tab.value}
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
    </div>
  )
}
