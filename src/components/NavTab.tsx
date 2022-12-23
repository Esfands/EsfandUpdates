import React, { useState, useEffect } from 'react';
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import { YoutubePanel } from './YoutubePanel';
import { TwitterPanel } from './TwitterPanel';
import { Schedule } from './Schedule';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0.5 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const NavTab = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid container alignItems="center" justifyContent="center" sx={{}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    aria-label="basic tabs example"
                    sx={{ color: 'white' }}
                >
                    <Tab sx={{ color: 'white' }} label="Home" {...a11yProps(0)} />
                    <Tab sx={{ color: 'white' }} label="Schedule" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <YoutubePanel />
                <TwitterPanel />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Schedule />
            </TabPanel>
        </Grid>
    );
};