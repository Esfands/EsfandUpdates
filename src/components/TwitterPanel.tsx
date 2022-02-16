import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { Box, Card, CardContent, Grid, Link, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

export const TwitterPanel = () => {
    const [tweet, setTweet] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState(false);

    function urlify(text: string) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, (url) => '<a style="color:#970e0f" href="' + url + '">' + url + '</a>');
    }

    useEffect(() => {
        fetch('https://api.onlyfands.net/posts', {
            method: 'GET',
            mode: 'cors',
        })
            .then((response) => response.json())
            .then(
                (result) => {
                    setTweet(result.data);
                    setIsLoaded(true);
                },
                (error) => setIsLoaded(true)
            );
    }, []);

    if (!isLoaded) {
        return <></>;
    }

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
                                __html: DOMPurify.sanitize(urlify(tweet[0].text)),
                            }}
                        ></div>
                    </Typography>
                    <Box>
                        <Link href={tweet[0].url} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faExternalLinkAlt} style={{ float: 'right' }} />
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};
