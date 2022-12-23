import { TitleBar } from './components/TitleBar';
import { StreamPanel } from './components/StreamPanel';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from './themes/theme';
import { Schedule } from './components/Schedule';
import { BottomBar } from './components/BottomBar';
import { useState, useEffect } from 'react';
import { NavTab } from './components/NavTab';

function App() {
    const buildImageUrl = (url: string, width: string, height: string) =>
        url.replace('{width}', width).replace('{height}', height);

    const [isOnSchedule, setOnSchedule] = useState(false);

    useEffect(() => {
        fetch('https://cdn.otkdata.com/api/stream/esfandtv', {
            method: 'GET',
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((result) => {
                const body = document.querySelector('body');
                if (body != null) {
                    body.style.background = `linear-gradient(0deg, rgba(16,19,22,1) 0%, rgba(39,38,44,0) 100%), url(${buildImageUrl(
                        result.data[0].twitch.boxArt,
                        '500',
                        '410'
                    )}`;
                }
            });
    }, []);

    if (!isOnSchedule) {
        return (
            <ThemeProvider theme={appTheme}>
                <CssBaseline enableColorScheme />
                <div>
                    <TitleBar />
                    <StreamPanel />
                    <NavTab />
                    <BottomBar />
                </div>
            </ThemeProvider>
        );
    } else {
        return (
            <div>
                <TitleBar />
                <StreamPanel />
                <Schedule />
                <BottomBar />
            </div>
        );
    }
}

export default App;
