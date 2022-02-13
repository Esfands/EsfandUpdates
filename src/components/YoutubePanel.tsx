import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Card, CardMedia, Grid, Link} from "@mui/material";
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

    function getDecodedTitle() {
      return videoInfo.items[0].snippet.title.replace(/&#(\d+);/g, (match: any, dec: number) => {
        return String.fromCharCode(dec);
    });
  }

    if (isLoaded) {
      return (
          <Grid 
            container
            alignItems="center"
            justifyContent="center"
          >
          <Link href={`https://youtube.com/watch?v=${videoInfo.items[0].id.videoId}`} target="_blank" rel="noopener noreferrer">
              <Card sx={{borderRadius: 10, border: '4px solid #3A4650', position: 'relative', height:210, width:398 }}>
                <CardMedia
                  component="img"
                  image={videoInfo.items[0].snippet.thumbnails.medium.url}
                  sx={{overflow:"hidden", maxHeight:360}}
                />
                <div style={{position: 'absolute', bottom:'0', color:'white', background: 'rgb(0,0,0,0.7)', width:'100%'}}>
                  <div style={{position:'relative',  top:'0', left:'25px'}}>{getDecodedTitle()}</div>
                </div>
                <div style={{position: 'absolute', left:'50%', top:'50%', color:'rgb(196, 48, 43, 1)', transform: 'translate(-50%, -50%)', WebkitTransform: 'translate(-50%, -50%)'}}>
                  <FontAwesomeIcon icon={faYoutube} size="5x" />
                </div>
              </Card>
            </Link>
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