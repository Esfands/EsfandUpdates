import React, { useState, useEffect } from 'react';
import {
    Box,
    Avatar,
    Grid,
    ListItemAvatar,
    ListItemText,
    ListItem,
    Button,
    Typography,
    styled,
    Link,
} from '@mui/material';

const StyledButton = styled(Button)(({ theme }) => ({
    height: 28,
    width: 115,
    p: 1,
    backgroundColor: 'rgb(100, 65, 165)',
    '&:hover': {
        backgroundColor: 'rgb(91 60 149)',
        color: 'white',
    },
}));

export const StreamPanel = () => {
    const [streamInfo, setStreamInfo] = useState<any>({});
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch('https://api.onlyfands.net/stream', {
            method: 'GET',
            mode: 'cors',
        })
            .then((response) => response.json())
            .then(
                (result) => {
                    setStreamInfo(result.data);
                    setLoaded(true);
                },
                (error) => {
                    setLoaded(true);
                }
            );
    }, []);

    function getBorderColor() {
        return streamInfo.status === 'offline' ? '#970e0f' : '#6441A5';
    }

    function getStatusText() {
        return streamInfo.status === 'offline' ? 'OFFLINE' : 'LIVE';
    }

    function getButtonText() {
        return streamInfo.status === 'offline' ? 'Watch VODS' : 'Watch Live';
    }

    function getButtonUrl() {
        return streamInfo.status === 'offline'
            ? 'https://www.twitch.tv/esfandtv/videos?filter=archives&sort=time'
            : 'https://www.twitch.tv/esfandtv/';
    }

    function getGameTitle() {
        return streamInfo != null || streamInfo !== undefined ? streamInfo.category.substring(0, 20) : '';
    }

    function getStreamTitle() {
        if (streamInfo != null || streamInfo !== undefined) {
            return streamInfo.title.length > 68 ? `${streamInfo.title.substring(0, 68)}...` : streamInfo.title;
        }
        return '';
    }

    if (!isLoaded) {
        return <></>;
    }

    return (
        <Grid container width={'100%'} spacing={0}>
            <Grid item xs={8}>
                <Box component={'ul'} display={'flex'} sx={{ marginLeft: '14px', p: 0 }} width={'100%'}>
                    <Box component={ListItem} disableGutters width={'auto'} sx={{ p: 0 }}>
                        <ListItemAvatar sx={{}}>
                            <Avatar
                                src={'/images/esfand_icon128.png'}
                                sx={{
                                    width: 56,
                                    height: 56,
                                    border: `2px solid ${getBorderColor()}`,
                                }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            sx={{ ml: '15px' }}
                            primary={
                                <React.Fragment>
                                    <Typography
                                        sx={{
                                            pb: 0,
                                            mb: 0,
                                            fontWeight: 'bolder',
                                        }}
                                        variant="body2"
                                        alignItems="center"
                                        alignContent="center"
                                    >
                                        {getStatusText()}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'rgb(133, 146, 157)',
                                            p: 0,
                                            fontSize: 14,
                                            fontWeight: 'bolder',
                                        }}
                                        variant="body2"
                                    >
                                        {getGameTitle()}
                                    </Typography>
                                </React.Fragment>
                            }
                            secondary={getStreamTitle()}
                            secondaryTypographyProps={{
                                sx: {
                                    fontSize: '12px',
                                    lineHeight: 1,
                                    color: 'white',
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Grid>
            <Grid container item xs={4} direction="column" justifyContent="center" alignItems="center">
                <Link href="https://twitch.tv/esfandtv" target="_blank" rel="noopener noreferrer" underline="none">
                    <StyledButton
                        variant="contained"
                        size="small"
                        sx={{
                            height: 28,
                            width: 115,
                            backgroundColor: 'rgb(100, 65, 165)',
                            p: 1,
                        }}
                    >
                        {getButtonText()}
                    </StyledButton>
                </Link>
            </Grid>
        </Grid>
    );
};
