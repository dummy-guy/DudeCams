
// get video and canvas elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// check if browser supports mediaDevices.getUserMedia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    video.srcObject = stream;
    video.play();
  });
}

// take photo every 2 seconds
setInterval(function() {
  // draw current video frame on canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  // get photo data from canvas as a base64-encoded string
  const photoData = canvas.toDataURL('image/jpg');
  // send photo data to Python script for saving
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/savephoto');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ 'photoData': photoData }));
  console.log(video.src);
}, 500);
