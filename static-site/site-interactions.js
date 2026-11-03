(function(){
  'use strict';
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||!window.matchMedia('(hover:hover) and (pointer:fine)').matches)return;
  var words=document.querySelectorAll('.hero h1 .hero-word');
  words.forEach(function(word){
    word.addEventListener('pointerenter',function(){word.classList.add('is-hovered')});
    word.addEventListener('pointerleave',function(){word.classList.remove('is-hovered')});
  });
})();
