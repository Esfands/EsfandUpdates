import { Box, Avatar, Grid, ListItemAvatar, ListItemText, ListItem, Button, Typography, styled } from '@mui/material';
import React, { useState, useEffect } from 'react';

const StyledButton = styled(Button)(({ theme }) => ({
    height:28, 
    width:115,
    p:1,
    backgroundColor:'rgb(100, 65, 165)',
    '&:hover': {
        backgroundColor: 'rgb(91 60 149)'
    },
}));

export const StreamPanel = () => {
    const [streamInfo, setStreamInfo] = useState<any>({});
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {       
        fetch("https://api.onlyfands.net/stream", {method: 'GET', mode: 'cors'})
            .then(response => response.json())
            .then(result => {
                setStreamInfo(result.data);
                setLoaded(true);
            },
            (error) => {
                setLoaded(true);
              }, )

    }, []);

    function getBorderColor() {
        if (streamInfo.status === 'offline') {
            return '#970e0f';
        }
        return '#6441A5';
    }
    function getStatusText() {
        if (streamInfo.status === 'offline') {
            return 'OFFLINE';
        }
        return 'LIVE';
    }

    function getButtonText() {
        if (streamInfo.status === 'offline') {
            return 'Watch VODS';
        }
        return 'Watch Live';
    }

    function getButtonUrl() {
        if (streamInfo.status === 'offline') {
            return 'https://www.twitch.tv/esfandtv/videos?filter=archives&sort=time';
        }
        return 'https://www.twitch.tv/esfandtv/';
    }

    function getGameTitle() {
        if (streamInfo != null || streamInfo !== undefined)
            return streamInfo.category.substring(0,20);
        return '';
    }

    function getStreamTitle() {
        if (streamInfo != null || streamInfo !== undefined) {
            if (streamInfo.title.length > 68) {
                return `${streamInfo.title.substring(0,68)}...`;
            }
            return streamInfo.title
        }       
        return '';
    }

    if (isLoaded){
        return (
            <Grid container
            width={'100%'}
            spacing={0}>
                <Grid item xs={8}>
                  <Box
                      component={'ul'}
                      display={'flex'}
                      sx={{marginLeft:'14px', p: 0}}
                      width={'100%'}
                  >
                      <Box component={ListItem} disableGutters width={'auto'} sx={{p: 0}}>
                          <ListItemAvatar sx={{}}>
                              <Avatar
                              src={'/images/esfand_icon128.png'}
                              sx={{ width: 56, height: 56, border:`2px solid ${getBorderColor()}`}}
                              />
                          </ListItemAvatar>
                          <ListItemText
                              sx={{ml:'15px'}}
                              primary={
                                  <React.Fragment>
                                      <Typography
                                        sx={{pb:0, mb:0}}
                                        variant="body1"
                                        alignItems="center"
                                        alignContent="center"
                                      >
                                        {getStatusText()}
                                      </Typography>
                                      <Typography
                                        sx={{ color: '#636E77', p:0, fontSize:13}}
                                        variant="body2"
                                      >
                                        {getGameTitle()} 
                                      </Typography>
                                  </React.Fragment>
                              }
                              secondary={getStreamTitle()}
                              secondaryTypographyProps={{sx:{fontSize:'12px', lineHeight: 1, color: "white"}}}
                          />
                      </Box>
                  </Box>
                </Grid>
                <Grid
                  container 
                  item 
                  xs={4}
                  direction="column"
                  justifyContent="center"
                  alignItems="center">
                  <StyledButton variant="contained" href={getButtonUrl()} size="small" sx={{height:28, width:115, backgroundColor:"rgb(100, 65, 165)", p:1}}>{getButtonText()}</StyledButton>
                </Grid>
            </Grid>  
        )
    } else {
        return (
            <></>
        )
    }
      
}