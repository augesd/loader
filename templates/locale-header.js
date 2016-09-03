;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../auge-loader')) :
   typeof define === 'function' && define.amd ? define(['../auge-loader'], factory) :
   factory(global.augeLoader)
}(this, function (loader) { 'use strict';
