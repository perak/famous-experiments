require("famous-polyfills"); // Add polyfills
require("famous/core/famous"); // Add the default css file

FamousApp = null;

createFamousApp = function(destElementId) {
    var Engine = require("famous/core/Engine");
    var View = require("famous/core/View");

	var Modifier = require("famous/core/Modifier");
	var Transform = require("famous/core/Transform");
    var Surface = require("famous/core/Surface");
    var Lightbox = require("famous/views/Lightbox");

    function App() {
        View.apply(this, arguments);

        // create and assign a lightbox to this view
        this.lightbox = new Lightbox({
            inTransition: {curve: 'easeIn', duration: 300}
        });
        this.add(this.lightbox);

        this._eventInput.pipe(this.lightbox);

        this._sectionSurfaces = [];
    }

    App.prototype = Object.create(View.prototype);
    App.prototype.constructor = App;

    App.prototype.addSection = function (name, template, data) {
        // create the div for the meteor template
        var div = document.createElement('div');
        UI.insert(data ? UI.renderWithData(template, data) : UI.render(template), div);

        this._sectionSurfaces[name] = new Surface({
            content: div
//            classes: ["container"]
        });
    };

    App.prototype.show = function (sectionName) {
		var surface = this._sectionSurfaces[sectionName];
		if (surface) {
			this.lightbox.show(surface);
		}
	};

	App.prototype.animateRoute = function(routeName) {
		var route = _.find(Router.routes, function(r) { return r.name == routeName; });
		if(!route) {
			return;
		}

    	var me = this;
		var controller = route.getController(route.originalPath, route.options);
		var templateName = Router.convertTemplateName(route.name);
		route.options.template = "Blank";
		route.options.onBeforeAction = function() { me.show(templateName); }
		me.addSection(templateName, Template[templateName]);
	}

    App.prototype.animateAllRoutes = function () {
    	var me = this;
		_.each(Router.routes, function(route) {
			var controller = route.getController(route.originalPath, route.options);
			var templateName = Router.convertTemplateName(route.name);
			route.options.template = "Blank";
			route.options.onBeforeAction = function() { me.show(templateName); }
			me.addSection(templateName, Template[templateName]);
		});
    }

	var destElement = document.getElementById(destElementId);
	if(destElement == null) destElement = undefined;
	// create the App from the template
	famApp = new App();
	// hook the app into the context
	var appContext = Engine.createContext(destElement);
	// move surface down (toolbar)
	appContext.add(famApp);
	Engine.pipe(famApp);
	return famApp;
}
