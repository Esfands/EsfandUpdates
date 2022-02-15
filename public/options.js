const notificationsSwitch = document.getElementById('showNotificationsSwitch');
notificationsSwitch.addEventListener("click", handleSwitchClick);

function handleSwitchClick(event) {
  const checked = notificationsSwitch.checked;
  chrome.storage.local.set({'notifications': checked})
}

async function getLocalNotificationsData() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('notifications', (result) => {
      if (result === undefined) {
        resolve(true);
      } else {
        resolve(result);
      }    
    });
  });
}

document.addEventListener('DOMContentLoaded', async function () {
  const notificationData = await getLocalNotificationsData();
  notificationsSwitch.checked = notificationData.notifications;
});