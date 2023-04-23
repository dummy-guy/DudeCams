// get video and canvas elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let mediaRecorder;
let chunks = [];
let recording = false;

// check if browser supports mediaDevices.getUserMedia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function(stream) {
    video.srcObject = stream;
    video.play();
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9,opus' });
    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
      const videoData = new Blob(chunks, { type: 'video/webm' });
      const formData = new FormData();
      formData.append('videoData', videoData, 'video.webm');
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/savevideo');
      xhr.send(formData);
    };
    mediaRecorder.start();
    recording = true;
  });
}

// stop recording when user leaves the page
window.addEventListener('beforeunload', function() {
  if (recording) {
    mediaRecorder.stop();
    recording = false;
  }
});

