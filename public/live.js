const socket = io.connect("http://localhost:3000");
const video = document.getElementById('video');
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function(stream) {
            
            video.srcObject = stream;
            const canvas = document.createElement('canvas');
          
            setInterval(function(){              
const context = canvas.getContext('2d');
canvas.width = video.videoWidth;
canvas.height = video.videoHeight;
context.drawImage(video, 0, 0, canvas.width, canvas.height);

var dataURL = canvas.toDataURL('image/jpg')
var base64Data = dataURL.split(',')[1];

socket.emit('send', {
    data1 : base64Data
})      

        
        
    })}, 1000/30)
      }
      