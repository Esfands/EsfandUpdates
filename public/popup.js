const statusText = document.getElementById("statusText");
const streamText = document.getElementById("streamTitle");
const tweetText = document.getElementById("latestTweet");
const tweetLink = document.getElementById("twitterLink");

chrome.storage.local.get("streamData", ({ streamData }) => {
    if (streamData === undefined) return;
    const liveText = streamData.status === 'online' ? 'LIVE' : 'OFFLINE';
    statusText.innerText = `${liveText}`;
    streamText.innerText = `${trimTitle(streamData.title)}`;

    if (streamData.status === 'offline') {
        const watchBtn = document.getElementById("watchButton");
        watchBtn.innerText = "Visit Channel";
    }
});

window.onload = async () => {
  const streamInfo = await getStreamInfo();
  const imgUrl = await buildImageUrl(streamInfo[0].gameArt, 144, 192);
  const sectionImage = document.getElementById('sectionImage');
  //sectionImage.src = imgUrl;

  const twitterPosts = await getTwitterPosts();
  tweetText.innerHTML = `Latest Tweet: </br> ${urlify(twitterPosts[0].text)}`;
  tweetLink.href = twitterPosts[0].url;
}

async function getStreamInfo() {
  const res = await fetch("https://api.onlyfands.net/info", {
      method: 'GET',
      headers: {
          'content-type': 'application/json;'
      },
      mode: 'cors',
  });

  const {Data} = await res.json();
  if (res.ok) {
      return Data;
  } else {
      return Promise.reject('There was an error in retrieving the data.');
  }
}

async function getTwitterPosts() {
  const res = await fetch("https://api.onlyfands.net/posts", {
      method: 'GET',
      headers: {
          'content-type': 'application/json;'
      },
      mode: 'cors',
  });

  const {data} = await res.json();
  if (res.ok) {
      return data;
  } else {
      return Promise.reject('There was an error in retrieving the data.');
  }
}

async function buildImageUrl(url, width, height) {
  return url.replace('{width}', width).replace('{height}', height);
}

function trimTitle(title) {
  return `${title.substring(0,75)}${title.length > 75 ? '...' : ''}`;
}

function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return '<a style="color:#970e0f" href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
  })
}