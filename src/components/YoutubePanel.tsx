import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Card, CardMedia, Grid, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export const YoutubePanel = () => {
    const [videoInfo, setVideoInfo] = useState<any>({});
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch('https://api.onlyfands.net/info', {
            method: 'GET',
            mode: 'cors',
        })
            .then((response) => response.json())
            .then(
                (result) => {
                    setVideoInfo(result.Data[0]);
                    setLoaded(true);
                },
                () => setLoaded(true)
            );
    }, []);

    const getDecodedTitle = () =>
        videoInfo.vidTitle.replace(/&#(\d+);/g, (match: any, dec: number) => String.fromCharCode(dec));

    if (!isLoaded) {
        return (
            <Grid container alignItems="center" justifyContent="center">
                <Card
                    sx={{
                        borderRadius: 10,
                        border: '4px solid #3A4650',
                        position: 'relative',
                        height: 210,
                        width: 398,
                    }}
                ></Card>
            </Grid>
        );
    }

    return (
        <Grid container alignItems="center" justifyContent="center">
            <Link
                href={`https://youtube.com/watch?v=${videoInfo.vidId}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Card
                    sx={{
                        borderRadius: 10,
                        border: '4px solid #3A4650',
                        position: 'relative',
                        height: 210,
                        width: 398,
                    }}
                >
                    <CardMedia
                        component="img"
                        image={videoInfo.vidArt.url}
                        sx={{ overflow: 'hidden', maxHeight: 360 }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            color: 'white',
                            background: 'rgb(0,0,0,0.7)',
                            width: '100%',
                        }}
                    >
                        <Typography
                            sx={{
                                position: 'relative',
                                top: 0,
                                left: '25px',
                                width: '90%',
                                fontSize: '14px',
                            }}
                        >
                            {getDecodedTitle()}
                        </Typography>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            color: 'rgb(196, 48, 43, 1)',
                            transform: 'translate(-50%, -50%)',
                            WebkitTransform: 'translate(-50%, -50%)',
                        }}
                    >
                        <FontAwesomeIcon icon={faYoutube} size="5x" />
                    </div>
                </Card>
            </Link>
        </Grid>
    );
};
