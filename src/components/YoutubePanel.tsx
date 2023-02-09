import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Card, CardMedia, Grid, Link, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export const YoutubePanel = () => {
    const [videoInfo, setVideoInfo] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setError] = useState(false);
    const errorMessage = 'There was an error loading the latest video. Please try again later.';

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchYoutube = async () => {
            try {
                const response = await fetch('https://cdn.otkdata.com/api/videos/esfandtv?count=1', {
                    method: 'GET',
                    mode: 'cors',
                    signal: signal,
                });

                if (!isLoaded) {
                    const jsonResponse = await response.json();
                    setVideoInfo(jsonResponse.data[0].videoData.items[0].snippet);
                }
                setIsLoaded(true);
            } catch {
                setError(true);
            }
        };

        fetchYoutube();

        return () => {
            abortController.abort();
            setVideoInfo({});
            setIsLoaded(false);
            setError(false);
        };
    }, []);

    const getDecodedTitle = () =>
        videoInfo.title.replace(/&#(\d+);/g, (match: any, dec: number) => String.fromCharCode(dec));

    if (!isLoaded && !isError) {
        return (
            <Grid container alignItems="center" justifyContent="center">
                <Skeleton
                    variant="rounded"
                    sx={{
                        border: '4px solid #3A4650',
                        borderRadius: 10,
                        position: 'relative',
                        width: 398,
                        height: 210,
                        backgroundColor: '#15202B',
                    }}
                />
            </Grid>
        );
    } else if (isLoaded) {
        return (
            <Grid container alignItems="center" justifyContent="center">
                <Link
                    href={`https://youtube.com/watch?v=${videoInfo.resourceId.videoId}`}
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
                            image={videoInfo.thumbnails.medium.url}
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
    } else {
        return (
            <Grid container alignItems="center" justifyContent="center">
                <p>{errorMessage}</p>
            </Grid>
        );
    }

    if (!isLoaded) {
    }
};
