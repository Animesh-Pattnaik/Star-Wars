/*
Check out the original dribbble shot
https://dribbble.com/shots/2797559-Mr-bara-Split-Screen
*/



const up = $('.nav-up');
const down = $('.nav-down');
let counter = 1;
let number = $('.number');

function moveDown(currentSlide) {
  
  var nextSlide = currentSlide.next();
  var currentSlideUp = currentSlide.find('.txt');
  var currentSlideDown = currentSlide.find('.img');
  var nextSlideUp = nextSlide.find('.img');
  var nextSlideDown = nextSlide.find('.txt');
  let currentCopy = currentSlide.find('.copy'); 
  let nextCopy = nextSlide.find('.copy'); 
  
  if( nextSlide.length !== 0 ) {
    
    counter = counter + 1;
    
    if( counter % 2 === 0 ) {
      
      TweenMax.to(number, 0.3, {x: '-100%'})
      TweenMax.to( currentSlideUp, 0.4, { y: '-100%', delay:0.15 });
      TweenMax.to( currentSlideDown, 0.4, { y: '100%', delay:0.15 });
      setTimeout(function() {number.html('')},300);
      
    } else {
      
      number.html('0'+counter);
      TweenMax.to(number, 0.3, {x: '0%', delay:1})
      TweenMax.to( currentSlideUp, 0.4, { y: '100%', delay:0.15 });
      TweenMax.to( currentSlideDown, 0.4, { y: '-100%', delay:0.15 });
    }
    
    TweenMax.to( currentCopy, 0.3, {autoAlpha: 0, delay:0.15});
    TweenMax.to( nextCopy, 0.3, {autoAlpha: 1, delay:1});
    TweenMax.to( nextSlideUp, 0.4, { y: '0%', delay:0.15 });
    TweenMax.to( nextSlideDown, 0.4, { y: '0%', delay:0.15 });
    
    $(currentSlide).removeClass('active');
    $(nextSlide).addClass('active');
    
  } 
}

function moveUp(currentSlide) {
  
  var prevSlide = currentSlide.prev();
  var currentSlideUp = currentSlide.find('.img');
  var currentSlideDown = currentSlide.find('.txt');
  var prevSlideUp = prevSlide.find('.txt');
  var prevSlideDown = prevSlide.find('.img');
  let currentCopy = currentSlide.find('.copy');
  let prevCopy = prevSlide.find('.copy'); 
  
  if( prevSlide.length !== 0 ) {
    
    counter = counter - 1;
    
    if( counter % 2 === 0 ) {
      
      
      TweenMax.to(number, 0.3, {x: '-100%'});
      TweenMax.to( currentSlideUp, 0.4, { y: '-100%', delay:0.15 });
      TweenMax.to( currentSlideDown, 0.4, { y: '100%', delay:0.15 });
      setTimeout(function() {number.html('')},300);

      
    }else {
      
      number.html('0'+counter);
      TweenMax.to(number, 0.3, {x: '0%', delay:1})
      TweenMax.to( currentSlideUp, 0.4, { y: '100%', delay:0.15 });
      TweenMax.to( currentSlideDown, 0.4, { y: '-100%', delay:0.15 });
    }
    
    TweenMax.to( currentCopy, 0.3, {autoAlpha: 0, delay:0.15});
    TweenMax.to( prevCopy, 0.3, {autoAlpha: 1, delay:1});
    TweenMax.to( prevSlideUp, 0.4, { y: '0%', delay:0.15 });
    TweenMax.to( prevSlideDown, 0.4, { y: '0%', delay:0.15 });
    
    $(currentSlide).removeClass('active');
    $(prevSlide).addClass('active');
    
  }
  
}

function hideNav() {
  
  if( counter == $('.slide').length) {    
    TweenMax.to($('.nav-down'),0.5, {autoAlpha: 0, delay:0.5} );
  }else {
     TweenMax.to($('.nav-down'),0.5, {autoAlpha: 1, delay:0.5} );
  }
  if( counter === 1) {    
    TweenMax.to($('.nav-up'),0.5, {autoAlpha: 0, delay:0.5} );
  }else {
     TweenMax.to($('.nav-up'),0.5, {autoAlpha: 1, delay:0.5} );
  }
  
}


