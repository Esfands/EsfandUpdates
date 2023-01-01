import { useState, useEffect } from 'react';
import { ScheduleEvent } from './ScheduleEvent';
import { Grid, Stack, Box, Skeleton, Typography } from '@mui/material';

type ScheduleSegment = {
    startTime: string;
    title: string;
    categoryId: string;
};

type Category = {
    id: string;
};

export const Schedule = () => {
    const [schedule, setSchedule] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setError] = useState(false);
    const errorMessage = 'There was an error loading the schedule. Please try again later.';
    const emptyMessage = 'There are currently no events in the schedule. Please check again later.';

    function buildScheduleWithCategories(): Map<string, ScheduleSegment[]> {
        const updatedSegments = new Map<string, ScheduleSegment[]>();

        schedule.forEach((element: { category: Category; start_time: string | Date; title: string }) => {
            const localDateTime = new Date(element.start_time);
            const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(localDateTime);
            const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(localDateTime);
            const numericDay = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(localDateTime);
            const dateString = `${day}, ${month} ${numericDay}`;
            const data = {
                startTime: localDateTime.toLocaleString('en-US'),
                title: element.title,
                categoryId: element.category.id,
            };
            if (updatedSegments.has(dateString)) {
                updatedSegments.get(dateString)?.push(data);
            } else {
                updatedSegments.set(dateString, [data]);
            }
        });

        return updatedSegments;
    }

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await fetch('https://twitch.otkdata.com/api/streamers/esfandtv/schedule', {
                    method: 'GET',
                    mode: 'cors',
                });

                if (!isLoaded) {
                    const jsonResponse = await response.json();
                    setSchedule(jsonResponse.data.segments);
                }
                setIsLoaded(true);
            } catch {
                setError(true);
            }
        };

        fetchSchedule();
    }, []);

    if (!isLoaded && !isError) {
        return (
            <Grid container alignItems="center" justifyContent="center">
                <Box
                    sx={{
                        width: '100%',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        scrollbarWidth: 'thin',
                        '&::-webkit-scrollbar': {
                            width: '0.4em',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#888',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#555',
                        },
                    }}
                >
                    <Stack spacing={1} direction="column" justifyContent="space-evenly" alignItems="stretch">
                        <Skeleton
                            variant="rectangular"
                            width={500}
                            height={100}
                            sx={{ backgroundColor: '#15202B' }}
                        />
                        <Skeleton
                            variant="rectangular"
                            width={500}
                            height={100}
                            sx={{ backgroundColor: '#15202B' }}
                        />
                        <Skeleton
                            variant="rectangular"
                            width={500}
                            height={100}
                            sx={{ backgroundColor: '#15202B' }}
                        />
                    </Stack>
                </Box>
            </Grid>
        );
    } else if (isLoaded) {
        if (schedule === null) {
            return (
                <Grid container alignItems="center" justifyContent="center">
                    <p>{emptyMessage}</p>
                </Grid>
            );
        }

        const scheduleData: JSX.Element[] = [];
        let j = 0;
        buildScheduleWithCategories().forEach((segmentData, dateKey) => {
            scheduleData.push(
                <Typography
                    sx={{
                        display: 'inline',
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                    component="span"
                    variant="body2"
                    key={dateKey}
                >
                    {dateKey}
                </Typography>
            );
            segmentData.forEach((segment) => {
                scheduleData.push(<ScheduleEvent segment={segment} key={j} />);
                j++;
            });
        });

        return (
            <Grid container alignItems="center" justifyContent="center" width={'100%'}>
                <Box
                    sx={{
                        width: '100%',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        scrollbarWidth: 'thin',
                        '&::-webkit-scrollbar': {
                            width: '0.4em',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#888',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#555',
                        },
                    }}
                >
                    <Stack spacing={1} direction="column" justifyContent="space-evenly" alignItems="stretch">
                        {scheduleData}
                    </Stack>
                </Box>
            </Grid>
        );
    } else {
        return (
            <Grid container alignItems="center" justifyContent="center">
                <p>{errorMessage}</p>
            </Grid>
        );
    }
};
