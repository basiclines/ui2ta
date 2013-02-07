// Common UI interactions

var uiHandlers = function() {

	// Toggle Sidebar
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
			this.parentNode.querySelector("[data-trigger=select]").innerHTML = this.value;
		});
	}

	// Slider
	for (var i = 0; i < dom.slider.length; i++) {
		var context = dom.slider[i];
		var button = dom.slider[i].querySelector("button");
		var progress = dom.slider[i].querySelector("progress");
		var pressEvent =  ("ontouchstart" in window) ? "touchstart" : "mousedown";
		var moveEvent = ("ontouchstart" in window) ? "touchmove" : "mousemove";
		var releaseEvent = ("ontouchstart" in window) ? "touchend" :"mouseup";
		var coordinates = { init: 0, current: 0 }

		function move(e){
			coordinates.current = (e.touches) ? e.touches[0].pageX : e.clientX;
			var available = button.offsetParent.offsetWidth
			var limit =  available - button.offsetWidth;
			var amount = coordinates.current - button.offsetParent.offsetLeft - button.offsetWidth;
			// FIx progressbar
			var error = button.offsetWidth/1.5;

			// Set limits
			if ( amount >= limit || amount <= 0 )
				return;

			button.style.transform = "translateX("+amount+"px)";
			progress.value = (((amount+error)*100)/available).toFixed();
		}

		function start() {
			context.addEventListener(moveEvent, move);
			button.addEventListener(releaseEvent, function end(e) {
				context.removeEventListener(moveEvent, move, false);
				this.removeEventListener(releaseEvent, end, false);
			});
			context.addEventListener(releaseEvent, function end(e) {
				context.removeEventListener(moveEvent, move, false);
				this.removeEventListener(releaseEvent, end, false);
			});
		}

		button.addEventListener(pressEvent, function(e) {
			coordinates.init = (e.touches) ? e.touches[0].pageX : e.clientX;
			start();
		});

	}

	// Clear field action
	dom.attach(dom.clear, "click", function(e) {
		this.parentNode.querySelector("input").value="";
		e.preventDefault();
	});
}
