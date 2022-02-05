const gameNotificationsSwitch = document.getElementById('showGameNotificationsSwitch');
const videoNotificationsSwitch = document.getElementById('showVideoNotificationsSwitch');
const liveNotificationsSwitch = document.getElementById('showLiveNotificationsSwitch');

async function getLocalNotificationsData() {
  return new Promise((resolve, _reject) => {
    chrome.storage.local.get('notifications', (result) => {
      if (result === undefined) {
        resolve(true);
      } else {
        console.log('result', result);
        resolve(result);
      }    
    });
  });
}

async function handleSwitchClick(notificationType) {
  let notificationData = await getLocalNotificationsData();
  console.log(notificationData);
  switch (notificationType) {
    case 'game':
      const gameChecked = gameNotificationsSwitch.checked;
      notificationData.notifications.category = gameChecked;
      break;
    case 'video':
      const videoChecked = videoNotificationsSwitch.checked;
      notificationData.notifications.video = videoChecked;
      break;
    case 'live':
      const liveChecked = liveNotificationsSwitch.checked;
      notificationData.notifications.live = liveChecked;
      break;
  }
  chrome.storage.local.set({'notifications': notificationData.notifications})
}

gameNotificationsSwitch.addEventListener("click", async () => await handleSwitchClick('game'));
videoNotificationsSwitch.addEventListener("click", async () => await handleSwitchClick('video'));
liveNotificationsSwitch.addEventListener("click", async () => await  handleSwitchClick('live'));


document.addEventListener('DOMContentLoaded', async function () {
  const notificationData = await getLocalNotificationsData();
  gameNotificationsSwitch.checked = notificationData.notifications.category;
  videoNotificationsSwitch.checked = notificationData.notifications.video;
  liveNotificationsSwitch.checked = notificationData.notifications.live;
});