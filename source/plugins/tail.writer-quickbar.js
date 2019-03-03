/*
 |  tail.writer - A flexible and comfortable markup editor, written in vanilla JavaScript!
 |  @file       ./plugins/tail.writer-quickbar.js
 |  @author     SamBrishes <sam@pytes.net>
 |  @version    0.4.0 - Beta
 |
 |  @website    https://github.com/pytesNET/tail.writer
 |  @license    X11 / MIT License
 |  @copyright  Copyright © 2015 - 2019 SamBrishes, pytesNET <info@pytes.net>
 */
;(function(factory){
  if(typeof(define) == "function" && define.amd){
      define(function(){
          return function(writer){ factory(writer); };
      });
  } else {
      if(typeof(window.tail) != "undefined" && window.tail.writer){
          factory(window.tail.writer);
      }
  }
}(function(writer){
    "use strict";
    var w = window, d = window.document, tail = writer.__helper;


    return writer;
}));
