
import { TitleBar } from './components/TitleBar';
import { StreamPanel } from './components/StreamPanel';
import { YoutubePanel } from './components/YoutubePanel';
import { TwitterPanel } from './components/TwitterPanel';
import { BottomBar } from './components/BottomBar';
import { useEffect } from 'react';



function App() {

  function buildImageUrl(url: string, width: string, height: string) {
    return url.replace('{width}', width).replace('{height}', height);
  }

  useEffect(() => {
    fetch("https://api.onlyfands.net/stream", {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(result => {
        const body = document.querySelector('body');
        if (body != null) {
          body.style.backgroundImage = `url(${buildImageUrl(result.data.boxArt, '410', '500')}`;
        }  
      });
  },[]);

    return (
      <div>
        <TitleBar />
        <StreamPanel />
        <YoutubePanel />
        <TwitterPanel />
        <BottomBar />
      </div>
    )
}

export default App;
