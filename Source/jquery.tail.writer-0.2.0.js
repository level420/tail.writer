/*
---
description: A light-weight and powerful GitHub flavored markdown editor.
license: MIT-style
authors: [SamBrishes]
version: 0.2.0-alpha
requires:
-	jquery/1.8.0: '*'
provides: [$.tailWriter]
...
*/
(function($){
	"use strict";
	
	var $ = jQuery;
	
	/*
	 |	TAIL.WRITER CONSTRUCTOR
	 |	@since	0.2.0
	 */
	var tailWriter = function(element, config){
		if(element.length == undefined || element.length == 0){
			return false;
		} else if(element.length > 1){
			var _return = new Array();
			for(var i = 0; i < element.length; i++){
				_return.push(new tailWriter($(element).eq(i)));
			}
			return _return;
		}
		
		// Check 4 existing instance
		if(element.attr("data-writer-editor") !== undefined){
			return tailWriter.instances[element.attr("data-writer-editor")];
		}
		config = tailWriter.config(config);
		
		// Core Data
		this.e = {
			"container":	"",
			"editor": 		element,
			"toolbar":		"",
			"statusbar":	""
		};
		this.id = tailWriter.counter;
		this.con = config;
		
		// Set Config
		if(config.action_header1){
			this.A["header-1"][1] = "";
			this.A["header-1"][2] = "\n==========";
		}
		if(config.action_header2){
			this.A["header-2"][1] = "";
			this.A["header-2"][2] = "\n----------";
		}
		this.A.bold[1] 	 = config.action_bold;
		this.A.italic[1] = config.action_italic;
		
		// Build and Return
		tailWriter.counter++;
		tailWriter.instances[this.id] = this.build();
		return tailWriter.instances[this.id];
	}
	tailWriter.counter = 0;
	tailWriter.instances = {};
	
	/*
	 |	HTML < 5 FIX PLACEHOLDER
	 |	@since	0.2.0
	 */
	tailWriter.placeholder = document.createElement("input");
	tailWriter.placeholder = ("placeholder" in tailWriter.placeholder);
	
	/*
	 |	TAIL.WRITER DEFAULTS
	 |	@since	0.2.0
	 */
	tailWriter.defaults = {
		"width":			"100%",
		"height":			["auto", "500px"],
		"classes":			"",
		"resize":			true,
		"toolbar":			["header", "|", "bold", "italic", "strikethrough", "|", "quote", 
							"code-inline", "code-block", "indent", "outdent", "|", "link", 
							"image", "table", "hr", "|", "list-unordered", "list-ordered", "|", "preview"],
		"toolbar_pos":		"top",
		"indent_tab":		true,
		"indent_size":		4,
		"action_header1":	true,
		"action_header2":	true,
		"action_bold":		"**",
		"action_italic":	"_",
		"tooltip_show":		true,
		"statusbar_show":	true
	}
	
	/*
	 |	TAIL.WRITER CONFIGURATION
	 |	@since	0.2.0
	 */
	tailWriter.config = function(options){
		var config = jQuery.extend({}, tailWriter.defaults);
		
		// Merge Options
		if(jQuery.type(options) === "object"){
			for(var key in options){
				if(!config.hasOwnProperty(key)){
					continue;
				}
				if(key === "classes" && jQuery.type(options[key]) == "array"){
					options[key] = options[key].join(" ");
				}
				if(jQuery.type(config[key]) == jQuery.type(options[key])){
					config[key] = options[key];
				}
			}
		}
		return config;
	}
	
	/*
	 |	TAIL.WRITER STRINGS
	 |	@since	0.2.0
	 */
	tailWriter.strings = {
		"bold":				"Bold",
		"italic":			"Italic",
		"underline":		"Underline",
		"strikethrough":	"Strikethrough",
		"code-inline":		"Code",
		"link":				"Link",
		"image":			"Image",
		"hr":				"Horizontal Rule",
		"quote":			"Quote",
		"indent":			"Indent",
		"outdent":			"Outdent",
		"header":			"Header",
		"code-block":		"Code Block",
		"list-unordered":	"Unordered List",
		"list-ordered":		"Ordered List",
		"list-checked":		"Checked List Item",
		"list-unchecked":	"Unchecked List Item",
		"table":			"Table",
		"table-rows":		"Rows",
		"table-cols":		"Columns",
		"table-create":		"Create Table",
		"line-counter":		"Lines",
		"char-counter":		"Characters",
		"word-counter":		"Words",
		"link-title":		"Link Title",
		"link-url":			"Link URL",
		"link-create":		"Add Link",
		"image-title":		"Image Title",
		"image-url":		"Image URL",
		"image-create":		"Add Image",
		"preview":			"Preview Mode",
		"preview-empty":	"Nothing to preview!",
		"editor":			"Exit Preview Mode"
	}
	
	/*
	 |	EXTEND TAIL.WRITER ACTIONs
	 |	@since	0.2.0
	 */
	tailWriter.extend = function(action, type, handle, walkable){
		if($.inArray(type, ["inline", "block", "callback"]) === -1){
			return false;
		}
		if(tailWriter.prototype.A.hasOwnProperty(action)){
			return false;
		}
		if(type === "callback"){
			if(jQuery.type(handle) !== "function"){
				return false;
			}
			handle = ["callback", handle];
		} else {
			if(jQuery.type(handle) !== "array"){
				handle = [type, handle];
			} else {
				handle.unshift(type);
			}
		}
		if(walkable === true){
			tailWriter.prototype.WALKER.push(action);
		}
		tailWriter.prototype.A[action] = handle;
		return true;
	}
	
	/*
	 |	TAIL.WRITER CLASS
	 |	@since	0.2.0
	 */
	tailWriter.prototype = {
		/*
		 |	GENERAL VARs
		 */
		A:				{
			"|":				undefined,
			"bold":				["inline", "**"],
			"italic":			["inline", "_"],
			"underline":		["inline", "<u>", "</u>"],
			"strikethrough":	["inline", "~~"],
			"code-inline":		["inline", "`"],
			"link":				["inline", "[", "](url)"],
			"image":			["inline", "![", "](url)"],
			"hr":				["inline", "\n----------\n", ""],
			
			"quote":			["block", ">\t"],
			"indent":			["block", "\t"],
			"header-1":			["block", "# "],
			"header-2":			["block", "## "],
			"header-3":			["block", "### "],
			"header-4":			["block", "#### "],
			"header-5":			["block", "##### "],
			"header-6":			["block", "###### "],
			"code-block":		["block", "```\n", "\n```"],
			"list-unordered":	["block", "-\t"],
			"list-ordered":		["block", "1.\t"],
			"list-checked":		["block", "- [x]\t"],
			"list-unchecked":	["block", "- [ ]\t"],
			
			"header":			["header"],
			"header-x3":		["header"],
			"outdent":			["outdent"],
			"table":			["table"],
			"table-dialog":		["table"],
			"image-dialog":		["img_url"],
			"link-dialog":		["img_url"],
			"preview":			["preview"]
		},
		TAB:			9,
		ENTER:			13,
		SHIFT:			16,
		WALKER:			[
			"quote", "indent", "list-unordered", "list-ordered", "list-checked", "list-unchecked"
		],
		
		/*
		 |	INSTANCE VARs
		 */
		e:				{},
		id:				0,
		con:			{},
		
		/*
		 |	CURRENT VARs
		 */
		val:  			"",
		walk:			false,
		lines:			{},
		indent:			0,
		dialogs:		[],
		dropdowns:		[],
		lastStatus:		"",
		
		/*
		 |	TRANSLATE STRINGS
		 |	0.2.0
		 */
		__:				function(key){
			if(tailWriter.strings.hasOwnProperty(key)){
				return tailWriter.strings[key];
			}
			return key;
		},
		
		/*
		 |	INSTANCE :: BUILD EDITOR
		 |	@since	0.2.0
		 */
		build: 			function(){
			var self = this;
			this.read();
			
			// Editor Container
			this.e.editor.wrapAll($("<div></div>", {
				"class":		"tail-writer-object",
				"data-writer":	this.id,
				"css":			{"width": this.con.width}
			}).addClass(this.con.classes));
			this.e.container = this.e.editor.parent();
			
			// Create Toolbar
			this.e.toolbar = $("<div></div>", {
				"class":				"tail-writer-toolbar tail-writer-toolbar-" + this.con.toolbar_pos,
				"data-writer-toolbar": 	this.con.toolbar_pos
			}).insertBefore(this.e.editor);
			
			for(var i = 0; i < this.con.toolbar.length; i++){
				if(!this.A.hasOwnProperty(this.con.toolbar[i])){
					continue;
				}
				if(this.con.toolbar[i] === "|"){
					$("<span></span>", {"class": "tail-writer-sep"}).appendTo(this.e.toolbar);
				} else {
					var string = this.con.toolbar[i];
					if(string.indexOf("header") == 0){
						string = "header";
					} else if(string.indexOf("dialog") !== -1){
						string = string.replace("-dialog", "");
					}
					
					// Create Button
					var actionButton = $("<button></button>", {
						"class":				"tail-writer-button icon-" + this.con.toolbar[i],
						"data-writer-title":	this.__(string),
						"data-writer-action":	this.con.toolbar[i]
					}).on("click", function(event){
						event.preventDefault();
						if($(event.target).hasClass("tail-writer-button")){
							var removed = self.hideDropdown();
							if($.inArray($(this).attr("data-writer-action"), removed) == -1){
								self.do_action($(this).attr("data-writer-action"));
							}
						}
					})
					
					// Add Tooltip
					if(this.con.tooltip_show){
						actionButton.on("mouseover mouseout", function(event){
							self.tooltip.apply(self, [event, this]);
						});
					}
					actionButton.appendTo(this.e.toolbar);
				}
			};
			
			// Create Statusbar
			if(this.con.statusbar_show){
				this.e.statusbar = $("<div></div>", {
					"class": "tail-writer-statusbar"
				}).append([
					$("<div></div>", {"text": this.__("line-counter")+": ", "class": "tail-writer-lines"})
						.append($("<span></span>", {"class": "tail-writer-count"})),
					$("<div></div>", {"text": this.__("char-counter")+": ", "class": "tail-writer-chars"})
						.append($("<span></span>", {"class": "tail-writer-count"})),
					$("<div></div>", {"text": this.__("word-counter")+": ", "class": "tail-writer-words"})
						.append($("<span></span>", {"class": "tail-writer-count"}))
				]).insertAfter(this.e.editor);
				this.statusbar();
			}
			
			// Editor Field
			this.e.editor.attr("data-writer-editor", this.id);
			if(this.con.indent_tab){
				 // !? jQuery 3.1.1 handles "tab-size" as px :(
				this.e.editor.attr("style", "tab-size: " + this.con.indent_size + ";");
			}
			if(!isNaN(parseInt(this.con.height[0]))){
				var height = parseInt(this.con.height[0]);
			} else {
				var height = parseInt(this.e.container.outerHeight());
				if(height < 200){
					height = 200;
				}
			}
			this.e.editor.css("height", height + "px");
			this.e.editor.css("min-height", height + "px");
			if(parseInt(this.con.height[1]) != NaN){
				this.e.editor.css("max-height", this.con.height[1]);
			}
			this.e.editor.css("width", this.con.width).addClass("tail-writer-editor");
			this.e.editor.on("click input change keydown keyup", function(event){
				self.handle.apply(self, [event]);
			});
			if(this.con.resize){
				this.resize(false);
			}
			return this;
		},
		
		/*
		 |	HANDLE :: EDITOR
		 |	@since	0.2.0
		 */
		handle:			function(event){
			var self = this;
				this.read();
			
			// On Click
			if(event.type == "click"){
				this.hideDropdown();
			}
			
			// Listen for Keys
			if(event.type === "keydown"){
				if(event.keyCode == this.TAB){
					event.preventDefault();
					
					if(event.shiftKey){
						return this.do_action("outdent");
					} else {
						if(this.walkable(this.lines.previous)){
							this.indent = this.indenter(this.lines.current, "count") + 1;
							return this.writeLine("\t", "before");
						}
						return this.do_action("indent");
					}
				}
				if(event.keyCode == this.ENTER){
					event.preventDefault();
					if(this.walkable(this.lines.current)){
						return this.do_action(this.walk);
					}
					this.writeLine(this.indenter("\n", "create"));
				}
			}
			
			// Modify Content
			if(this.con.resize){
				this.resize(true);
			}
			if(this.con.statusbar_show){
				this.statusbar();
			}
		},
		
		/*
		 |	HANDLE :: TOOLTIPs
		 |	@since	0.2.0
		 */
		tooltip:		function(event, element){
			var button 	 = $(event.target),
				position = button.position(),
				_class	 = "tail-writer-tooltip-" + button.attr("data-writer-action");
			
			if(!button.parent().hasClass("tail-writer-toolbar")){
				return;
			}
			if(event.type == "mouseover"){
				if(button.hasClass("disabled")){
					return;
				}
				if(this.e.container.find("." + _class).length == 0){
					var tooltip = $("<div></div>", {
						"text":		button.attr("data-writer-title"),
						"class":	"tail-writer-tooltip " + _class,
						"css":	{
							"top":		0,
							"left":		position.left + "px",
							"opacity":	0,
							"position":	"absolute"
						}
					}).prependTo(this.e.container);
					var calc = parseInt(this.e.toolbar.css("left"))+parseInt(this.e.toolbar.css("right"));
					
					tooltip.css({
						"left":	(Math.round(position.left+(calc/2)) + Math.round(button.outerWidth())/2) - (Math.round(tooltip.outerWidth())/2) + "px"
					}).fadeTo(82, 1.0);
				}
			} else {
				var elements = this.e.container.find("." + _class);
				if(elements.length > 0){
					for(var i = 0; i < elements.length; i++){
						elements.eq(i).fadeTo(82, 0.0, function(){
							$(this).remove();
						});
					}
				}
			}
		},
		
		/*
		 |	HANDLE :: RESIZE
		 |	@since	0.2.0
		 */
		resize:			function(scroll){
			var clone   = this.e.editor.clone(),
				padding = parseInt(this.e.editor.css("paddingTop")) + parseInt(this.e.editor.css("paddingBottom"));
			
			// Clone Element
			clone.css({
				"height":	"auto",
				"opacity":	"0",
				"position":	"absolute"
			}).insertAfter(this.e.editor);
			
			// Get Data
			var _toTop = clone[0].scrollTop,
				height = clone[0].scrollHeight;
			clone.remove();
			
			// Compare
			this.e.editor.height((height-padding) + "px");
			if(scroll == true && this.e.editor.val().length - this.selection()[0] <= 3){
				this.e.editor[0].scrollTop = (height-padding);
			}
		},
		
		/*
		 |	HANDLE :: STATUSBAR
		 |	@since	0.2.0
		 */
		statusbar:		function(action){
			var chars = this.val.length, lines = (this.val.match(/\n/g)||[]).length;
			if(chars > 0){
				chars = chars-lines; lines++; 
			}
			this.e.statusbar.find(".tail-writer-lines span").text(lines.toString());
			this.e.statusbar.find(".tail-writer-chars span").text(chars.toString());
			
			var words = this.val;
				words = words.trim().replace(/[\n\t\.]/g, " ").trim();
				words = words.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s\s+/g, " ").split(" ");
			if(words.length <= 1 && words[0].length == 0){
				words = 0;
			} else {
				words = words.length;
			}
			this.e.statusbar.find(".tail-writer-words span").text(words.toString());
		},
		
		/*
		 |	HELPER :: (G|S)ET SELECTION
		 |	@since	0.2.0
		 */
		selection:		function(start, end){
			if(start == undefined){
				return [this.e.editor[0].selectionStart, this.e.editor[0].selectionEnd];
			} else if(jQuery.type(start) !== "number"){
				start = this.val.length;
			}
			if(end == undefined){
				end = start;
			}
			this.e.editor.focus();
			this.e.editor[0].selectionStart = start;
			this.e.editor[0].selectionEnd = end;
			return true;
		},
		
		/*
		 |	HELPER :: INDENTER
		 |	@since	0.2.0
		 */
		indenter:		function(string, action){
			if(this.con.indent_tab){
				var indent = "\t";
			} else {
				if(parseInt(this.con.indent_size) <= 0){
					this.con.indent_size = 4;
				}
				var indent = Array(this.con.indent_size + 1).join(" ");
			}
			
			// Count
			if(action === "count"){
				var temp	= string.replace(".", ""),
					rexp	= new RegExp(indent, "gi");
					temp	= temp.replace(rexp, ".").split(/([^\.])/);
				if(typeof(temp) == "object" && temp.length > 0){
					return temp[0].length;
				}
				return 0;
			}
			
			// Create
			if(action === "create"){
				var lines = string.split("\n");
				for(var i = 0; i < lines.length; i++){
					if(i === 0){
						continue;
					}
					lines[i] = Array((this.indent + 1)).join("\t") + lines[i];
				}
				string = lines.join("\n");
			}
			
			// Replace
			if(!this.con.indent_tab){
				string = string.replace(/\t/g, indent);
			}
			return string;
		},
		
		/*
		 |	HELPER :: CHECK FOR AN WALKABLE CONTINUE
		 |	@since	0.2.0
		 */
		walkable:		function(string){
			if(string == undefined){
				this.walk = false;
				return false;
			}
			var c = string.replace(/^\s+/g, "");
			
			// Check Lines
			for(var action, remove, i = 0; i < this.WALKER.length; i++){
				action = this.A[this.WALKER[i]];
				
				if(c.indexOf(action[1]) == 0){
					if(c.length > action[1].length){
						this.walk = this.WALKER[i];
					} else {
						remove = this.WALKER[i];
					}
				}
			}
			if(this.walk == false || this.walk.length == 0){
				if(remove !== undefined){
					this.writeLine("", "replace");
				}
				this.walk = false;
				return false;
			}
			return true;
		},
		
		/*
		 |	CORE :: READ CONTENT
		 |	@since	0.2.0
		 */
		read:			function(){
			this.val = this.indenter(this.e.editor.val());
			
			// Split Content
			var sel	= this.selection(),
				__p = this.val.slice(0, sel[0]).split("\n"),
				__n = this.val.slice(sel[0], this.val.length).split("\n");
			
			// Get Lines
			this.walk = false;
			this.lines = {
				"current":	__p.pop() + __n.shift(),
				"previous":	(__p.length > 0)? __p.pop(): undefined,
				"next":		(__n.length > 0)? __n.shift(): undefined,
			};
			this.indent = this.indenter(this.lines.current, "count");
		},
		
		/*
		 |	CORE :: WRITE CONTENT
		 |	@since	0.2.0
		 |
		 |	@param	string	The complete new editor content.
		 |	@param	multi	The selection as single int or as array.
		 */
		write:			function(content, selection){
			this.e.editor.val(content);
			
			if(selection !== undefined){
				if(jQuery.type(selection) === "array"){
					this.selection(selection[0], selection[1]);
				} else if(jQuery.type(selection) === "number"){
					this.selection(selection[0]);
				}
			}
			this.read();
		},
		
		/*
		 |	CORE :: WRITE LINE
		 |	@since	0.2.0
		 |
		 |	@param	string	The line, which you want to add / replace.
		 |	@param	string	The respective action (or undefined to use "after").
		 |					-	"replace":	Replaces the current line.
		 |					-	"before": Add before the current line.
		 -					-	"after": Add after the current lint.
		 */
		writeLine:		function(line, handle){
			var sel	= this.selection(),
				__p = this.val.slice(0, sel[0]).split("\n"),
				__n = this.val.slice(sel[0], this.val.length).split("\n"),
				__c = __p.pop() + __n.shift();
				
				__p = ((__p.length > 0)? __p.join("\n") + "\n": "");
				__n = ((__n.length > 0)? "\n" + __n.join("\n"): "");
			
			if(handle == "replace"){
				this.e.editor.val(__p + line + __n);
				this.selection(__p.length + line.length);
			} else if(handle == "before"){
				this.e.editor.val(__p + line + __c + __n);
				this.selection(__p.length + line.length + __c.split("\n")[0].length);
			} else {
				this.e.editor.val(__p + __c + line + __n);
				this.selection(__p.length + line.length + __c.length);
			}
			this.read();
		},
		
		/*
		 |	CORE :: SHOW DROPDOWN
		 |	@since	0.2.0
		 */
		showDropdown:	function(type, content){
			var action	= this.e.toolbar.find("[data-writer-action='" + type + "']");
			if(action.hasClass("disabled")){
				return;
			}
			
			// Create Dropdown
			var dropdown = $("<div></div>", {
				"class":	"tail-writer-dropdown tail-writer-dropdown-" + type,
				css:		{
					"top":			this.e.toolbar.outerHeight(),
					"left":			"-2px",
					"opacity":		"0.0",
					"min-width":	"100px",
					"position":		"absolute"
				}
			});
			dropdown = content.apply(this, [dropdown, action]);
			dropdown.attr("data-writer-dropdown", type).prependTo(this.e.container)
			
			// Positionate Dropdown
			var left  = (action.offset().left) - this.e.container.offset().left;
				left -= parseInt(action.css("border-left-width"));
			dropdown.css("top", action.outerHeight()).css("left", left);
			dropdown.fadeTo(142, 1.0);
			this.dropdowns.push(dropdown);
		},
		
		/*
		 |	CORE :: HIDE DROPDOWN
		 |	@since	0.2.0
		 */
		hideDropdown:	function(){
			var removed = new Array();
			
			if(this.dropdowns.length > 0){
				for(var i = 0; i < this.dropdowns.length; i++){
					removed.push(this.dropdowns[i].attr("data-writer-dropdown"));
					this.dropdowns[i].fadeTo(142, 0.0, function(){
						$(this).remove();
					});
				}
			}
			this.dropdowns = [];
			return removed;
		},
		
		/*
		 |	CORE :: SHOW DIALOG
		 |	@since	0.2.0
		 */
		showDialog:		function(type, content){
			var self = this,
				action	= this.e.toolbar.find("[data-writer-action='" + type + "']");
			if(action.hasClass("disabled")){
				return;
			}
			
			// Create Mask
			var mask = $("<div></div>", {
				"class":	"tail-writer-mask",
				css:		{
					"top":		0,
					"left":		0,
					"right":	0,
					"bottom":	0,
					"opacity":	0,
					"position":	"absolute"
				}
			}).click(function(event){
				self.hideDialog();
			});
			mask.prependTo(this.e.container).fadeTo(142, 1.0);
			
			// Create Dialog
			var dialog = $("<div></div>", {
				"class":	"tail-writer-dialog tail-writer-dialog-" + type,
				css:		{
					"display":	"block",
					"opacity":	0,
					"position":	"absolute"
				}
			});
			dialog = content.apply(this, [dialog, type]);
			dialog.prependTo(this.e.container);
			
			// Format Dialog
			dialog.css({
				"top":		this.e.container.outerHeight()/2 - dialog.outerHeight()/2 + "px",
				"left":		this.e.container.outerWidth()/2 - dialog.outerWidth()/2 + "px"
			}).fadeTo(142, 1.0);
			this.dialogs.push(dialog);
		},
		
		/*
		 |	CORE :: HIDE DIALOG
		 |	@since	0.2.0
		 */
		hideDialog:		function(){
			if(this.dialogs.length > 0){
				for(var i = 0; i < this.dialogs.length; i++){
					this.dialogs[i].fadeTo(142, 0.0, function(){
						$(this).remove();
					});
				}
			}
			this.dialogs = [];
			this.e.container.find(".tail-writer-mask").fadeTo(142, 0.0, function(){
				$(this).remove();
			});
		},
		
		/*
		 |	CORE :: REMOVE TAIL.WRITER
		 |	@since	0.2.0
		 */
		remove:			function(){
			this.e.toolbar.remove();
			this.e.statusbar.remove();
			this.e.container.find("textarea").removeAttr("data-writer-editor");
			this.e.container.find("textarea").removeClass("tail-writer-editor");
			this.e.container.children().unwrap();
			this.e.container.remove();
			return true;
		},
		
		/*
		 |	ACTION :: ASSIGN TYPE TO METHOD
		 |	@since	0.2.0
		 */
		do_action:		function(type){
			if(!this.A.hasOwnProperty(type)){
				return false;
			}
			var action 	 = $.merge([], this.A[type]),
				callback = action.shift();
				action.unshift(type);
			
			// Call Function
			if(jQuery.type(this["do_" + callback]) == "function"){
				this["do_" + callback].apply(this, action);
				return true;
			}
			return false;
		},
		
		/*
		 |	ACTION :: CALLBACK ACTIONS
		 |	@since	0.2.0
		 */
		do_callback:	function(action, callback){
			callback.apply(this, [action, callback]);
		},
		
		/*
		 |	ACTION :: INLINE ACTIONs
		 |	@since	0.2.0
		 */
		do_inline:		function(action, before, after){
			var sel	= this.selection(),
				__1 = this.val.slice(0, sel[0]),
				__2 = this.val.slice(sel[0], sel[1]),
				__3 = this.val.slice(sel[1], this.val.length);
			
			// Modify Content
			after = (after == undefined)? before: after;
			
			if(action == "link" || action == "image"){
				if(!/\s/.test(__1[__1.length-1])){
					__1 += " ";
				}
				if(!/\s/.test(__3[0])){
					__3 = " " + __3;
				}
				
				sel[0] = __1.length + before.length + __2.length;
				if(__2 == ""){ __2 = "Title"; }
				sel[1] = __1.length + before.length + __2.length;
			} else {
				sel[0] = __1.length + before.length + __2.length;
				sel[1] = __1.length + before.length + __2.length;
			}
			
			// Write Content
			this.write(__1 + before + __2 + after + __3, [sel[0], sel[1]]);
		},
		
		/*
		 |	ACTION :: BLOCK ACTIONs
		 |	@since	0.2.0
		 */
		do_block:		function(action, before, after){
			var sel	= this.selection(),
				__1 = this.val.slice(0, sel[0]),
				__2 = this.val.slice(sel[0], sel[1]),
				__3 = this.val.slice(sel[1], this.val.length);
			
			// Check Line Breaks
			if(action !== "indent"){
				if(__1.lastIndexOf("\n") !== __1.length-1){
					__2 = "\n" + __2; sel[0]++; sel[1]++;
				}
				if(__3.indexOf("\n") !== 0){
					__3 = "\n" + __3;
				}
			}
			
			// Modify Content
			if(after === undefined){
				if(!this.walkable(this.lines.current + "temp")){
					__2 = before + __2;
				}
				if(/\n/.test(__2)){
					__2 = __2.replace(/\n/g, "\n" + before);
				}
				
				if(action === "indent"){
					if(sel[0] !== sel[1]){
						sel[0] = __1.length;
						sel[1] = __1.length + __2.length;
					} else {
						sel[0] = __1.length + __2.length;
						sel[1] = __1.length + __2.length;
					}
				} else {
					__2 = this.indenter(__2, "create");
					sel[0] = __1.length + __2.length;
					sel[1] = __1.length + __2.length;
				}
			} else {
				__2 = this.indenter(before + __2, "create") +  after;
				sel[0] = __1.length + __2.length - after.length;
				sel[1] = __1.length + __2.length - after.length;
			}
			
			// Write Content
			this.write(__1 + __2 + __3, [sel[0], sel[1]]);
		},
		
		/*
		 |	ACTION :: HANDLE OUTDENT
		 |	@since	0.2.0
		 */
		do_outdent:		function(action){
			var sel	= this.selection(),
				__1 = this.val.slice(0, sel[0]),
				__2 = this.val.slice(sel[0], sel[1]),
				__3 = this.val.slice(sel[1], this.val.length),
				ind = this.indenter("\t"),
				rep = new RegExp("\n" + ind, "g");
			
			// Remove Outdent
			if(/\n/.test(__2)){
				__2 = __2.replace(rep, "\n", __2);
				sel[0] = __1.length;
				sel[1] = __1.length + __2.length;
			} else if(this.lines.current.indexOf(ind) == 0){
				var __4 = __1.slice(0, __1.lastIndexOf("\n")+1),
					__5 = __1.slice(__1.lastIndexOf("\n")+1+ind.length, __1.length);
				__1 = __4 + __5;
				sel[0] -= ind.length;
				sel[1] -= ind.length;
			}
			if(__2.indexOf(ind) == 0){
				__2 = __2.slice(ind.length);
				sel[0] -= ind.length; 
				sel[1] -= ind.length; 
			}
			
			// Write Content
			this.write(__1 + __2 + __3, sel);
		},
		
		/*
		 |	ACTION :: HANDLE HEADER
		 |	@since	0.2.0
		 */
		do_header:		function(action){
			this.showDropdown(action, function(dropdown){
				var max = 6, self = this,
					sel = this.selection();	// IE Fix
				if(action === "header-x3"){
					max = 3;
				}
				
				for(var i = 1; i <= max; i++){
					dropdown.append($("<div></div>", {
						"text": 				"Header " + i,
						"class": 				"tail-writer-field tail-writer-field-header-" + i,
						"data-writer-field": 	"header-" + i
					}).click(function(event){
						self.selection(sel[0], sel[1]);	// IE Fix
						self.do_action($(this).attr("data-writer-field"));
						self.hideDropdown();
					}));
				}
				return dropdown;
			});
		},
		
		/*
		 |	ACTION :: HANDLE TABLE
		 |	@since	0.2.0
		 */
		do_table:		function(action){
			var type = (action === "table-dialog")? "ialog": "ropdown";
			
			this["showD" + type](action, function(element){
				var self = this;
				
				// Create Rows Input
				var rows = $("<div></div>", {
					"class":	"tail-writer-field tail-writer-field-rows"
				}).prepend([
					$("<input />", {
						"type":					"number",
						"value":				3,
						"class":				"field-number",		// HTML < 5 Fix
						"data-writer-field":	"rows"
					}), $("<span></span>", {"text": this.__("table-rows")})
				]);
				
				// Create Columns Input
				var cols = $("<div></div>", {
					"class":	"tail-writer-field tail-writer-field-cols"
				}).prepend([
					$("<input />", {
						"type":					"number",
						"value":				3,
						"class":				"field-number",		// HTML < 5 Fix
						"data-writer-field":	"cols"
					}), $("<span></span>", {"text": this.__("table-cols")})
				]);
				
				// Create Button
				var button = $("<div></div>", {
					"class":	"tail-writer-button"
				}).prepend($("<button></button>", {
					"text":					this.__("table-create"),
					"data-writer-field":	"create-table",
				}).click(function(event){
					event.preventDefault();
					var rows = $(this).parent().parent().find("[data-writer-field='rows']"),
						cols = $(this).parent().parent().find("[data-writer-field='cols']"),
						content = "", spaces  = 12;
					
					if(isNaN(rows)){ rows = 3; }
					if(isNaN(cols)){ cols = 3; }
					
					for(var i = 0; i <= rows; i++){
						for(var i2 = 1; i2 <= cols; i2++){
							content += "| ";
							for(var s = 0; s < spaces; s++){
								content += " ";
							}
							content += " ";
						}
						content += "|\n";
						
						if(i == 0){
							for(var i2 = 1; i2 <= cols; i2++){
								content += "| ";
								for(var s = 0; s < (spaces-3); s++){
									content += "-";
								}
								content += " ";
							}
							content += "|\n";
						}
					}
					content = content.substr(0, (content.length-1));
					self.do_block("table", "\n", content);
					self["hideD" + type]();
				}));
				
				// Add to Element
				return element.append([rows, cols, button]);
			});
		},
		
		/*
		 |	ACTION :: IMAGE / URL DIALOG
		 |	@since	0.2.0
		 */
		do_img_url:		function(action){
			this.showDialog(action, function(dialog){
				var self = this;
					action = action.replace("-dialog", "");
				
				// Create Rows Input
				var title = $("<div></div>", {
					"class":	"tail-writer-field tail-writer-field-title"
				}).append(
					$("<input />", {
						"type":					"text",
						"placeholder":			this.__(action + "-title"),
						"data-writer-field":	"title",
					})
				);
				
				// HTML < 5 Fix
				if(!tailWriter.placeholder){
					title.append($("<span></span>", {"text": this.__(action + "-title")}));
				}
				
				// Create Columns Input
				var url = $("<div></div>", {
					"class":	"tail-writer-field tail-writer-field-url"
				}).append(
					$("<input />", {
						"type":					"text",
						"placeholder":			this.__(action + "-url"),
						"data-writer-field":	"url",
					})
				);
				
				// HTML < 5 Fix
				if(!tailWriter.placeholder){
					url.append($("<span></span>", {"text": this.__(action + "-url")}));
				}
				
				// Create Button
				var button = $("<div></div>", {
					"class":	"tail-writer-button"
				}).prepend($("<button></button>", {
					"text":					this.__(action + "-create"),
					"data-writer-field":	"create-" + action,
				}).click(function(event){
					event.preventDefault();
					var title = $(this).parent().parent().find("[data-writer-field='title']"),
						url   = $(this).parent().parent().find("[data-writer-field='url']");
					
					if(action === "image"){
						self.do_inline("_image", "![" + title.val(), "](" + url.val() + ")");
					} else {
						self.do_inline("_link", "[" + title.val(), "](" + url.val() + ")");
					}
					self.hideDialog();
				}));
				
				// Add to Element
				return dialog.append([title, url, button]);
			});
		},
		
		/*
		 |	ACTION :: HANDLE PREVIEW
		 |	@since	0.2.0
		 */
		do_preview:		function(action){
			var button	= this.e.toolbar.find("[data-writer-action='" + action + "']");
			
			
			if(button.hasClass("active")){
				button.removeClass("active icon-editor");
				button.addClass("icon-preview");
				button.attr("data-writer-title", this.__("preview"));
				
				this.e.editor.next(".tail-writer-preview").remove();
				this.e.editor.show();
				this.e.toolbar.find("button").not(button).removeClass("disabled");
				
				if(this.con.tooltip_show){
					button.mouseout()
					setTimeout(function(){ button.mouseover() }, 120);
				}
			} else {
				var content = this.e.editor.val();
				if(content.length == 0){
					content = this.__("preview-empty");
				}
				
				// Checklist Support (https://github.com/chjj/marked/issues/107#issuecomment-44542001)
				var render = new marked.Renderer();
				render.listitem = function(text){
					if(/^\s*\[[x ]\]\s*/.test(text)){
						text = text
							.replace(/^\s*\[ \]\s*/, '<input type="checkbox"> ')
							.replace(/^\s*\[x\]\s*/, '<input type="checkbox" checked> ');
						return '<li style="list-style: none">' + text + '</li>';
					}
					return '<li>' + text + '</li>';
				};
				
				// Render Content and Preview
				var preview = $("<div></div>", {
					"class":	"tail-writer-preview",
					"css":		{
						"width":	this.e.editor.outerWidth(),
						"height":	this.e.editor.outerHeight()
					}
				}).html(marked(content, {renderer: render}));
				
				// Manipulate Elements
				button.removeClass("icon-preview");
				button.addClass("active icon-editor");
				button.attr("data-writer-title", this.__("editor"));
				this.e.editor.hide();
				this.e.editor.after(preview);
				this.e.toolbar.find("button").not(button).addClass("disabled");
				
				// Manipulate Tooltip
				if(this.con.tooltip_show){
					button.mouseout()
					setTimeout(function(){ button.mouseover() }, 120);
				}
			}
		}
	}
	
	/*
	 |	REMOVE PREVIEW IF UNAVAILABLE
	 |	@since	0.2.0
	 */
	if($.type(marked) !== "function"){
		if(tailWriter.prototype.A.hasOwnProperty("preview")){
			delete tailWriter.prototype.A.preview;
		}
	}
	
	/*
	 |	IMPLEMENT TAILWRITER
	 |	@since	0.2.0
	 */
	$.fn.extend({
		tailWriter: function(options){
			var holder = [];
			
			if(this.length > 0){
				for(var i = 0; i < this.length; i++){
					holder.push(new tailWriter($(this[i]), options));
				}
				if(holder.length === 1){
					holder = holder[0];
				}
				return holder;
			}
			return false;
		}
	});
	window.tailWriter = tailWriter;
})(jQuery);