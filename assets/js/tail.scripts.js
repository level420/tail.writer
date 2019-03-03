/*
 |  tail.writer.demo - The official demonstration page for our tail.writer script!
 |  @file       ./js/tail.scripts.js
 |  @author     SamBrishes <sam@pytes.net>
 |  @version    0.4.0 [0.4.0] - Alpha
 |
 |  @website    https://github.com/pytesNET/tail.writer
 |  @license    X11 / MIT License
 |  @copyright  Copyright © 2015 - 2019 SamBrishes, pytesNET <info@pytes.net>
 */
;(function(factory){
   if(typeof(define) == "function" && define.amd){
       define(function(){ return factory(window); });
   } else {
       document.addEventListener("DOMContentLoaded", function(){
           if(typeof(less) !== "undefined" && less.pageLoadFinished){
               less.pageLoadFinished.then(function(){
                   factory(window);
               })
           } else {
               factory(window);
           }
       });
   }
}(function(root){
	"use strict";
    var w = root, d = root.document;

    // Internal Helper Methods
    function cHAS(e, name){
        return (new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)")).test((e.className || ""));
    }
    function cADD(e, name){
        if(!(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)")).test(e.className || "")){
            e.className += " " + name;
        }
        return e;
    }
    function cREM(e, name, regex){
        if((regex = new RegExp("(?:^|\\s+)(" + name + ")(?:\\s+|$)")) && regex.test(e.className || "")){
            e.className = e.className.replace(regex, "");
        }
        return e;
    }
    function each(el, cb, end_cb){
        if(typeof(cb) !== "function"){
            return false;
        }
        if(el && el instanceof Element){
            cb.call(el, el, 1);
        } else if(el && el.length){
            for(var l = el.length, i = 0; i < l; i++){
                cb.call(el[i], el[i], (i+1));
            }
        }
        if(typeof(end_cb) == "function"){
            end_cb.call(el, el);
        }
        return true;
    }

    /*
     |  THEME :: SCROLL HEADER
     |  @since  0.4.0
     */
    var header = d.querySelector(".header");
    if(header){
        w.onscroll = function(){
            if(d.body.scrollTop > 600 || d.documentElement.scrollTop > 600){
                cADD(header, "show");
            } else if(cHAS(header, "show")){
                cREM(header, "show");
            }
        };
    }

    /*
     |  THEME :: TOOLTIPS
     |  @since  0.4.0
    */
    var toolID = 0, tooltip = function(ev){
        var _in = this.getAttribute("data-event-in") || "mouseenter";
        var _out = this.getAttribute("data-event-out") || "mouseleave";
        var action = (_in == _out)? !this.hasAttribute("data-tooltip-id"): (ev.type == _in);

        // Show Tooltip
        if(action){
            var config = {
                color: "white",
                position: "top",
                animation: "blank",
                classNames: ""
            }, tip, pos;

            if(!this.hasAttribute("data-tooltip-id")){
                if(this.hasAttribute("data-tooltip-config")){
                    this.getAttribute("data-tooltip-config").split(",").forEach(function(item){
                        if(["white", "black", "red", "orange", "green", "blue", "violet"].indexOf(item) >= 0){
                            config.color = item;
                        } else if(["top", "left", "right", "bottom"].indexOf(item) >= 0){
                            config.position = item;
                        } else if(["blank", "fade", "ease-in", "ease-out"].indexOf(item) >= 0){
                            config.animation = item;
                        } else {
                            config.classNames += " " + item;
                        }
                    });
                }
                tip = document.createElement("DIV");
                tip.id = "tooltip-" + ++toolID;
                tip.innerHTML = this.getAttribute("data-tooltip");
                tip.className = "tooltip tooltip-" + config.color + " tooltip-" + config.position + " "
                              + "tooltip-" + config.animation + config.classNames;
                document.body.appendChild(tip);

                pos = function(element){
                    var position = {
                        top:    element.offsetTop    || 0,
                        left:   element.offsetLeft   || 0,
                        width:  element.offsetWidth  || 0,
                        height: element.offsetHeight || 0
                    };
                    while(element = element.offsetParent){
                        position.top  += element.offsetTop;
                        position.left += element.offsetLeft;
                    }
                    return position;
                }(this);
                switch(config.position){
                    case "left":
                        tip.style.top = (pos.top + (pos.height/2) - (tip.offsetHeight/2)) + "px";
                        tip.style.left = (pos.left - tip.offsetWidth - 10) + "px";
                        break;
                    case "right":
                        tip.style.top = (pos.top + (pos.height/2) - (tip.offsetHeight/2)) + "px";
                        tip.style.left = (pos.left + pos.width + 10) + "px";
                        break;
                    case "bottom":
                        tip.style.top = (pos.top + pos.height + 10) + "px";
                        tip.style.left = (pos.left + (pos.width / 2) - (tip.offsetWidth / 2)) + "px";
                        break;
                    default:
                        tip.style.top = (pos.top - tip.offsetHeight - 10) + "px";
                        tip.style.left = (pos.left + (pos.width / 2) - (tip.offsetWidth / 2)) + "px";
                        break;
                }
                this.setAttribute("data-tooltip-id", "tooltip-" + toolID);
            }
            (function(id){
                setTimeout(function(){ document.querySelector("#" + id).className += " show" }, 25);
            }(this.getAttribute("data-tooltip-id")));
            return;
        }

        // Hide Tooltip
        var tip = document.querySelector("#" + this.getAttribute("data-tooltip-id"));
        tip.className = tip.className.replace(/(?:^|\s+)(show)(?:\s+|$)/, "");
        this.removeAttribute("data-tooltip-id");
        (function(e){
            setTimeout(function(){ e.parentElement.removeChild(e); }, 200);
        })(tip);
        return;
    };

    // Init
    each(d.querySelectorAll("abbr[title],acronym[title],dfn[title]"), function(item){
        this.setAttribute("data-tooltip", this.getAttribute("title"));
        this.setAttribute("data-tooltip-config", "black,ease-in");
        this.removeAttribute("title");
    });
    each(d.querySelectorAll("[data-tooltip]"), function(item){
        item.addEventListener(item.getAttribute("data-event-in") || "mouseenter", tooltip);
        item.addEventListener(item.getAttribute("data-event-out") || "mouseleave", tooltip);
    });
}));
