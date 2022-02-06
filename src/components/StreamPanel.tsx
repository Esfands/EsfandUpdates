import { useState, useEffect } from 'react';

export const StreamPanel = () => {
    const [streamInfo, setStreamInfo] = useState<any>({});
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {       
        fetch("https://api.onlyfands.net/stream", {method: 'GET', mode: 'cors'})
            .then(response => response.json())
            .then(result => {
                setStreamInfo(result.data);
                setLoaded(true);
            },
            (error) => {
                setLoaded(true);
              }, )

    }, []);

    
    function buildImageUrl(width: string, height: string) {
        if (streamInfo === undefined) {
            return 'https://static-cdn.jtvnw.net/ttv-static/404_boxart.jpg';
        }
        return streamInfo.boxArt.replace('{width}', width).replace('{height}', height);
      }

      if (!isLoaded) {
        const largeSpinner = {
            width: `3rem`,
            height: `3rem`,
        };

        return (
            <div className="text-center">
                <br/>
                <div className="spinner-border" style={largeSpinner} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
      } else { //realistically doesnt need a status check, just do it earlier after state is set and make some constants to be used
          if (streamInfo.status === 'online') {    //need to call /stream endpoint or read from chrome storage
            return (
                <div className="col-md-6 col-sm-12">
                    <div id="liveSection">
                        <div className="panel row g-0 rounded mb-2 overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <h3 id="statusText" className="mb-0">LIVE</h3>
                                <p id="streamTitle" className="card-text mb-auto">{streamInfo.title}</p>
                                <a id="watchButton" className="btn" style={{backgroundColor: "#6441a5", color: "white" }} href="https://twitch.tv/esfandtv" target="_blank" rel="noopener noreferrer">
                                    Watch Live On Twitch
                                </a>
                            </div>
                            <div className="col-auto">
                                <img id="sectionImage" width="144" height="192" src={buildImageUrl("144", "192")}/>
                            </div>
                        </div>
                    </div> 
                </div>
                )
          } else {
            return (
                <div className="col-md-6 col-sm-12">
                    <div id="offlineSection">
                        <div className="panel row g-0 rounded mb-2 overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <h3 id="statusText-offline" className="mb-0">OFFLINE</h3>          
                                <p id="streamTitle" className="card-text mb-auto">{streamInfo.title}</p>
                                <a id="watchButton" className="btn" style={{backgroundColor: "#6441a5", color: "white" }} href="https://twitch.tv/esfandtv" target="_blank" rel="noopener noreferrer">
                                    Visit Channel
                                </a>
                            </div>
                            <div className="col-auto">
                                <img id="sectionImage" width="144" height="192" src={buildImageUrl("144", "192")}/>
                            </div>
                        </div>
                    </div>   
                </div>
                )
          }
          
      }
}