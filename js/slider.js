
 var slider = {
 slides: ['images/banner/1.jpg','images/banner/2.jpg','images/banner/3.jpg','images/banner/4.jpg','images/banner/5.jpg','images/banner/6.jpg','images/banner/7.jpg'],

     frame: 0,

     set: function(image) {
     document.getElementById("src").style.backgroundImage = "url("+image+")";
  },

     init: function init() {
 this.set(this.slides[this.frame]);
 },

     left: function() {
 this.frame--;
 if(this.frame < 0) this.frame = this.slides.length-1;
 slider.init();
 },

     right: function() {
 this.frame++;
 if(this.frame === this.slides.length) this.frame = 0;
 slider.init();
 }
 };

 window.addEventListener('load', function() {
 slider.init();
 setInterval(function() {
 slider.right();
 },5000);
 });
