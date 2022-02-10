import {useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

export const TwitterPanel = () => {

    const [tweet, setTweet] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState(false);

    function urlify(text: string) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function(url) {
          return '';
        })
      }

    useEffect(() => {       
        fetch("https://api.onlyfands.net/posts", {method: 'GET', mode: 'cors'})
            .then(response => response.json())
            .then(result => {
                setTweet(result.data);
                setIsLoaded(true);
            },
            (error) => {
                setIsLoaded(true);
              }, )

    }, []);

    if(isLoaded) {
      return (
        <Grid 
            container
            alignItems="center"
            justifyContent="center"
            sx={{pt:3}}
          >
            <Card sx={{ border: '1px solid #3A4650', position: 'relative',  width:398, backgroundColor:'#15202B' }}>
              <CardContent>
              <Typography sx={{ fontSize: 14, color:'white' }} gutterBottom>
                {tweet[0].text}
              </Typography>
              </CardContent>
            </Card>
          </Grid>
      )
    } else {
      return <></>
    }
  
    
}