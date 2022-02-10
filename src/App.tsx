
import { TitleBar } from './components/TitleBar';
import { StreamPanel } from './components/StreamPanel';
import { YoutubePanel } from './components/YoutubePanel';
import { TwitterPanel } from './components/TwitterPanel';
import { BottomBar } from './components/BottomBar';

function App() {
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

export default App;
