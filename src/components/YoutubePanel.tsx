import { Card, CardMedia, Grid} from "@mui/material";
import { useEffect, useState } from "react";

export const YoutubePanel = () => {

    const [videoInfo, setVideoInfo] = useState<any>({});
    const [isLoaded, setLoaded] = useState(false);
    
    useEffect(() => {
      fetch("https://api.onlyfands.net/videos", {method: 'GET', mode: 'cors'})
            .then(response => response.json())
            .then(result => {
                setVideoInfo(result.data);
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
                image={videoInfo.items[0].snippet.thumbnails.medium.url}
                sx={{overflow:"hidden", maxHeight:360}}
              />
              <div style={{position: 'absolute', bottom:'0', color:'white', background: 'rgb(0,0,0,0.3)'}}>
                <div style={{position:'relative',  top:'0', left:'25px'}}>{videoInfo.items[0].snippet.title}</div>
              </div>
            </Card>
          </Grid>
        
      )
    } else {
      return (
        <Grid 
          container
          alignItems="center"
          justifyContent="center"
        >
          <Card sx={{borderRadius: 10, border: '4px solid #3A4650', position: 'relative', height:210, width:398 }}>
          </Card>
        </Grid>
      )
    }
    
};