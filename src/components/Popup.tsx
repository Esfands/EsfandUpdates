import { StreamPanel } from './StreamPanel';
import { TwitterPanel } from './TwitterPanel';

export const Popup = () => {
    
    return (
        <>
            <div className="container">
                <h3 className="text-center pb-1 pt-2">EsfandTV Updates</h3>
                <StreamPanel />
                <TwitterPanel />
        </div>
    </>
    )
}