down.on('click', function() {
  
  var currentSlide = $('.active');
  moveDown(currentSlide); 
  hideNav();
  
});

up.on('click', function() {
  
  var currentSlide = $('.active');
  moveUp(currentSlide);
  hideNav();

});


var slideshowDuration = 4000;
var slideshow=$('.main-content .slideshow');

function slideshowSwitch(slideshow,index,auto){
  if(slideshow.data('wait')) return;

  var slides = slideshow.find('.slide');
  var pages = slideshow.find('.pagination');
  var activeSlide = slides.filter('.is-active');
  var activeSlideImage = activeSlide.find('.image-container');
  var newSlide = slides.eq(index);
  var newSlideImage = newSlide.find('.image-container');
  var newSlideContent = newSlide.find('.slide-content');
  var newSlideElements=newSlide.find('.caption > *');
  if(newSlide.is(activeSlide))return;

  newSlide.addClass('is-new');
  var timeout=slideshow.data('timeout');
  clearTimeout(timeout);
  slideshow.data('wait',true);
  var transition=slideshow.attr('data-transition');
  if(transition=='fade'){
    newSlide.css({
      display:'block',
      zIndex:2
    });
    newSlideImage.css({
      opacity:0
    });

    TweenMax.to(newSlideImage,1,{
      alpha:1,
      onComplete:function(){
        newSlide.addClass('is-active').removeClass('is-new');
        activeSlide.removeClass('is-active');
        newSlide.css({display:'',zIndex:''});
        newSlideImage.css({opacity:''});
        slideshow.find('.pagination').trigger('check');
        slideshow.data('wait',false);
        if(auto){
          timeout=setTimeout(function(){
            slideshowNext(slideshow,false,true);
          },slideshowDuration);
          slideshow.data('timeout',timeout);}}});
  } else {
    if(newSlide.index()>activeSlide.index()){
      var newSlideRight=0;
      var newSlideLeft='auto';
      var newSlideImageRight=-slideshow.width()/8;
      var newSlideImageLeft='auto';
      var newSlideImageToRight=0;
      var newSlideImageToLeft='auto';
      var newSlideContentLeft='auto';
      var newSlideContentRight=0;
      var activeSlideImageLeft=-slideshow.width()/4;
    } else {
      var newSlideRight='';
      var newSlideLeft=0;
      var newSlideImageRight='auto';
      var newSlideImageLeft=-slideshow.width()/8;
      var newSlideImageToRight='';
      var newSlideImageToLeft=0;
      var newSlideContentLeft=0;
      var newSlideContentRight='auto';
      var activeSlideImageLeft=slideshow.width()/4;
    }

    newSlide.css({
      display:'block',
      width:0,
      right:newSlideRight,
      left:newSlideLeft
      ,zIndex:2
    });

    newSlideImage.css({
      width:slideshow.width(),
      right:newSlideImageRight,
      left:newSlideImageLeft
    });

    newSlideContent.css({
      width:slideshow.width(),
      left:newSlideContentLeft,
      right:newSlideContentRight
    });

    activeSlideImage.css({
      left:0
    });

    TweenMax.set(newSlideElements,{y:20,force3D:true});
    TweenMax.to(activeSlideImage,1,{
      left:activeSlideImageLeft,
      ease:Power3.easeInOut
    });

    TweenMax.to(newSlide,1,{
      width:slideshow.width(),
      ease:Power3.easeInOut
    });

    TweenMax.to(newSlideImage,1,{
      right:newSlideImageToRight,
      left:newSlideImageToLeft,
      ease:Power3.easeInOut
    });

    TweenMax.staggerFromTo(newSlideElements,0.8,{alpha:0,y:60},{alpha:1,y:0,ease:Power3.easeOut,force3D:true,delay:0.6},0.1,function(){
      newSlide.addClass('is-active').removeClass('is-new');
      activeSlide.removeClass('is-active');
      newSlide.css({
        display:'',
        width:'',
        left:'',
        zIndex:''
      });

      newSlideImage.css({
        width:'',
        right:'',
        left:''
      });

      newSlideContent.css({
        width:'',
        left:''
      });

      newSlideElements.css({
        opacity:'',
        transform:''
      });

      activeSlideImage.css({
        left:''
      });

      slideshow.find('.pagination').trigger('check');
      slideshow.data('wait',false);
      if(auto){
        timeout=setTimeout(function(){
          slideshowNext(slideshow,false,true);
        },slideshowDuration);
        slideshow.data('timeout',timeout);
      }
    });
  }
}

