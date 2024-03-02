import { useState, useEffect } from 'react';
import { Card, CardMedia, Typography, Paper, CardContent, Box, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DOMPurify from 'dompurify';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'white',
}));

const taggableMembers: string[] = [
    '@nmplol',
    '@asmongold',
    '@sodapoppin',
    '@mizkif',
    '@emiru',
    '@extraemily',
    '@cyr',
    '@tectone',
    '@otknetwork',
    '@starforgesystems',
    '@bonnierabbit',
    '@willneff',
    '@zackrawrr',
    '@graycen',
    '@wakewilder',
];

export const ScheduleEvent = ({ segment }: any) => {
    const buildImageUrl = (url: string, width: string, height: string) =>
        url.replace('{width}', width).replace('{height}', height);

    //prettier-ignore
    function addTwitchTag(title: string) {
        taggableMembers.forEach((member) => {
            title = title.replace(member,
                `<a href="https://twitch.tv/${member.substring(1)}" target="_blank rel="noopener noreferrer">${member}</a>`
            );
        });

        return title;
    }

    const [isLoaded, setIsLoaded] = useState(false);
    const [boxArtUrl, setBoxArtUrl] = useState('');

    useEffect(() => {
        fetch(`https://twitch.otkdata.com/api/games/${segment.categoryId}`, {
            method: 'GET',
            mode: 'cors',
        })
            .then((response) => response.json())
            .then(
                (result) => {
                    setBoxArtUrl(buildImageUrl(result.data[0].box_art_url, '85', '113'));
                    setIsLoaded(true);
                },
                (error) => {
                    setBoxArtUrl('https://static-cdn.jtvnw.net/ttv-static/404_boxart.jpg');
                }
            );
    }, []);

    if (!isLoaded) {
        return <Skeleton variant="rectangular" width={210} height={60} />;
    } else {
        return (
            <Card
                sx={{ display: 'flex', backgroundColor: '#15202B', color: 'white', border: '1px solid #3A4650' }}
            >
                <CardMedia component="img" sx={{ width: 85 }} image={boxArtUrl} alt="Category box art" />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="body2" sx={{ fontWeight: 'bold' }}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(addTwitchTag(segment.title), {
                                        ADD_ATTR: ['target'],
                                    }),
                                }}
                            ></div>
                        </Typography>
                        <Typography variant="subtitle2" color="white" component="div">
                            {segment.startTime}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        );
    }
};
