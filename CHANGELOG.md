Changelog
=========

Version 0.3.1 - Alpha
---------------------
-   Add: A German translation.
-   Add: A minified version, minified with [jsCompress](https://jscompress.com/).
-   Add: New helper methos `trigger` to trigger tail.DateTime specific CustomEvents.
-   BugFix: Wrong added line-break when the cursor is not at the end of the line. [#1](https://github.com/pytesNET/tail.writer/issues/1)

Version 0.3.0 - Alpha
---------------------
-   **Info: The new version is now written in Vanilla JS only, but with a jQuery and MooTools implementation.**
-   Add: Show the selected character / word / line character within the statusbar.
-   Add: CTRL + D (Duplicate a Line) and CTRL + X (~~Cut~~ Remove a Line) key-shortcuts.
-   Add: The tail helper methods: `hasClass()`, `addClass()`, `removeClass()`, `position()` and `animate()`.
-   Add: New `perform()` method, which replaces the `do_action()` method.
-   Add: The `tooltip` option allows now `top` and `bottom` to change the position.
-   Add: The "Table Header" option on the `table` markdown element.
-   Add: Configurable markdown elements.
-   Add: A callback option for the markdown elements.
-   Add: A (title) filter / hook option for the markdown elements.
-   Update: The Default / Dark / GitHub theme.
-   Update: Move the walker indicator to the markdown elements.
-   Update: Change the syntax / markup reference.
-   Update: Repeat the `inline` Syntax on multiple line breaks `\n\n` and mark the complete block.
-   Update: Relocate markdown parser method into `tailWriter.parse()`, outside of the prototype object.
-   Update: Relocate GFM markdown actions into the `tailWriter.actions`, outside of the prototype object.
-   Update: A complete new Render / Action Handling method / process.
-   Update: Marks the selected text after pressing a toolbar button on inline actions.
-   Update: The `tailWriter.extend` method is completely rewritten.
-   Update: The new base64 encoded SVG images replaces the additional icon font.
-   Rename: The option `indent_tab` into `indentTab`.
-   Rename: The option `indent_size` into `indentSize`.
-   Rename: The option `toolbar_pos` into `toolbarPosition`.
-   Rename: The option `tooltip_show` into `tooltip`.
-   Rename: The option `statusbar_show` into `statusbar`.
-   Remove: The option `action_header1` (Use the tail.writer.actions object instead).
-   Remove: The option `action_header2` (Use the tail.writer.actions object instead).
-   Remove: The option `action_bold` (Use the tail.writer.actions object instead).
-   Remove: The option `action_italic` (Use the tail.writer.actions object instead).
-   Remove: Separate jQuery and MooTools Edition / Version.
-   BugFix: Invalid Walker execution.
-   BugFix: Invalid Indent and Outdent Execution / TeamPlay.
-   BugFix: Text Selection and Replacing Bugs.
-   BugFix: Resize Error on init / build.

Version 0.2.0 - Alpha
---------------------
-   Add: A jQuery Version (1.8.0 - 3.2.0)
-   Add: Support for IE 9 - 11, Firefox, Opera and Vivaldi!
-   Add: New popup-kind dialogs.
-   Add: Small "fade" animation in dropdowns (142ms).
-   Add: Some some header variations: "header-{i}" and "header-x3".
-   Add: New help and info dialog option.
-   Add: A Preview mode and action (Requries [marked](https://github.com/chjj/marked)).
-   Add: Dialog actions for "table", "image" and "link".
-   Add: A new "GitHub" theme.
-   Add: Configurable bold and italic markups.
-   Add: Auto-Resize function.
-   Add: Translatable strings.
-   Add: Function to add custom actions.
-   Add: Tooltip (and tooltip_show option) on each Action button.
-   Add: Key listener for TAB (indent) and SHIFT + TAB (outdent) actions.
-   Update: Split "list-checkbox" into "list-checked" and "list-unchecked".
-   Update: Replace FontAwesome icons with [Octicons](https://octicons.github.com/).
-   Update: Dark and Light default themes.
-   Update: Class option can now be a string or an array.
-   Update: The class names and "data-" attribute.
-   Update: "height" option needs now to be an array.
-   Rename: "class" option has renamend into "classes".
-   Rename: "header1_block" and "header2_block" has renamed into "action_header{i}".
-   Rename: "indent_mode" has renamed into "indent_tab" and accepts now only boolean values.
-   Rename: "list-bullets" has renamed into "list-unordered".
-   Rename: "list-numeric" has renamed into "list-ordered".
-   Rename: Existing dialogs into dropdowns.
-   Remove: tailWriter_Object class (Merged with the main class).
-   BugFix: Check if dialog / dropdown is already open.
-   BugFix: Position of the dropdowns on a small editor field.
-   BugFix: Check if action exists.
-   BugFix: Too many line breaks on block elements.
-   BugFix: Auto-Insert function on walkable actions.

Version 0.1.0 - Alpha
---------------------
-	First Alpha Version
