tail.writer
============

A light-weight and powerful GitHub Flavored Markdown editor for MooTools >= 1.4.5 and jQuery >= 1.8.0.

![Screenshot](https://raw.githubusercontent.com/pytesNET/tail.writer/master/Docs/tail.writer.png)

How to use
----------

The Syntax for MooTools and jQuery are the same:

    <script type="text/javascript">
        // MooTools Style
        window.addEvent("domready", function(){
            $("my-textarea").tailWriter({option: value})
            $$("my-textareas").tailWriter({option: value})
        });
        
        // jQuery Style
        jQuery(window).ready(function(){
            $("#my-textarea").tailWriter({option: value})
            $(".my-textareas").tailWriter({option: value})
        })
    </script>
	
Available Options
-----------------

-	`width` (string): Defines the width of the object and editor.
-	`height` (array): Defines the [min-height, max-height] of the editor.
-	`classes` (string|array): Adds additional class names to the tail.writer object.
-	`resize` (bool): True to enable the resize function, False to disable it.
-	`toolbar` (array): Defines the single action buttons (See below).
-	`indent_tab` (bool): True to use a single tab, False to use spaces.
-	`indent_size` (int): Defines the number of spaces, if indent_tab is false.
-	`action_header1` (bool): True to use "======", False to use a single "#".
-	`action_header2` (bool): True to use "------", False to use "##".
-	`action_bold` (string): The markdown token for bold (Default: "**").
-	`action_italic` (string): The markdown token for italic (Default: "_").
-	`tooltip_show` (bool): True to enable the action tooltips, False to disable it.
-	`statusbar_show` (bool): True to enable the statusbar, False to disable it.

Available Toolbar Buttons
-------------------------

**Valid GFM Actions (Direct Insert)**

-	`header-1`: Shown as `# `
-	`header-2`: Shown as `## `
-	`header-3`: Shown as `### `
-	`header-4`: Shown as `#### `
-	`header-5`: Shown as `##### `
-	`header-6`: Shown as `###### `
-	`bold`: Shown as `**`
-	`italic`: Shown as `_`
-	`strikethrough`: Shown as `~~`
-	`code-inline`: Shown as `` ` ``
-	`link`: Shown as `[Title](url)`
-	`image`: Shown as `![Title](url)`
-	`hr`: Shown as `-----`
-	`quote`: Shown as `>`
-	`code-block`: Shown as ` ``` ``` `
-	`list-unordered`: Shown as `-`
-	`list-ordered`: Shown as `1.`
-	`list-checked`: Shown as `- [x]`
-	`list-unchecked`: Shown as `- [ ]`


**Valid GFM Actions (Shown as Dropdown)**

-	`header`: Select a header between 1 - 6.
-	`header-x3`: Select a header between 1 - 3.
-	`table`: Enter the number of rows and columns.

**Valid GFM Actions (Shown as Dialog)**

-	`link-dialog`: Enter the url and title for the link.
-	`image-dialog`: Enter the url ajnd title for the image.
-	`table-dialog`: Enter the number of rows and columns.

**Special Actions**

-	`|`: Just a separator between the buttons.
-	`underline`: Shown as HTML "&lt;u&gt;&lt;/u&gt;".
-	`indent`: Just a replacement for the "Tab" -key.
-	`outdent`: Just a replacement for the "Shift+Tab" -key.
-	`preview`: Changes the textarea with a preview container.
