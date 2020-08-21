/**
 * Class to keep checking of routes a bit simpler.
 */
class Router {

	/**
	 * Constructs the router.
	 *
	 * @param {Object} docRoute The Docusaurus doc route.
	 * @param {string} homepagePath The homepage's path. Defaults to /.
	 */
	constructor(docRoute, homepagePath = '/') {
		this.originalRoute = docRoute;
		this.homepagePath = homepagePath;
		this.valid = this.isValidRoute();
	}

	/**
	 * Determines whether the route is considered valid.
	 *
	 * @returns {boolean} Whether or not the set route is valid.
	 */
	isValidRoute() {
		return 'path' in this.originalRoute && this.originalRoute.path !== '';
	}

	/**
	 * Determines whether the current route is the homepage route.
	 *
	 * @returns {boolean} Whether or not the route is the homepage route.
	 */
	isHomepage() {
		return this.isValidRoute() && this.originalRoute.path === this.homepagePath;
	}

	/**
	 * Gets the path of the route.
	 *
	 * @returns {string} The path of the route. Defaults to the homepage path if malformed.
	 */
	getPath() {
		if ( ! this.isValidRoute() || this.isHomepage() ) {
			return this.homepagePath;
		}

		return this.originalRoute.path;
	}
}

export default Router;