function slideshowNext(slideshow,previous,auto){
  var slides=slideshow.find('.slide');
  var activeSlide=slides.filter('.is-active');
  var newSlide=null;
  if(previous){
    newSlide=activeSlide.prev('.slide');
    if(newSlide.length === 0) {
      newSlide=slides.last();
    }
  } else {
    newSlide=activeSlide.next('.slide');
    if(newSlide.length==0)
      newSlide=slides.filter('.slide').first();
  }

  slideshowSwitch(slideshow,newSlide.index(),auto);
}

function homeSlideshowParallax(){
  var scrollTop=$(window).scrollTop();
  if(scrollTop>windowHeight) return;
  var inner=slideshow.find('.slideshow-inner');
  var newHeight=windowHeight-(scrollTop/2);
  var newTop=scrollTop*0.8;

  inner.css({
    transform:'translateY('+newTop+'px)',height:newHeight
  });
}

$(document).ready(function() {
 $('.slide').addClass('is-loaded');

 $('.slideshow .arrows .arrow').on('click',function(){
  slideshowNext($(this).closest('.slideshow'),$(this).hasClass('prev'));
});

 $('.slideshow .pagination .item').on('click',function(){
  slideshowSwitch($(this).closest('.slideshow'),$(this).index());
});

 $('.slideshow .pagination').on('check',function(){
  var slideshow=$(this).closest('.slideshow');
  var pages=$(this).find('.item');
  var index=slideshow.find('.slides .is-active').index();
  pages.removeClass('is-active');
  pages.eq(index).addClass('is-active');
});

/* Lazyloading
$('.slideshow').each(function(){
  var slideshow=$(this);
  var images=slideshow.find('.image').not('.is-loaded');
  images.on('loaded',function(){
    var image=$(this);
    var slide=image.closest('.slide');
    slide.addClass('is-loaded');
  });
*/

var timeout=setTimeout(function(){
  slideshowNext(slideshow,false,true);
},slideshowDuration);

slideshow.data('timeout',timeout);
});

if($('.main-content .slideshow').length > 1) {
  $(window).on('scroll',homeSlideshowParallax);
}




// API Fetching

let planet1Name = document.querySelector('.planet1-name');
let planet1Climate = document.querySelector('.planet1-climate');
let planet1Population = document.querySelector('.planet1-population');
let planet1Terrain = document.querySelector('.planet1-terrain');
let planet1Rotation = document.querySelector('.planet1-rotation');

let planet2Name = document.querySelector('.planet2-name');
let planet2Climate = document.querySelector('.planet2-climate');
let planet2Population = document.querySelector('.planet2-population');
let planet2Terrain = document.querySelector('.planet2-terrain');
let planet2Rotation = document.querySelector('.planet2-rotation');

let planet3Name = document.querySelector('.planet3-name');
let planet3Climate = document.querySelector('.planet3-climate');
let planet3Population = document.querySelector('.planet3-population');
let planet3Terrain = document.querySelector('.planet3-terrain');
let planet3Rotation = document.querySelector('.planet3-rotation');

let planet4Name = document.querySelector('.planet4-name');
let planet4Climate = document.querySelector('.planet4-climate');
let planet4Population = document.querySelector('.planet4-population');
let planet4Terrain = document.querySelector('.planet4-terrain');
let planet4Rotation = document.querySelector('.planet4-rotation');

let planet5Name = document.querySelector('.planet5-name');
let planet5Climate = document.querySelector('.planet5-climate');
let planet5Population = document.querySelector('.planet5-population');
let planet5Terrain = document.querySelector('.planet5-terrain');
let planet5Rotation = document.querySelector('.planet5-rotation');

