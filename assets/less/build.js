/*
 |  tail.writer.demo - The official demonstration page for our tail.writer script!
 |  @file       ./less/build.less
 |  @author     SamBrishes <sam@pytes.net>
 |  @version    0.4.0 [0.4.0] - Alpha
 |
 |  @website    https://github.com/pytesNET/tail.writer
 |  @license    X11 / MIT License
 |  @copyright  Copyright © 2015 - 2019 SamBrishes, pytesNET <info@pytes.net>
 */
/*
 |  THIS IS A NODEJS SCRIPT TO COMPILE  ALL THE LESS
 |  FILES INTO TWO CSS FILES USING OUR CODING STYLES
 */
const file = require("fs");
const path = require("path");
const less = require("less");
const clean = require("clean-css");

/*
 |  PREPARE RENDERING
 */
version = "0.4.0"
render = `
@import "tail._variables.less";
@import "tail._mixins.less";
@import "tail.general.less";
@import "tail.design.less";
@import "tail.utilities.less";
@import "tail.responsive.less";
`;

/*
 |  START RENDERING
 */
opts = {
    sourceMap: {
        outputFilename: "tail.source.map"
    }
}
less.render(render, opts).then((data) => {
    let css = data.css, min;

    // Configure Output
    css = css.replace(/^([  ]+)([^ ])/gm, (string, space, item) => {
        return " ".repeat(space.length*2) + item;
    });
    css = css.replace(/((^[\*\.\:\#\[\w]+[^\n|{]*)(\,\n|))+(\{)/gm, (string, selectors) => {
        var _return = [], current = -1, count = 0;

        string.split("\n").forEach((item, num) => {
            if(num == 0){
                _return.push("");
                current++;
            }
            item = item.trim();

            if(_return[current].length + item.length > 100){
                if(_return[current].length == 0){
                    _return[current] = item;
                } else {
                    _return.push(item);
                    current++;
                }
                count = 0;
            } else {
                _return[current] = (_return[current] + " " + item).trim();
                count += item.length;
            }
        });
        return (_return.length > 0)? _return.join("\n"): string;
    });
    css = css.replace(/ {/gm, "{");
    css = css.replace(/\*\/\n\/\*/gmi, "\*\/\n\n\/\*");

    // Prepare Output
    css = `@charset "UTF-8";
/*
 |  tail.writer.demo - The official demonstration page for our tail.writer script!
 |  @file       ./css/tail.stylesheet.css
 |  @author     SamBrishes <sam@pytes.net>
 |  @version    ${version} [0.4.0] - Alpha
 |
 |  @website    https://github.com/pytesNET/tail.writer
 |  @license    X11 / MIT License
 |  @copyright  Copyright © 2015 - ${(new Date()).getFullYear()} pytesNET <info@pytes.net>
 */

${css}
/*# sourceMappingURL=tail.source.map */`;

    // Prepare Minified Output
    min = new clean().minify(data.css).styles;
    min = `@charset "UTF-8"; /* tail.writer.demo :: v.${version} */
/* @author SamBrishes <sam@pytes.net> | @github pytesNET/tail.writer | @license MIT */
${min}
/*# sourceMappingURL=tail.source.map */`;

    // Write Files
    file.writeFile("../css/tail.stylesheet.css", css, "utf8", (error) => {
        if(error){
            throw error;
        }
    });
    file.writeFile("../css/tail.stylesheet.min.css", min, "utf8", (error) => {
        if(error){
            throw error;
        }
    });
    file.writeFile("../css/tail.source.map", data.map, "utf8", (error) => {
        if(error){
            throw error;
        }
    });
}, (error) => {
    console.log(error);
});
