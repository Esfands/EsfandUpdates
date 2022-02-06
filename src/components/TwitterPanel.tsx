import {useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

export const TwitterPanel = () => {

    const [tweet, setTweet] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState(false);

    function urlify(text: string) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function(url) {
          return '';
        })
      }

    useEffect(() => {       
        fetch("https://api.onlyfands.net/posts", {method: 'GET', mode: 'cors'})
            .then(response => response.json())
            .then(result => {
                setTweet(result.data);
                setIsLoaded(true);
            },
            (error) => {
                setIsLoaded(true);
              }, )

    }, []);

    if (!isLoaded) {
        return (
            <div className="col-md-6 col-sm-12">
            <div className="panel row g-0 rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative h-100">
              <div className="col p-4 d-flex flex-column position-static">
                <strong id="latestTweet" className="d-inline-block mb-1">Loading tweet...</strong>
              </div>
            </div>
          </div>
        )
    } else {
        return (
            <div className="col-md-6 col-sm-12">
            <div className="panel row g-0 rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative h-100">
              <div className="col p-4 d-flex flex-column position-static">
                <strong id="latestTweet" className="d-inline-block mb-1" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(urlify(tweet[0].text))}}></strong>
                <div>
                  <a id="twitterLink" style={{float:"right"}} href="https://twitter.com/esfandtv" target="_blank" rel="noopener noreferrer"><i className="fas fa-external-link-alt"></i></a>
                </div>
              </div>
            </div>
          </div>
        )
    }

    
}