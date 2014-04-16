Experiment 1
============

Iron-Router + Famo.us
---------------------

Add pages/routes as you normally do - page will be drawn by famo.us using "easeIn" transition.

"Magic" which connects iron-router with famo.us is in `/client/main.js`

	Meteor.startup(function () {
		_.each(Router.routes, function(route) {
			var controller = route.getController(route.originalPath, route.options);
			var templateName = Router.convertTemplateName(route.name);
			route.options.template = "Blank";
			route.options.onBeforeAction = function() { Application.show(templateName); }
			Application.addSection(templateName, Template[templateName]);
		});
	});

And in `client/famous.js`

That's it - my first famo.us experiment.
