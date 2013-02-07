// Define global key elements  and initialize UI listeners
document.addEventListener("DOMContentLoaded", function () {

	// Main wrappers
	dom = document.body;
	dom.sidebar = document.getElementById("sidebar");
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
	dom.toggleSide = document.querySelector("[data-trigger=sidebar]");
	dom.back = document.querySelectorAll("[data-trigger=back]");
	dom.edit = document.querySelector("[data-trigger=edit]");
	dom.select = document.querySelectorAll("[data-trigger=select]");
	dom.clear = document.querySelectorAll("button[type=reset]");

	// Other triggers
	dom.slider = dom.main.querySelectorAll("[role=slider]");

	// Initialize UI handlers
	uiHandlers();

	// Load url location view
	views.onchange();

});
