/**
 * MediaQuerySync – a module to reuse CSS media queries in JavaScript
 *
 * @author    Thomas Heuer <thomas.heuer@votum.de>
 * @copyright Copyright (c) 2013 Votum media GmbH
 * @link      http://git.votum-media.net/vtm-frontend/media-query-sync/tree/master
 * based on:  http://davidwalsh.name/device-state-detection-css-media-queries-javascript
 */
( function( root, factory ) {
  if( typeof define === 'function' && define.amd ) {
    define( factory );
  } else {
    root.mediaQuerySync = factory();
  }
}( this, function( b ) {
  'use strict';

  var deviceState,
      lastDeviceState,
      deviceStateEvent,
      deviceStateMap = {
        1: 'xs',
        2: 'sm',
        3: 'md',
        4: 'lg',
        4: 'xl'
      };

  var deviceStateDetectionElement = document.createElement( 'div' );
  deviceStateDetectionElement.id = 'device-state-detection';
  document.body.appendChild( deviceStateDetectionElement );

  var syncMediaQuery = function() {
    var deviceStateIndex = parseInt( window.getComputedStyle( deviceStateDetectionElement ).getPropertyValue( 'z-index' ), 10 );
    if( typeof deviceStateMap[deviceStateIndex] === undefined ) {
      deviceState = deviceStateMap[1];
    }
    else {
      deviceState = deviceStateMap[deviceStateIndex];
    }

    if( deviceState !== lastDeviceState ) {
      lastDeviceState = deviceState;

      if( typeof deviceStateEvent !== 'undefined' ) {
        // trigger global event
        deviceStateEvent.deviceState = deviceState;
        window.dispatchEvent( deviceStateEvent );
      }
    }
  };

  /**
   * Setup an event listener for resize and fire the "deviceStateChanged"
   * event if another design breakpoint was reached.
   */
  deviceStateEvent = new CustomEvent( 'deviceStateChanged', { deviceState: 'xs' } );
  syncMediaQuery();
  window.addEventListener( 'resize', syncMediaQuery, false );

  return {
    /**
     * Return the current device state
     *
     * @returns {String} A named design breakpoint (either: 'xs', 'sm', 'md' or 'lg')
     */
    getDeviceState: function() {
      if( !deviceState ) {
        syncMediaQuery();
      }
      return deviceState;
    }

  };
} ) );
