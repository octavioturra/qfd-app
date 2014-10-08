(function(document) {
  'use strict';

  var app = {
    title: 'Untitled',
    author: 'Anonimous',
    description:'',
    requirements:{},
    relations:{}
  }

  document.addEventListener('polymer-ready', function() {
    _(document.querySelectorAll('.bind')).each(function(el){
      el.bind('value', new PathObserver(app, el.getAttribute('name')));
    });
    document.querySelector('#title').bind('textContent', new PathObserver(app, 'title'));
  });
})(wrap(document));
