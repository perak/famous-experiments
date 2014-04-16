Router.configure({
	notFoundTemplate: 'NotFound',
	loadingTemplate: 'Loading',
	templateNameConverter: 'upperCamelCase',
	routeControllerNameConverter: 'upperCamelCase'
});

RouteController.prototype.layoutTemplate = 'layout';

Router.map(function () {
	this.route('home', {path: '/'});
	this.route('about', {path: '/about'});
});
