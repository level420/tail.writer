/*
 |  tail.writer.demo - The official demonstration page for our tail.writer script!
 |  @file       ./js/main.js
 |  @author     SamBrishes <sam@pytes.net>
 |  @version    0.4.0 [0.4.0] - Alpha
 |
 |  @website    https://github.com/pytesNET/tail.writer
 |  @license    X11 / MIT License
 |  @copyright  Copyright © 2015 - 2019 SamBrishes, pytesNET <info@pytes.net>
 */
;(function(factory){
    if(typeof(require) == "function"){
        require(["prism.min", "menuspy.min", "tail.scripts", "source/tail.writer"], function(){
            return factory(this);
        });
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
     |  SHOWCASE DEMONSTRATION
     */
    var writerShow = tail.writer("#showcase-example", {
        height: ["340px", "340px"],
        tooltip: "top",
        toolbar: "minimal"
    });

    /*
     |  MAIN DEMONSTRATION
     */
    var writerMain = tail.writer("#main-example", {
        height: ["350px", "850px"],
        markup: "markdown",
        toolbar: "default"
    });

    /*
     |  HANDLE SETTINGS
     */
    var config = {};
    if(w.location.hash.length > 0 && w.location.hash.indexOf("#!") === 0){
        var split = w.location.hash.substr(2).split("&");
        for(var l = split.length, i = 0; i < l; i++){
            var value = split[i].split("=");
            config[value[0]] = value[1];
        }
    }

    // Main Form
    var form = d.querySelector("form[action='demo']");
    form.addEventListener("submit", function(event){
        event.preventDefault();
    });

    // Buttons
    each(form.querySelectorAll("button"), function(){
        this.addEventListener("click", function(event){
            event.preventDefault();
            writerMain.config(this.getAttribute("name"), this.getAttribute("value"), true);

            cREM(this.parentElement.parentElement.querySelector(".active"), "active");
            cADD(this.parentElement, "active");
        });
    });

    // Select & Input
    each(form.querySelectorAll("select,input"), function(){
        this.addEventListener("input", function(event){
            event.preventDefault();

            if(this.name === "theme"){
                if(typeof(less) !== "undefined"){
                    var url = "source/less/tail.writer-" + this.value + ".less";
                    var link = d.querySelector("link#writer-theme");

                    d.head.removeChild(link.nextElementSibling);    // Remove Less Style Element
                    link.setAttribute("href", url);                 // Replace HREF
                    less.refresh();
                } else {
                    var url = "source/css/tail.writer-" + this.value + ".css";
                    var link = d.querySelector("link#writer-theme");
                        link.setAttribute("href", url);
                }

                var main = document.getElementById("main-demo");
                if(this.value === "dark" && !cHAS(main, "black-demo")){
                    cADD(main, "black-demo");
                } else if(this.value !== "dark" && cHAS(main, "black-demo")){
                    cREM(main, "black-demo");
                }
                return false;
            }
            writerMain.config(this.getAttribute("name"), this.value, true);
        });

        // PreSelect Select
        if(this.tagName == "SELECT"){
            var name = this.getAttribute("name"), opt = false;
            if(name in config){
                opt = this.querySelector("option[value='" + config[name] + "']");
            }
            (opt || this.children[0]).selected = true;
            writerMain.config(name, this.value, true);
        }
    });
}));
