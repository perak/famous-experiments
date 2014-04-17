Template.layout.rendered = function() {
	if(!FamousApp) {
		FamousApp = createFamousApp("content");
		FamousApp.animateAllRoutes();
	}
}
