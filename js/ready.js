// Define global key elements access and listeners
document.addEventListener("DOMContentLoaded", function () {

	// Main wrappers
	dom = document.body;
	dom.main = document.getElementById("main");
	dom.views = document.getElementById("views");

	// Auto views objects generator
	// I.E: dom.view.list
	dom.view = (function() {
		var view = dom.views.querySelectorAll("[data-viewport]");
		var obj = {};
		for (var i = 0; i < view.length; i++) {
			obj[view[i].id] = view[i]
		}
		return obj;
	})();

	// Nodelist attach helper
	dom.attach = function(elements, event, callback){
		for ( var i = 0; i < elements.length; i++ ) {
			elements[i].addEventListener(event, callback);
		}
	}

	// Buttons
	dom.back = document.querySelectorAll("[data-trigger=back]");
	dom.edit = document.querySelector("[data-trigger=edit]");
	dom.select = document.querySelector("[data-trigger=select]");


	// Back action
	dom.attach(dom.back, "click", function(e) {
		views.back();
		e.preventDefault();
	});

	// Edit action
	dom.edit.addEventListener("click", function(e) {
		var items = dom.view.list.querySelector("ul");
		if ( items.dataset.type == "edit" ) {
			items.dataset.type = "";
		} else {
			items.dataset.type = "edit";
		}
		e.preventDefault();
	});

	// Selects
	var nativeSelect = dom.select.parentNode.querySelector("select");
	nativeSelect.addEventListener("change", function(){
		dom.select.innerHTML = this.value;
	});

	// Load home
	views.home();

});
