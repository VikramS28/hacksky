// extension/popup.js
document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateStatus') {
      document.getElementById('status').innerText = request.status;
    }
  });
  chrome.runtime.sendMessage({ action: 'getStatus' }, response => {
    document.getElementById('status').innerText = response.status || 'No results yet.';
  });
});