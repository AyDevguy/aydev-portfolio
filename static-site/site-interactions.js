(function(){
  'use strict';
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-scramble]').forEach(function(link){
    var label=link.querySelector('.scramble-text');if(!label||reduce)return;
    var original=label.textContent,alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ',timer=0;
    function scramble(){
      window.clearInterval(timer);var step=0,total=10;
      timer=window.setInterval(function(){
        label.textContent=original.split('').map(function(ch,i){if(ch===' ')return ' ';if(i<Math.floor(step/total*original.length))return original[i];return alphabet[Math.floor(Math.random()*alphabet.length)]}).join('');
        if(++step>total){window.clearInterval(timer);label.textContent=original}
      },24);
    }
    link.addEventListener('pointerenter',scramble);link.addEventListener('focus',scramble);
    link.addEventListener('pointerleave',function(){window.clearInterval(timer);label.textContent=original});
    link.addEventListener('blur',function(){window.clearInterval(timer);label.textContent=original});
  });
  if(reduce||!window.matchMedia('(hover:hover) and (pointer:fine)').matches)return;
  document.querySelectorAll('.hero .cta .btn,.hero .cta .pill').forEach(function(button){
    button.addEventListener('pointermove',function(event){var r=button.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;button.style.setProperty('--mag-x',(x*7).toFixed(1)+'px');button.style.setProperty('--mag-y',(y*5).toFixed(1)+'px')});
    button.addEventListener('pointerleave',function(){button.style.setProperty('--mag-x','0px');button.style.setProperty('--mag-y','0px')});
  });
})();
