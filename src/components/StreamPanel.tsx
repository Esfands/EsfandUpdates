import { Box, Avatar, Grid, Paper, ListItemAvatar, ListItemText, ListItem, Button } from '@mui/material';
import { borderColor } from '@mui/system';
import { useState, useEffect } from 'react';

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

    
    function buildImageUrl(width: string, height: string) {
        if (streamInfo === undefined) {
            return 'https://static-cdn.jtvnw.net/ttv-static/404_boxart.jpg';
        }
        return streamInfo.boxArt.replace('{width}', width).replace('{height}', height);
      }


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
                            sx={{ width: 56, height: 56, border:'2px solid #6441A5'}}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            sx={{ml:'15px'}}
                            primary={`${streamInfo.status} ${streamInfo.category}`}
                            primaryTypographyProps={{sx:{}}}
                            secondary={streamInfo.title}
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
                <Button variant="contained" size="small" sx={{height:28, width:115, backgroundColor:"rgb(100, 65, 165)", p:1}}>Watch Live</Button>
              </Grid>
          </Grid>  
      )
}