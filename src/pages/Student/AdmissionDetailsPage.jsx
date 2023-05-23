import React from "react";
import { useState } from "react";
import { Container, Tab, Box, Tabs } from "@mui/material";
import useTabs from "../../hooks/useTabs";
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";

import AdmissionDetails from "./AdmissionDetails";

export default function AdmissionDetailsPage() {
  const { currentTab, onChangeTab } = useTabs("Admission Details");
  const ACCOUNT_TABS = [
    {
      value: "Admission Details",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <AdmissionDetails />,
    },
  ];

  return (
    <div>
      <Page title="Stduent Profile">
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
  );
}