let planet6Name = document.querySelector('.planet6-name');
let planet6Climate = document.querySelector('.planet6-climate');
let planet6Population = document.querySelector('.planet6-population');
let planet6Terrain = document.querySelector('.planet6-terrain');
let planet6Rotation = document.querySelector('.planet6-rotation');

let planet7Name = document.querySelector('.planet7-name');
let planet7Climate = document.querySelector('.planet7-climate');
let planet7Population = document.querySelector('.planet7-population');
let planet7Terrain = document.querySelector('.planet7-terrain');
let planet7Rotation = document.querySelector('.planet7-rotation');

let planet8Name = document.querySelector('.planet8-name');
let planet8Climate = document.querySelector('.planet8-climate');
let planet8Population = document.querySelector('.planet8-population');
let planet8Terrain = document.querySelector('.planet8-terrain');
let planet8Rotation = document.querySelector('.planet8-rotation');

let planet9Name = document.querySelector('.planet9-name');
let planet9Climate = document.querySelector('.planet9-climate');
let planet9Population = document.querySelector('.plane9-population');
let planet9Terrain = document.querySelector('.planet9-terrain');
let planet9Rotation = document.querySelector('.planet9-rotation');

let planet10Name = document.querySelector('.planet10-name');
let planet10Climate = document.querySelector('.planet10-climate');
let planet10Population = document.querySelector('.plane10-population');
let planet10Terrain = document.querySelector('.planet10-terrain');
let planet10Rotation = document.querySelector('.planet10-rotation');






let a = fetch("https://swapi.dev/api/planets/")
a.then((value1)=>{
    return value1.json();
    // console.log(value1.status)
    // console.log(value1.ok)
}).then((value2)=>{
  planet1Name.innerHTML = `${value2.results[0].name}`;
  planet1Climate.innerHTML += `${value2.results[0].climate}`
  planet1Population.innerHTML += `${value2.results[0].population}`
  planet1Terrain.innerHTML += `${value2.results[0].terrain}`
  planet1Rotation.innerHTML += `${value2.results[0].rotation_period} hr`
  
  planet2Name.innerHTML = `${value2.results[1].name}`;
  planet2Climate.innerHTML += `${value2.results[1].climate}`
  planet2Population.innerHTML += `${value2.results[1].population}`
  planet2Terrain.innerHTML += `${value2.results[1].terrain}`
  planet2Rotation.innerHTML += `${value2.results[1].rotation_period} hr`
  
  planet3Name.innerHTML = `${value2.results[2].name}`;
  planet3Climate.innerHTML += `${value2.results[2].climate}`
  planet3Population.innerHTML += `${value2.results[2].population}`
  planet3Terrain.innerHTML += `${value2.results[2].terrain}`
  planet3Rotation.innerHTML += `${value2.results[2].rotation_period} hr`
  
  planet4Name.innerHTML = `${value2.results[3].name}`;
  planet4Climate.innerHTML += `${value2.results[3].climate}`
  planet4Population.innerHTML += `${value2.results[3].population}`
  planet4Terrain.innerHTML += `${value2.results[3].terrain}`
  planet4Rotation.innerHTML += `${value2.results[3].rotation_period} hr`
  
  planet5Name.innerHTML = `${value2.results[4].name}`;
  planet5Climate.innerHTML += `${value2.results[4].climate}`
  planet5Population.innerHTML += `${value2.results[4].population}`
  planet5Terrain.innerHTML += `${value2.results[4].terrain}`
  planet5Rotation.innerHTML += `${value2.results[4].rotation_period} hr`
  
  planet6Name.innerHTML = `${value2.results[5].name}`;
  planet6Climate.innerHTML += `${value2.results[5].climate}`
  planet6Population.innerHTML += `${value2.results[5].population}`
  planet6Terrain.innerHTML += `${value2.results[5].terrain}`
  planet6Rotation.innerHTML += `${value2.results[5].rotation_period} hr`
  
  planet7Name.innerHTML = `${value2.results[6].name}`;
  planet7Climate.innerHTML += `${value2.results[6].climate}`
  planet7Population.innerHTML += `${value2.results[6].population}`
  planet7Terrain.innerHTML += `${value2.results[6].terrain}`
  planet7Rotation.innerHTML += `${value2.results[6].rotation_period} hr`
  
  planet8Name.innerHTML = `${value2.results[7].name}`;
  planet8Climate.innerHTML += `${value2.results[7].climate}`
  planet8Population.innerHTML += `${value2.results[7].population}`
  planet8Terrain.innerHTML += `${value2.results[7].terrain}`
  planet8Rotation.innerHTML += `${value2.results[7].rotat9on_period} hr`
  
  planet9Name.innerHTML = `${value2.results[8].name}`;
  planet9Climate.innerHTML += `${value2.results[8].climate}`
  planet9Population.innerHTML += `${value2.results[8].population}`
  planet9Terrain.innerHTML += `${value2.results[8].terrain}`
  planet9Rotation.innerHTML += `${value2.results[8].rotation_period} hr`
  
  planet10Name.innerHTML = `${value2.results[9].name}`;
  planet10Climate.innerHTML += `${value2.results[9].climate}`
  planet10Population.innerHTML += `${value2.results[9].population}`
  planet10Terrain.innerHTML += `${value2.results[9].terrain}`
  planet10Rotation.innerHTML += `${value2.results[9].rotation_period} hr`
  console.log(value2.results);
});





