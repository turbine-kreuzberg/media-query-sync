'use strict';

/**
 * @param Event event
 * @param object params
 * @return Event
 */
var CustomEvent = function( event, params ) {
  params = params || { bubbles: false, cancelable: false, detail: undefined };
  var evt = document.createEvent( 'CustomEvent' );
  evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
  return evt;
};

window.CustomEvent = CustomEvent;