// Define global key elements access and listeners
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

	// Sidebar
	dom.toggleSide.addEventListener("click", function(e) {
		if ( dom.dataset.sidebar == "on" ) {
			dom.dataset.sidebar = "";
		} else {
			dom.dataset.sidebar = "on";
		}
		e.preventDefault();
	});

	var sublinks = dom.sidebar.querySelectorAll("a");
	dom.attach(sublinks, "click", function(e){
		dom.dataset.sidebar = "";
	});

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
	for (var i = 0; i < dom.select.length; i++) {
		var triggerSelect = dom.select[i];
		var nativeSelect = triggerSelect.parentNode.querySelector("select");
		nativeSelect.addEventListener("change", function(){
			triggerSelect.innerHTML = this.value;
		});
	}

	// Clear field action
	dom.attach(dom.clear, "click", function(e) {
		this.parentNode.querySelector("input").value="";
		e.preventDefault();
	});

	// Load desired view
	views.onchange();

});
