const panorama = new PANOLENS.ImagePanorama('asserts/images/panel1.jpeg');
const panorama2 = new PANOLENS.ImagePanorama('asserts/images/pano5.jpg');
const imageContainer = document.querySelector('.image-container');

// *START: add audio into all panorama
audioSphere = new THREE.Mesh(
    new THREE.SphereGeometry(50, 16, 16),
    new THREE.MeshBasicMaterial({
        color: 0x00ff00
        //shading: THREE.FlatShading
    })
);
audioSphere.position.set(-398.36119823549205, 0, -36.171200427729595)
let listener = new THREE.AudioListener();
let audioLoader = new THREE.AudioLoader();
let sound = new THREE.PositionalAudio(listener);
let infospotPosition = [
    new THREE.Vector3(-3808.52, -48.00, -3228.06),
    new THREE.Vector3(-3136.05, 296.30, -4290.14),
];
audioLoader.load('https://threejs.org/examples/sounds/358232_j_s_song.mp3', function (buffer) {
    audioBuffer = buffer;
    sound.setBuffer(buffer);
    sound.setRefDistance(100);
    sound.setLoop(true);
    sound.play();
});
// *END: add audio into all panorama

// *START: create infospot
const infoSpot1 = new PANOLENS.Infospot(300, PANOLENS.DataImage.Arrow);
infoSpot1.position.set(-3808.52, -48.00, -3228.06);
infoSpot1.addHoverText("addHoverText demo");
// infoSpot1.setText("setText demo");
infoSpot1.addEventListener('click', e => {
    console.log("clicked on infospot");
    viewer.setPanorama(panorama2);
});
// *END: create infospot

// *START: create viewer
const viewer = new PANOLENS.Viewer({
    container: imageContainer,
    autoRotate: true,
    autoRotateSpeed: 0.3,
    controlBar: true,
    autoHideInfospot: false,
});
// *END: create viewer

viewer.getCamera().add(listener);

audioSphere.add(sound);
panorama.add(audioSphere);
// panorama.link(panorama2, infospotPosition[0]);
panorama2.link(panorama, infospotPosition[1], 500);

panorama.add(infoSpot1);
viewer.add(panorama, panorama2);

// !EVENT
// *START: add event get coordinates from panorama2
panorama2.addEventListener("click", function (e) {
    let coordinates = viewer.getPosition(panorama2);
    console.info(`x=${coordinates.x}, y=${coordinates.y}, z=${coordinates.z}`);
});
// *END: add event get coordinates from panorama2