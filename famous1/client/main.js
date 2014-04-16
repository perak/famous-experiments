App = {};
Helpers = {};

App.subscriptions = {
	/*SUBSCRIPTIONS*/
}

Helpers.menuItemClass = function(routeName) {
	if(!Router.current(true)) return "";
	if(!Router.routes[routeName]) return "";
	var currentPath = Router.current(true).path;
	var routePath = Router.routes[routeName].originalPath;

	var params = Router.current(true).params;
	for(var key in params) {
		if(key != "hash")
			routePath = routePath.replace(":" + key, params[key]);
	}

	if(routePath === "/")
		return currentPath == routePath ? "active" : "";
	return currentPath.indexOf(routePath) == 0 ? "active" : "";
};

_.each(Helpers, function (helper, key) {
	Handlebars.registerHelper(key, helper)
});

Meteor.startup(function () {
	_.each(Router.routes, function(route) {
		var controller = route.getController(route.originalPath, route.options);
		var templateName = Router.convertTemplateName(route.name);
		route.options.template = "Blank";
		route.options.onBeforeAction = function() { Application.show(templateName); }
		Application.addSection(templateName, Template[templateName]);
	});
});
