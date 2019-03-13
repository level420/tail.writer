/*
 |  tail.writer - A flexible and comfortable markup editor, written in vanilla JavaScript!
 |  @file       ./plugins/tail.writer-linenumbers.js
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

    writer.hook("init", "linenumbers", function(){
        var styles = w.getComputedStyle(this.e.editor), self = this;

        // Line Numbers
        this.e.lines = tail.create("DIV", "tail-writer-linenumbers");
        this.e.lines.style.height = this.e.editor.style.height;
        this.e.lines.style.fontSize = styles.fontSize;
        this.e.lines.style.lineHeight = styles.lineHeight;
        this.e.lines.style.fontFamily = styles.fontFamily;
        this.e.lines.style.paddingTop = styles.paddingTop;
        this.e.lines.style.paddingBottom = styles.paddingBottom;

        // Area
        this.e.linesarea = tail.create("DIV", "tail-writer-linesarea");
        Array.from(styles).forEach(function(key){
            self.e.linesarea.style.setProperty(key, styles.getPropertyValue(key));
        });
        this.e.linesarea.style.height = "auto";
        this.e.linesarea.style.minHeight = "auto";
        this.e.linesarea.style.maxHeight = "none";
        this.e.linesarea.style.zIndex = "-1";
        this.e.linesarea.style.position = "absolute";
        this.e.linesarea.style.visibility = "hidden";

        // Editor
        this.e.editor.style.paddingLeft = "45px";
        this.e.main.insertBefore(this.e.lines, this.e.editor);
        this.e.main.insertBefore(this.e.linesarea, this.e.editor);
    });

    writer.hook("update", "linenumbers", function(){

    });

    return writer;
}));