let starr1Name = document.querySelector('.star1')
let starr2Name = document.querySelector('.star2')
let starr3Name = document.querySelector('.star3')
let starr4Name = document.querySelector('.star4')
let starr5Name = document.querySelector('.star5')
let starr6Name = document.querySelector('.star6')
let starr7Name = document.querySelector('.star7')
let starr8Name = document.querySelector('.star8')
let starr9Name = document.querySelector('.star9')
let starr10Name = document.querySelector('.star10')



let star1Model = document.querySelector('.star1-model');
let star2Model = document.querySelector('.star2-model');
let star3Model = document.querySelector('.star3-model');
let star4Model = document.querySelector('.star4-model');
let star5Model = document.querySelector('.star5-model');
let star6Model = document.querySelector('.star6-model');
let star7Model = document.querySelector('.star7-model');
let star8Model = document.querySelector('.star8-model');
let star9Model = document.querySelector('.star9-model');
let star10Model = document.querySelector('.star10-model');

let star1Manufacturer = document.querySelector('.star1-Manufacturer');
let star2Manufacturer = document.querySelector('.star2-Manufacturer');
let star3Manufacturer = document.querySelector('.star3-Manufacturer');
let star4Manufacturer = document.querySelector('.star4-Manufacturer');
let star5Manufacturer = document.querySelector('.star5-Manufacturer');
let star6Manufacturer = document.querySelector('.star6-Manufacturer');
let star7Manufacturer = document.querySelector('.star7-Manufacturer');
let star8Manufacturer = document.querySelector('.star8-Manufacturer');
let star9Manufacturer = document.querySelector('.star9-Manufacturer');
let star10Manufacturer = document.querySelector('.star10-Manufacturer');

let star1Crew = document.querySelector('.star1-Crew');
let star2Crew = document.querySelector('.star2-Crew');
let star3Crew = document.querySelector('.star3-Crew');
let star4Crew = document.querySelector('.star4-Crew');
let star5Crew = document.querySelector('.star5-Crew');
let star6Crew = document.querySelector('.star6-Crew');
let star7Crew = document.querySelector('.star7-Crew');
let star8Crew = document.querySelector('.star8-Crew');
let star9Crew = document.querySelector('.star9-Crew');
let star10Crew = document.querySelector('.star10-Crew');

let star1Starship_class = document.querySelector('.star1-Starship_class');
let star2Starship_class = document.querySelector('.star2-Starship_class');
let star3Starship_class = document.querySelector('.star3-Starship_class');
let star4Starship_class = document.querySelector('.star4-Starship_class');
let star5Starship_class = document.querySelector('.star5-Starship_class');
let star6Starship_class = document.querySelector('.star6-Starship_class');
let star7Starship_class = document.querySelector('.star7-Starship_class');
let star8Starship_class = document.querySelector('.star8-Starship_class');
let star9Starship_class = document.querySelector('.star9-Starship_class');
let star10Starship_class = document.querySelector('.star10-Starship_class');


