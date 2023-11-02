const video = document.querySelector("video");
if (window.matchMedia('(prefers-reduced-motion)').matches) {
  video.removeAttribute("autoplay");
  video.pause();
}



// Audio

var audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/Lecrae_-_Anomaly_(Lyric_Video).mp3');
audio.volume = 0.1;
audio.autoplay = true;

$('.nft-card--music').hover(function() {
  if (audio.paused == false) {
      audio.pause();
      $('.fa-play').show();
      $('.fa-pause').hide();
      $('.music-card').removeClass('playing');
  } else {
      audio.play();
      $('.fa-pause').show();
      $('.fa-play').hide();
      $('.music-card').addClass('playing');
  }
});