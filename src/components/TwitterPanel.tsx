import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { Box, Card, CardContent, Grid, Link, Skeleton, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { setMaxListeners } from 'process';

export const TwitterPanel = () => {
    const [tweet, setTweet] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setError] = useState(false);
    const errorMessage = 'There was an error loading the latest tweet. Please try again later.';

    function urlify(text: string) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(
            urlRegex,
            (url) =>
                '<a style="color:#970e0f" target="_blank" href="' +
                url +
                '" rel="noopener noreferrer">' +
                url +
                '</a>'
        );
        return text.replace(
            urlRegex,
            (url) =>
                '<a style="color:#970e0f" target="_blank" href="' +
                url +
                '" rel="noopener noreferrer">' +
                url +
                '</a>'
        );
    }

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchTwitter = async () => {
            try {
                const response = await fetch('https://cdn.otkdata.com/api/stream/esfandtv', {
                    method: 'GET',
                    mode: 'cors',
                    signal: signal,
                });

                if (!isLoaded) {
                    const jsonResponse = await response.json();
                    setTweet(jsonResponse.data[0].twitter);
                }
                setIsLoaded(true);
            } catch {
                setError(true);
            }
        };

        fetchTwitter();

        return () => {
            abortController.abort();
            setTweet({});
            setIsLoaded(false);
            setError(false);
        };
    }, []);

    if (!isLoaded && !isError) {
        return (
            <Grid container alignItems="center" justifyContent="center" sx={{ pt: 3 }}>
                <Skeleton
                    variant="rounded"
                    width={398}
                    height={100}
                    sx={{
                        border: '1px solid #3A4650',
                        position: 'relative',
                        width: 398,
                        backgroundColor: '#15202B',
                    }}
                />
            </Grid>
        );
    } else if (isLoaded) {
        return (
            <Grid container alignItems="center" justifyContent="center" sx={{ pt: 3 }}>
                <Card
                    sx={{
                        border: '1px solid #3A4650',
                        position: 'relative',
                        width: 398,
                        backgroundColor: '#15202B',
                    }}
                >
                    <CardContent>
                        <Typography
                            sx={{
                                display: 'inline',
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                            component="span"
                            variant="body2"
                        >
                            Esfand&nbsp;
                        </Typography>
                        <Typography sx={{ display: 'inline', color: '#8899A6' }} component="span" variant="body2">
                            &nbsp;@esfandtv
                        </Typography>
                        <Typography sx={{ fontSize: 14, color: 'white' }} gutterBottom>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(urlify(tweet.text)),
                                }}
                            ></div>
                        </Typography>
                        <Box>
                            <Link href={tweet.url} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faExternalLinkAlt} style={{ float: 'right' }} />
                            </Link>
                        </Box>
                    </CardContent>
                </Card>
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
