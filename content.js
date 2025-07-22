// extension/content.js
function analyzePageContent() {
  const video = document.querySelector('video');
  const audio = document.querySelector('audio');
  const text = document.querySelector('p, h1')?.innerText || '';

  fetch('http://localhost:5000/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ video: video?.src, audio: audio?.src, text })
  })
  .then(response => response.json())
  .then(data => {
    if (data.video?.isSuspicious) {
      video.style.border = '5px solid red';
      video.title = `Suspicious video: ${data.video.score}% likely deepfake`;
    }
    if (data.audio?.isSuspicious) {
      audio.style.border = '5px solid red';
      audio.title = `Suspicious audio: ${data.audio.score}% likely manipulated`;
    }
    if (data.text?.isSuspicious) {
      const textElement = document.querySelector('p, h1');
      textElement.style.border = '5px solid red';
      textElement.title = `Suspicious text: ${data.text.score}% likely false`;
    }
    chrome.runtime.sendMessage({ action: 'updateStatus', status: 'Analysis complete' });
  })
  .catch(error => {
    console.error('Error:', error);
    chrome.runtime.sendMessage({ action: 'updateStatus', status: 'Analysis failed' });
  });
}

window.addEventListener('load', analyzePageContent);