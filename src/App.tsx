import { TitleBar } from './components/TitleBar';
import { StreamPanel } from './components/StreamPanel';
import { BottomBar } from './components/BottomBar';
import { useEffect, useState } from 'react';
import { NavTab } from './components/NavTab';
import { YoutubePanel } from './components/YoutubePanel';
import { TwitterPanel } from './components/TwitterPanel';

function App() {
    const buildImageUrl = (url: string, width: string, height: string) =>
        url.replace('{width}', width).replace('{height}', height);

    const [scheduleFlag, setScheduleFlag] = useState<boolean>(false);

    useEffect(() => {
        fetch('https://flags.otkdata.com/api/flags/scheduleflag', {
            method: 'GET',
            mode: 'cors',
        })
            .then((response) => response.json())
            .then(
                (result) => {
                    const flagValue = result.data[0].enabled;
                    setScheduleFlag(flagValue);
                },
                (error) => {
                    console.log('There was an error loading the schedule flag');
                    setScheduleFlag(false);
                }
            );

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

    if (scheduleFlag) {
        return (
            <div>
                <TitleBar />
                <StreamPanel />
                <NavTab />
                <BottomBar />
            </div>
        );
    } else {
        return (
            <div>
                <TitleBar />
                <StreamPanel />
                <YoutubePanel />
                <TwitterPanel />
                <BottomBar />
            </div>
        );
    }
}

export default App;
