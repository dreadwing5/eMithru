import React from 'react'
import { Container, Tab, Box, Tabs } from "@mui/material";
import useTabs from "../../hooks/useTabs";
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
import PlacementDetails from './PlacementDetails';
import InternshipDetails from './InternshipDetails';
import HigherStudiesDetails from './HigherStudiesDetails';
export default function Placement() {

    const { currentTab, onChangeTab } = useTabs("Placement Details");
    const ACCOUNT_TABS = [
      {
        value: "Placement Details",
        icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
        component: < PlacementDetails/>,
      },
      {
        value: "Internship Details",
        icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
        component: <InternshipDetails />,
      },
      {
        value: "Higher Studies Details",
        icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
        component: < HigherStudiesDetails/>,
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
  )
}
