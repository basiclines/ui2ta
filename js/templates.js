// Store all the HTML templates

var templates = {};
templates.get = function(template, data) {
	var tpl = template;
	for ( var i in data ) {
		var key = i;
		var value = data[i];
		tpl = tpl.replace("#"+key+"#", value);
	}
	return tpl;
}

// Gists list item
templates.contacts = "<li>"+
							"<aside>"+
								"<img alt='#name#' src='#photo#'>"+
							"</aside>"+
							"<a href='#url#'>"+
								"<p>#name# <strong>#surname#</strong></p>"+
								"<p>#phone#</p>"+
							"</a>"+
						"</li>";

templates.plans = "<header>#date#</header>"+
					"<ul>"+
						"<li>"+
							"<aside>"+
								"<img alt='#title#' src='#photo#'>"+
							"</aside>"+
							"<a href='#url#'>"+
								"<p><strong>#title#</strong> <em>#location#</em></p>"+
								"<p>#description#</p>"+
							"</a>"+
						"</li>"+
					"</ul>";

