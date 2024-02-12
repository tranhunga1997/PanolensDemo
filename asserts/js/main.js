const panorama = new PANOLENS.ImagePanorama( 'asserts/images/panel1.jpeg' );
const panorama2 = new PANOLENS.ImagePanorama( 'asserts/images/pano5.jpg' );
const imageContainer = document.querySelector( '.image-container' );

var infospotPosition = [
    new THREE.Vector3(-2136.06, 16.30, 890.14),
    new THREE.Vector3(-3136.05, 296.30, -4290.14),
];

const viewer = new PANOLENS.Viewer({
    container : imageContainer,
    autoRotate : true,
    autoRotateSpeed : 0.3,
    controlBar : true
});

panorama.link(panorama2, infospotPosition[0]);
panorama2.link(panorama, infospotPosition[1]);

viewer.add( panorama, panorama2 );