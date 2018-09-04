(function(){
	"use strict";

	document.addEventListener("DOMContentLoaded", function(){
		/*
		 |	WIDGET CONTENT SWITCH
		 |	@since	2.0.0
		 */
		var action		= document.querySelectorAll(".widget header .widget-option"),
			artSwitch	= function(event){
				event.preventDefault();
				var articles 	= this.parentElement.parentElement.parentElement.querySelectorAll("article"),
					string		= this.getAttribute("title").split("|"),
					option		= this.getAttribute("data-option").split("|"),
					icon		= this.children[0].getAttribute("data-icon");

				for(var i = 0; i < articles.length; i++){
					if(articles[i].className === option[0]){
						articles[i].style.display = "block";
					} else {
						articles[i].style.display = "none";
					}

				}
				this.setAttribute("title", string[1] + "|" + string[0]);
				this.setAttribute("data-option", option[1] + "|" + option[0]);
				this.children[0].setAttribute("data-icon", this.children[0].className);
				this.children[0].className = icon;
			};
		if(action.length > 0){
			for(var i = 0; i < action.length; i++){
				action[i].addEventListener("click", artSwitch);
				action[i].click();
			}
		}

	});
})(window, document);
