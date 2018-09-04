tail.writer
============
> Version: 0.3.1 (Alpha)<br />
> License: X11 / MIT<br />
> Author: SamBrishes, pytesNET

A light-weight, powerful and Open Source GitHub Flavored Markdown editor, written in pure vanilla
JavaScript with a jQuery and a MooTools implementation.

[Demonstration](https://pytesNET.github.io/tail.writer/) |
[Browser Unit Text](https://github.com/pytesNET/tail.writer/BROWSERTEST.md)

Work in Progress
----------------
The script is still Work in Progress!

How to use
----------
```javascript
// Vanilla Edition
    document.addEventListener("DOMContentLoaded", function(){
        var options = { /* Your Options */ };

        // Just use an CSS Selector...
        tail.writer(".my-tail-editor", options);

        // ... or an Element
        tail.writer(document.getElementById("tail-editor"), options);
    });

// jQuery Edition
    jQuery(document).ready(function(){
        var options = { /* Your Options */ };

        // The known jQuery method
        jQuery(".my-tail-editor").tailWriter(options);
    });

// MooTools Edition
    window.addEvent("domready", function(){
        var options = { /* Your Options */ };

        // Single Selector
        $("my-textarea").tailWriter(options);

        // Multi Selector
        $$("my-textareas").tailWriter(options);
    });
```

Available Options
-----------------
```javascript
tailWriter.defaults = {
    width:            "100%",
    height:           ["200px", "500px"],
    classes:          "",
    resize:           true,
    indentTab:        false,
    indentSize:       4,
    toolbar:          [
        "headers", "|", "bold", "italic", "strikethrough", "|", "quote", "code",
        "codeblock", "indent", "outdent", "|", "link", "image", "table", "hr", "|",
        "list:unordered", "list:ordered", "|", "preview"
    ],
    tooltip:          "top",
    statusbar:        true
};
```
| Title         | Type          | Description |
| ------------- |:-------------:| ----------- |
| width         | ``string``    | Defines the width of the tail.writer container. |
| height        | ``array``     | Defines the height of the tail.writer container used as [minHeight, maxHeight]. The maxHeight parameter is used for the `resize` function. |
| classes       | ``string``    | Adds additional, custom class names to the tail.writer container element. |
| resize        | ``boolean``   | Set this to `true` to adapt the height of the textarea field to the content, limited to the `height` option. |
| indentTab     | ``boolean``   | Set this to `true` to use Tabs (`\t`) for indenting, and `false` to use spaces (depending on `indentSize`). |
| indentSize    | ``integer``   | Defines the number of spaces for each indent step, requires `indentTab: false`! |
| toolbar       | ``array``     | Defines the actions / buttons within the shown toolbar. |
| tooltip       | ``string``    | Defines the position of the action / button tooltip position (use `false` to disable the tooltips). |
| statusbar     | ``boolean``   | Set this to `true` to enable the statusbar, which shows meta informations / counter data. |


Available Toolbar Buttons
-------------------------
The new toolbar action API allows to set arguments after the action name, separated with a colon:
`<action_name>:<param1>[,<param2>]`. A concrete example of this shows the single header action:
`header:3`, which creates a toolbar action button which inserts a `### ` (aka `<h3></h3>`) markup.

### Header
```javascript
Action:     "header:<size>"
Markup:     "$1\n==========" | "$1\n----------" | "# $1"
Arguments:  <size:int>
```
Shows a single header action button, use a `size` between `1` and `6` (for `<h1>` ... `<h6>` respectively).

### Headers (Dropdown)
```javascript
Action:     "headers:<type>"
Markup:     "$1\n==========" | "$1\n----------" | "# $1"
Arguments:  <type:string>
```
Shows all or just 3 (use `"x3"` as `type` argument) header variants within a Dropdown field.

### Bold
```javascript
Action:     "bold"
Markup:     "**$1**"
Arguments:  null
```

### Italic
```javascript
Action:     "italic"
Markup:     "_$1_"
Arguments:  null
```

### Underline
```javascript
Action:     "underline"
Markup:     "<u>$1</u>"
Arguments:  null
```

### Strikethrough
```javascript
Action:     "strikethough"
Markup:     "~~$1~~"
Arguments:  null
```

### Inline Code
```javascript
Action:     "code"
Markup:     "`$1`"
Arguments:  null
```

### Horizontal Rule
```javascript
Action:     "hr"
Markup:     "----------"
Arguments:  null
```

### Pre Clode Block
```javascript
Action:     "codeblock"
Markup:     "```\n$1\n```"
Arguments:  null
```

### Blockquote
```javascript
Action:     "quote"
Markup:     ">\t$1"
Arguments:  null
```

### List
```javascript
Action:     "list:<type>"
Markup:     "-\t$1" | "1.\t$1" | "- [ ]\t$1" | "- [x]\t$1"
Arguments:  <type:string>
```
Creates a List use `"unordered"`, `"ordered"`, `"unchecked"` or `"checked"` as type argument to
configure the list.

### Link
```javascript
Action:     "link:<type>"
Markup:     "[$1](url)"
Arguments:  <type:string>
```
Creates a clickable Hyperlink, use `"dropdown"` or `"dialog"` as `type` argument to create a Dropdown
or Dialog box or use no argument to just insert the respective marup!

### Image
```javascript
Action:     "image:<type>"
Markup:     "![$1](url)"
Arguments:  <type:string>
```
Creates a Image Link / Embed, use `"dropdown"` or `"dialog"` as `type` argument to create a Dropdown
or Dialog box or use no argument to just insert the respective marup!

### Table
```javascript
Action:     "table:<type>"
Markup:     "![$1](url)"
Arguments:  <type:string>
```
Creates a Table Structure, use `"dropdown"` or `"dialog"` as `type` argument to create a Dropdown or
Dialog box.

### Indent
```javascript
Action:     "indent"
Markup:     "\t$1"
Arguments:  null
```

### Outdent
```javascript
Action:     "outdent"
Markup:     null
Arguments:  null
```

### Preview
```javascript
Action:     "preview"
Markup:     null
Arguments:  null
```
Parses the Markdown Markup content, requires [marked](https://github.com/markedjs/marked).
