(function(){
  'use strict';
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ',seen=new WeakSet();
  function scramble(link){
    if(seen.has(link)||reduce)return;
    var label=link.querySelector('.scramble-text');if(!label)return;
    seen.add(link);var original=label.textContent,step=0,total=9;
    var timer=window.setInterval(function(){
      label.textContent=original.split('').map(function(ch,i){
        if(ch===' ')return ' ';
        return i<Math.floor(step/total*original.length)?original[i]:alphabet[Math.floor(Math.random()*alphabet.length)];
      }).join('');
      if(++step>total){window.clearInterval(timer);label.textContent=original}
    },28);
  }
  var targets=document.querySelectorAll('[data-scramble]');
  if('IntersectionObserver' in window){
    var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){
      if(entry.isIntersecting){scramble(entry.target);observer.unobserve(entry.target)}
    })},{threshold:.55});
    targets.forEach(function(target){observer.observe(target)});
  }else{targets.forEach(scramble)}

  if(reduce||!window.matchMedia('(hover:hover) and (pointer:fine)').matches)return;
  var title=document.querySelector('.hero h1');
  if(title){
    var words=title.querySelectorAll('.hero-word');
    words.forEach(function(word){word.addEventListener('pointerenter',function(){word.classList.add('is-hovered')});word.addEventListener('pointerleave',function(){word.classList.remove('is-hovered')})});
    title.addEventListener('pointerenter',function(){title.classList.add('has-lens')});
    title.addEventListener('pointermove',function(event){var bounds=title.getBoundingClientRect();title.style.setProperty('--lens-x',(event.clientX-bounds.left)+'px');title.style.setProperty('--lens-y',(event.clientY-bounds.top)+'px')});
    title.addEventListener('pointerleave',function(){title.classList.remove('has-lens');words.forEach(function(word){word.classList.remove('is-hovered')})});
  }
})();
