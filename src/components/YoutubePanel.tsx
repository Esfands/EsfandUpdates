import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const YoutubePanel = () => {

    const [videoInfo, setVideoInfo] = useState<any>({});
    const [isLoaded, setLoaded] = useState(false);
    
    useEffect(() => {
      fetch("https://api.onlyfands.net/info", {method: 'GET', mode: 'cors'})
            .then(response => response.json())
            .then(result => {
                setVideoInfo(result.Data);
                setLoaded(true);
            },
            (error) => {
                setLoaded(true);
              }, )

    },[]);

    if (isLoaded) {
      return (
          <Grid 
            container
            alignItems="center"
            justifyContent="center"
          >
            <Card sx={{borderRadius: 10, border: '4px solid #3A4650', position: 'relative', height:210, width:398 }}>
              <CardMedia
                component="img"
                image="https://i.ytimg.com/vi/S22FB_hFCJA/mqdefault.jpg"
                sx={{overflow:"hidden", maxHeight:360}}
              />
              <div style={{position: 'absolute', bottom:'0', color:'white', background: 'rgb(0,0,0,0.3)'}}>
                <div style={{position:'relative',  top:'0', left:'25px'}}>{videoInfo[0].vidTitle}</div>
              </div>
            </Card>
          </Grid>
        
      )
    } else {
      return (
        <></>
      )
    }
    
};