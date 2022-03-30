chrome.runtime.onInstalled.addListener(() => {
    addDefaultStorageData();
    updateData(true);
    chrome.alarms.create('statusCheck', { periodInMinutes: 1 });
  });
  
  chrome.notifications.onClicked.addListener(async function(notificationId) {
    let url = '';
    if (notificationId === 'video') {
      const streamData = await getLocalStreamData();
      const videoId = streamData.videoId;
      url = `https://youtube.com/watch?v=${videoId}`
    } else {
      url = 'https://twitch.tv/esfandtv'
    }

    chrome.tabs.create({
        url: url
    });
  });
  
  chrome.alarms.onAlarm.addListener(async () => {
    updateData(false);
  });
  
  async function updateData(firstLoad) {
    const responseData = await getStreamData();
    const status = responseData.status;
    const title = responseData.title;
    const category = responseData.category;
    const videoId = responseData.videoId;
    const videoTitle = responseData.videoTitle;
    
    const data = await getLocalStreamData();
    const currStatus = data.status;
    const currCategory = data.category;
    const currTitle = data.title;
    const currVideoId = data.videoId;
    
    const notificationData = await getLocalNotificationsData();

    if (currStatus.toLowerCase() === 'offline' && status.toLowerCase() === 'online') {
      const showLiveNotification = notificationData.live;
      if (showLiveNotification) {  
        chrome.notifications.create({
          iconUrl: '/images/esfand_icon128.png',
          message: `${title}`,
          title: 'Esfand is live!',
          type: 'basic'
        });
      };
  
      await updateStatus(status);
      await updateCategory(category);
      await updateTitle(title);
  
      return;
    } else if (firstLoad) {
      await updateStatus(status);
      await updateCategory(category);
      await updateTitle(title);
      await updateVideo(videoId, videoTitle);
    }
  
    if (videoId !== currVideoId) {
      const showYoutubeNotification = notificationData.video;
      await updateVideo(videoId, videoTitle);
      if (showYoutubeNotification) {
        chrome.notifications.create('video', {
          iconUrl: '/images/esfand_icon128.png',
          message: `${videoTitle}`,
          title: 'New Esfand Youtube Video!',
          type: 'basic'
        });
      }
      return;
    }
  
    if (currStatus.toLowerCase() === 'offline' && !firstLoad) { return; }
  
    if (status.toLowerCase() === 'offline') {
      await updateStatus(status);
      return;
    }

    if (currTitle.toLowerCase() !== title.toLowerCase()) {
      await updateTitle(title);
    }
  
    if (currCategory.toLowerCase() !== category.toLowerCase()) {
      await updateCategory(category);
      
      if (!notificationData.category) { return };
  
      chrome.notifications.create({
        iconUrl: '/images/esfand_icon128.png',
        message: `Esfand switched to ${category}`,
        title: 'Esfand Updates',
        type: 'basic'
      });
    }
  }
  
  async function getStreamData() {
    const res = await fetch("https://api.onlyfands.net/stream", {
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
  
  function addDefaultStorageData() {
    chrome.storage.local.set({'streamData': {
      'status': 'offline',
      'category': '',
      'title': '',
      'videoId': '',
      'videoTitle': ''
    }});
  
    chrome.storage.local.set({'notifications': {
      'video': true,
      'category': true,
      'live': true
    }});
  }
  
  async function getLocalStreamData() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['streamData'], (result) => {
        if (result === undefined) {
          resolve({
            title: "",
            category: "",
            status: "offline",
            videoId: "",
            videoTitle: ""
          });
        } else {
          resolve(result.streamData);
        }    
      });
    });
  }
  
  async function getLocalNotificationsData() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['notifications'], (result) => {
        if (result === undefined) {
          resolve({
            'video': true,
            'category': true,
            'live': true
          });
        } else {
          resolve(result.notifications);
        }    
      });
    });
  }
  
  async function updateStatus(status) {
    const localStreamData = await getLocalStreamData();
    localStreamData.status = status;
    saveStreamData(localStreamData);
  }
  
  async function updateTitle(title) {
    const localStreamData = await getLocalStreamData();
    localStreamData.title = title;
    saveStreamData(localStreamData);
  }
  
  async function updateCategory(category) {
    const localStreamData = await getLocalStreamData();
    localStreamData.category = category;
    saveStreamData(localStreamData);
  }

  async function updateVideo(videoId, videoTitle) {
    const localStreamData = await getLocalStreamData()
    localStreamData.videoId = videoId;
    localStreamData.videoTitle = videoTitle;
    saveStreamData(localStreamData);
  }
  
  function saveStreamData(streamData) {
    chrome.storage.local.set({'streamData': streamData});
  }