
 var slider = {
 slides: ['images/banner/1.jpg','images/banner/2.jpg','images/banner/3.jpg','images/banner/4.jpg','images/banner/5.jpg','images/banner/6.jpg','images/banner/7.jpg'],

     frame: 0, /* current frame, index "0" is current number from array*/

     set: function(image) { /* setting background*/
     document.getElementById("src").style.backgroundImage = "url("+image+")";
  },

     init: function init() { /*start sliding with zero picture`s index*/
 this.set(this.slides[this.frame]);
 },

     left: function() { /*step by step to the left*/
 this.frame--;
 if(this.frame < 0) this.frame = this.slides.length-1;
 slider.init();
 },

     right: function() { /*step by step to the right*/
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
