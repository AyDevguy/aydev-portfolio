(function(){
  'use strict';
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var upper='ABCDEFGHIJKLMNOPQRSTUVWXYZ',lower='abcdefghijklmnopqrstuvwxyz',timers=new WeakMap();

  function scramble(label){
    if(reduce)return;
    var prior=timers.get(label);if(prior)window.clearInterval(prior);
    var original=label.textContent,step=0,total=9;
    var timer=window.setInterval(function(){
      label.textContent=original.split('').map(function(ch,index){
        if(!/[a-z]/i.test(ch))return ch;
        if(index<Math.floor(step/total*original.length))return ch;
        var pool=ch===ch.toUpperCase()?upper:lower;
        return pool[Math.floor(Math.random()*pool.length)];
      }).join('');
      if(++step>total){window.clearInterval(timer);timers.delete(label);label.textContent=original}
    },27);
    timers.set(label,timer);
  }

  document.querySelectorAll('.ml .nav-label[data-nav-scramble]').forEach(function(label){
    label.style.width=Math.ceil(label.getBoundingClientRect().width)+'px';
    var link=label.closest('a');
    if(!link)return;
    link.addEventListener('pointerenter',function(){scramble(label)});
    link.addEventListener('focus',function(){scramble(label)});
  });

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
