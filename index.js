/**
 * Collection of GIS functions for use in Node apps.
 */

module.exports = {
	/**
	 * Get centroid of polygon.
	 *
	 * @param  {Array of Points} polygon
	 * @param  {Boolean} inside
	 * @return {Object}
	 */
	centroid: function(polygon,inside) {
		var centroid = this._getCentroid(polygon);
		if(inside){
			return this._iterateToInterior(polygon,centroid)
		}
		return centroid;
	},

	/**
	 * Get centroid of polygon.
	 *
	 * @param  {Array of Points} polygon
	 * @param  {Boolean} inside
	 * @return {Object}
	 */
	_getCentroid: function(points) {
		var i, j, len, p1, p2, f, area, x, y

		//centroid defined as center of mass
		//only uses the first ring if there are multiple

		area = x = y = 0;

		for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
			p1 = points[i];
			p2 = points[j];

			f = p1.lng * p2.lat - p2.lng * p1.lat;
			area += f;
			x += (p1.lng + p2.lng) * f;
			y += (p1.lat + p2.lat) * f;
		}
		f = area * 3;
		return { lng:x/f, lat:y/f };
	},

	/**
	 * Get center of mass of polygon.
	 *
	 * @param  {Array of Points} polygon
	 * @param  {Object} Centroid
	 * @return {Object}
	 */
	_iterateToInterior: function(polygon,centroid) {
		return {lat:0,lng:0};
	}
};