let b = fetch("https://swapi.dev/api/starships/");
b.then((value1)=>{
  return value1.json();
}).then((value2)=>{
  starr1Name.innerHTML = `${value2.results[0].name}`;
  starr2Name.innerHTML = `${value2.results[1].name}`;
  starr3Name.innerHTML = `${value2.results[2].name}`;
  starr4Name.innerHTML = `${value2.results[3].name}`;
  starr5Name.innerHTML = `${value2.results[4].name}`;
  starr6Name.innerHTML = `${value2.results[5].name}`;
  starr7Name.innerHTML = `${value2.results[6].name}`;
  starr8Name.innerHTML = `${value2.results[7].name}`;
  starr9Name.innerHTML = `${value2.results[8].name}`;
  starr10Name.innerHTML = `${value2.results[9].name}`;
  // console.log(value2.results[8].name);
  
  star1Model.innerHTML += `${value2.results[0].model}`;
  star2Model.innerHTML += `${value2.results[1].model}`;
  star3Model.innerHTML += `${value2.results[2].model}`;
  star4Model.innerHTML += `${value2.results[3].model}`;
  star5Model.innerHTML += `${value2.results[4].model}`;
  star6Model.innerHTML += `${value2.results[5].model}`;
  star7Model.innerHTML += `${value2.results[6].model}`;
  star8Model.innerHTML += `${value2.results[7].model}`;
  star9Model.innerHTML += `${value2.results[8].model}`;
  star10Model.innerHTML += `${value2.results[9].model}`;

  star1Manufacturer.innerHTML += `${value2.results[0].manufacturer}`;
  star2Manufacturer.innerHTML += `${value2.results[1].manufacturer}`;
  star3Manufacturer.innerHTML += `${value2.results[2].manufacturer}`;
  star4Manufacturer.innerHTML += `${value2.results[3].manufacturer}`;
  star5Manufacturer.innerHTML += `${value2.results[4].manufacturer}`;
  star6Manufacturer.innerHTML += `${value2.results[5].manufacturer}`;
  star7Manufacturer.innerHTML += `${value2.results[6].manufacturer}`;
  star8Manufacturer.innerHTML += `${value2.results[7].manufacturer}`;
  star9Manufacturer.innerHTML += `${value2.results[8].manufacturer}`;
  star10Manufacturer.innerHTML += `${value2.results[9].manufacturer}`;

  star1Crew.innerHTML += `${value2.results[0].crew}`;
  star2Crew.innerHTML += `${value2.results[1].crew}`;
  star3Crew.innerHTML += `${value2.results[2].crew}`;
  star4Crew.innerHTML += `${value2.results[3].crew}`;
  star5Crew.innerHTML += `${value2.results[4].crew}`;
  star6Crew.innerHTML += `${value2.results[5].crew}`;
  star7Crew.innerHTML += `${value2.results[6].crew}`;
  star8Crew.innerHTML += `${value2.results[7].crew}`;
  star9Crew.innerHTML += `${value2.results[8].crew}`;
  star10Crew.innerHTML += `${value2.results[9].crew}`;

  star1Starship_class.innerHTML += `${value2.results[0].starship_class}`;
  star2Starship_class.innerHTML += `${value2.results[1].starship_class}`;
  star3Starship_class.innerHTML += `${value2.results[2].starship_class}`;
  star4Starship_class.innerHTML += `${value2.results[3].starship_class}`;
  star5Starship_class.innerHTML += `${value2.results[4].starship_class}`;
  star6Starship_class.innerHTML += `${value2.results[5].starship_class}`;
  star7Starship_class.innerHTML += `${value2.results[6].starship_class}`;
  star8Starship_class.innerHTML += `${value2.results[7].starship_class}`;
  star9Starship_class.innerHTML += `${value2.results[8].starship_class}`;
  star10Starship_class.innerHTML += `${value2.results[9].starship_class}`;

  console.log(value2)
});