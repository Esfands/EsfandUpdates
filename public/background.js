chrome.runtime.onInstalled.addListener(() => {
    performVersionCheck();
    chrome.alarms.create('statusCheck', { periodInMinutes: 1 });
  });
  
  chrome.notifications.onClicked.addListener(async function(notificationId) {
    let url = '';
    if (notificationId === 'video') {
      const streamData = await getLocalStreamData();
      const videoId = streamData.videoId;
      url = `https://youtube.com/watch?v=${videoId}`
    } else if (notificationId === 'announcement') {
      const apiData = await getStreamData();
      const announcementUrl = apiData.announcementLink;
      url = announcementUrl;
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
    const twitchData = responseData.twitch;
    const youtubeData = responseData.video;
    const announcementData = responseData.announcement;

    const data = await getLocalStreamData();
    const currLive = data.live;
    const currCategory = data.category;
    const currTitle = data.title;
    const currVideoId = data.videoId;
    const announcementIds = data.announcementIds;
    
    const notificationData = await getLocalNotificationsData();

    if (responseData.error) return;

    const announcementMsgId = announcementData?.msgId;
    
    if (announcementMsgId != null && announcementMsgId !== '' && announcementMsgId !== '0') {
      if (!announcementIds.includes(announcementData.msgId)) {
        chrome.notifications.create('announcement', {
          iconUrl: '/images/esfand_icon128.png',
            message: `${announcementData.message}`,
            title: 'ESFAND ANNOUNCEMENT',
            type: 'basic'
        });
        
        await updateAnnouncements(announcementData.msgId);
      }
    }

    if (!currLive && twitchData.live) {
      const showLiveNotification = notificationData.live;
      if (showLiveNotification) {  
        chrome.notifications.create({
          iconUrl: '/images/esfand_icon128.png',
          message: `${twitchData.title}`,
          title: 'Esfand is live!',
          type: 'basic'
        });
      };

      updateStatusBadge(twitchData.live);
      await updateStatus(twitchData.live);
      await updateCategory(twitchData.category);
      await updateTitle(twitchData.title);
  
      return;
    } else if (firstLoad) {
      updateStatusBadge(twitchData.live);
      await updateStatus(twitchData.live);
      await updateCategory(twitchData.category);
      await updateTitle(twitchData.title);
      await updateVideo(youtubeData.id, youtubeData.title);
    }
  
    
    updateStatusBadge(twitchData.live);
    
    const youtubeId = youtubeData?.id;
    if (youtubeId != null && youtubeId !== '' && youtubeId !== currVideoId) {
      const showYoutubeNotification = notificationData.video;
      await updateVideo(youtubeData.id, youtubeData.title);
      if (showYoutubeNotification) {
        chrome.notifications.create('video', {
          iconUrl: '/images/esfand_icon128.png',
          message: `${youtubeData.title}`,
          title: 'New Esfand Youtube Video!',
          type: 'basic'
        });
      }
      return;
    }
  
    if (!currLive && !firstLoad) { return; }
  
    if (!twitchData.live) {
      await updateStatus(twitchData.live);
      return;
    }

    if (currTitle.toLowerCase() !== twitchData.title.toLowerCase()) {
      await updateTitle(twitchData.title);
    }
  
    if (currCategory.toLowerCase() !== twitchData.category.toLowerCase()) {
      await updateCategory(twitchData.category);
      
      if (!notificationData.category) { return };
  
      chrome.notifications.create({
        iconUrl: '/images/esfand_icon128.png',
        message: `Esfand switched to ${twitchData.category}`,
        title: 'Esfand Updates',
        type: 'basic'
      });
    }
  }
  
  async function getStreamData() {
    const res = await fetch('https://cdn.otkdata.com/api/stream/esfandtv', {
        method: 'GET',
        headers: {
            'content-type': 'application/json;'
        },
        mode: 'cors',
    });
  
    const {data} = await res.json();
    if (res.ok) {
        return data[0];
    } else {
        return Promise.reject('There was an error in retrieving the data.');
    }
  }
  
  function addDefaultStorageData() {
    chrome.storage.local.set({'streamData': {
      'live': false,
      'category': '',
      'title': '',
      'videoId': '',
      'videoTitle': '',
      'announcementIds': []
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
            live: false,
            videoId: "",
            videoTitle: "",
            announcementIds: []
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
  
  function updateStatusBadge(live) {
    if (!live) {
      chrome.action.setBadgeBackgroundColor({ color: "#f82c2a" });
      chrome.action.setBadgeText({ text: "​" });
    } else {
      chrome.action.setBadgeBackgroundColor({ color: "#00d36a" });
      chrome.action.setBadgeText({ text: "​" });
    }
  }
  async function updateStatus(live) {
    const localStreamData = await getLocalStreamData();
    localStreamData.live = live; 
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
    if (videoId == null || videoTitle == null || videoTitle === '') return;

    const localStreamData = await getLocalStreamData();
    localStreamData.videoId = videoId;
    localStreamData.videoTitle = videoTitle;
    saveStreamData(localStreamData);
  }

  async function updateAnnouncements(announcementId) {
    if (announcementId == null) return;
    const localStreamData = await getLocalStreamData();
    localStreamData.announcementIds.push(announcementId);
    saveStreamData(localStreamData);
  }
  
  function saveStreamData(streamData) {
    chrome.storage.local.set({'streamData': streamData});
  }

  async function getLocalVersion() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['version'], (result) => {
          resolve(result);
      });
    });
  }

  async function performVersionCheck() {
    const currentVersion = await getLocalVersion();
    console.log(currentVersion);
    if (Object.keys(currentVersion).length === 0) {
      chrome.storage.local.set({'version': '1.5.5'});
      addDefaultStorageData();
      updateData(true);
    } else if (currentVersion !== '1.5.5') {
      chrome.storage.local.set({'version': '1.5.5'});
    }
  }