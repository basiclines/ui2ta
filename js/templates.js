// Simple templates engine
// Example:
// var info = { name: "Ismael", surname: "Gonzalez" };
// var tpl = "<p>#name# <stong>#surname#</strong></p>";
// templates.parse(tpl, info)

var templates = {};
templates.parse = function(template, data) {
	for ( var i in data ) {
		var key = i;
		var value = data[i];
		template = template.replace(new RegExp("#"+key+"#", 'g'), value);
	}
	return template;
}

