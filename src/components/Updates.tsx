
import { TwitterPanel } from "./TwitterPanel"
import { YoutubePanel } from "./YoutubePanel"

export const Updates = () => {
    return (
        <><div className="container">
            <h3 className="text-center pb-1 pt-2">EsfandTV Updates</h3>
            <TwitterPanel />
            <YoutubePanel />
        </div></>
    )
}