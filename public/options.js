const liveNotificationsSwitch = document.getElementById('showLiveNotificationsSwitch');
const youtubeNotificationsSwitch = document.getElementById('showYoutubeNotificationsSwitch');
const categoryNotificationsSwitch = document.getElementById('showCategoryNotificationsSwitch');

liveNotificationsSwitch.addEventListener("click", async function () { await handleCheckboxClick('live')});
youtubeNotificationsSwitch.addEventListener("click", async function () { await handleCheckboxClick('video')});
categoryNotificationsSwitch.addEventListener("click", async function () { await handleCheckboxClick('category')});

async function handleCheckboxClick(type) {
  const notificationData = await getLocalNotificationsData();
  switch (type) {
    case 'live':
      {
        const checked = liveNotificationsSwitch.checked;
        notificationData.live = checked;
        break;
      }    
    case 'video':
      {
        const checked = youtubeNotificationsSwitch.checked;
        notificationData.video = checked;
        break;
      }  
    case 'category':
      {
        const checked = categoryNotificationsSwitch.checked;
        notificationData.category = checked;
        break;
      }  
    default:
      console.log('Something weird happened man.')
      break;
  }
  
  chrome.storage.local.set({'notifications': notificationData})
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
        console.log(result)
        resolve(result.notifications);
      }    
    });
  });
}

document.addEventListener('DOMContentLoaded', async function () {
  const notificationData = await getLocalNotificationsData();
  liveNotificationsSwitch.checked = notificationData.live;
  youtubeNotificationsSwitch.checked = notificationData.video;
  categoryNotificationsSwitch.checked = notificationData.category;
});