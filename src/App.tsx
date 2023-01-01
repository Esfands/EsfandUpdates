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
        const flagController = new AbortController();
        const flagSignal = flagController.signal;

        const streamController = new AbortController();
        const streamSignal = streamController.signal;

        const fetchScheduleFlag = async () => {
            try {
                const response = await fetch('https://flags.otkdata.com/api/flags/scheduleflag', {
                    method: 'GET',
                    mode: 'cors',
                    signal: flagSignal,
                });

                const jsonResponse = await response.json();
                const flagValue = jsonResponse.data[0].enabled;
                setScheduleFlag(false);
            } catch {
                console.log('Error occured while checking schedule feature flag.');
            }
        };

        const fetchStreamData = async () => {
            try {
                const response = await fetch('https://cdn.otkdata.com/api/stream/esfandtv', {
                    method: 'GET',
                    mode: 'cors',
                    signal: streamSignal,
                });

                const jsonResponse = await response.json();
                const boxArt = jsonResponse.data[0].twitch.boxArt;
                const body = document.querySelector('body');
                if (body != null) {
                    body.style.background = `linear-gradient(0deg, rgba(16,19,22,1) 0%, rgba(39,38,44,0) 100%), url(${buildImageUrl(
                        boxArt,
                        '500',
                        '410'
                    )}`;
                }
            } catch {
                console.log('Error occured while retrieving background image for box art.');
            }
        };

        fetchScheduleFlag();
        fetchStreamData();

        return () => {
            flagController.abort();
            streamController.abort();
            setScheduleFlag(false);
        };
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
