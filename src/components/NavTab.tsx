import React, { useState, useEffect } from 'react';
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import { YoutubePanel } from './YoutubePanel';
import { TwitterPanel } from './TwitterPanel';
import { Schedule } from './Schedule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHouse } from '@fortawesome/free-solid-svg-icons';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

type TwitterFlagProps = {
    twitterFlag: boolean;
};

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{ width: '85%' }}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0.5, width: '100%' }}>
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

export const NavTab = ({ twitterFlag }: TwitterFlagProps) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid container alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} width={'100%'}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    aria-label="Home and Schedule tabs"
                    sx={{
                        color: 'grey',
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'rgb(100, 65, 165)',
                        },
                        '& .MuiTab-root.Mui-selected': {
                            color: 'white',
                        },
                    }}
                >
                    <Tab
                        sx={{
                            color: 'grey',
                            paddingTop: '0',
                        }}
                        icon={<FontAwesomeIcon icon={faHouse} />}
                        label="Home"
                        {...a11yProps(0)}
                    />
                    <Tab
                        sx={{
                            color: 'grey',
                            paddingTop: '0',
                        }}
                        icon={<FontAwesomeIcon icon={faCalendar} />}
                        label="Schedule"
                        {...a11yProps(1)}
                    />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <YoutubePanel />
                {twitterFlag ? <TwitterPanel /> : null}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Schedule />
            </TabPanel>
        </Grid>
    );
};
