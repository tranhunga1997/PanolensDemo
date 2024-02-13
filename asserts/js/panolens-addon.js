/**
 * Get coordinates from panorama
 * @param {Panorama} panorama 
 * @returns coordinates
 */
PANOLENS.Viewer.prototype.getPosition = function (panorama) {
	var intersects, point, panoramaWorldPosition, outputPosition;
	intersects = this.raycaster.intersectObject( panorama, true );

	if ( intersects.length > 0 ) {
		point = intersects[0].point;
		panoramaWorldPosition = this.panorama.getWorldPosition();

		// Panorama is scaled -1 on X axis
		outputPosition = new THREE.Vector3(
			-(point.x - panoramaWorldPosition.x).toFixed(2),
			(point.y - panoramaWorldPosition.y).toFixed(2),
			(point.z - panoramaWorldPosition.z).toFixed(2)
		);
	}

	return outputPosition;
};