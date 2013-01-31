// Handling all view transitions

var views = {
	oppositePosition: function(position) {
		switch (position) {
			case "start": return "end";
			case "end": return "start";
			case "after": return "before";
			case "before": return "after";
			case "behind": return "above";
			case "above": return "behind";
			default: return position;
		}
	},

	getActive: function() {
		for ( var i in dom.view ) {
			if ( dom.view[i].classList.contains("active") ) {
				return dom.view[i];
			}
		}
	},

	back: function() {
		window.history.back();
	},

	go: function(to) {
		var newHash = "/"+to;

		// Set new hash if it is not already declared
		if ( window.location.hash !== newHash ) {
			window.location.hash = newHash;
		}

		var toElem = document.getElementById(to);
		var from = views.getActive();

		// If the hash does not exists, show error page
		if (toElem == null) {
			toElem = dom.view.error
		}

		//Check for any active view
		if (from != null) {
			toElem.classList.remove("notransition");
			from.dataset.viewport = views.oppositePosition(toElem.dataset.viewport);
			from.classList.remove("active");
		} else {
			toElem.classList.add("notransition");
		}

		// Hide all data-showon and data-hideon desired elements
		var tohide = dom.main.querySelectorAll("[data-showon], [data-hideon="+to+"]");
		for ( var i = 0; i < tohide.length; i++ ) {
			tohide[i].classList.add("hidden")
		}

		// Show desired data-showon element and also checks for hideon opposites views
		var opposite = [];
		for ( var i in dom.view ) {
			if ( dom.view[i].id != to ) {
				opposite.push(",[data-hideon="+dom.view[i].id+"]")
			}
		}
		opposite = opposite.join("");

		var toshow = dom.main.querySelectorAll("[data-showon="+to+"]"+ opposite);
		for ( var i = 0; i < toshow.length; i++ ) {
			toshow[i].classList.remove("hidden")
		}

		toElem.classList.add("active");
	},

	home: function() {
		this.go(dom.view.add.id);
	},

	onchange: function(e) {
		var view = window.location.hash.split("#/")[1];
		// If no hash set go home
		if (view) {
			this.go(view);
		} else {
			this.home();
		}
	}
}


// Set event for view change
window.addEventListener("hashchange", function(e){
	views.onchange(e);
});
