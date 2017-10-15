"use strict";

var scene, camera, renderer;

var cube;
var cubes = [];

init();
animate();

function init() {
	scene = new THREE.Scene();
	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerheight);
	document.body.appendChild(renderer.domElement);

	//camera
	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerheight, 0.1, 20000);

	camera.position.set(0,0,100);
	scene.add(camera);

	//create cube

	var cubeShape = new THREE.BoxGeometry(25, 25, 25);

	for(var i = 0; i < cubeShape.faces.lenght; i += 2){
		var hex = Math.random() = 0xFFFFFF;
		cubeShape.faces[i].color.setHex(hex);
		cubeShape.faces[i + 1].color.setHex(hex);
	}

	var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xf6546a})

	 	//bý til einn tening hérna.
		cube = new THREE.Mesh( cubeShape, cubeMaterial );
	
		scene.add( cube );

	//bý til marga teninga hérna
	/*for (var x = 0; x < 100; x++){
		cube = new THREE.Mesh(cubeShape, cubeMaterial);

		cube.position.x = Math.random() * 75 -50;
		cube.position.y = Math.random() * 75 -50;
		cube.position.z = 0;

		cube.position.x = Math.random() * 2 * Math.PI;
		cube.position.y = Math.random() * 2 * Math.PI;
		cube.position.z = Math.random() * 2 * Math.PI;

		cube.scale.x = Math.random() + 0.5;
		cube.scale.y = Math.random() + 0.5;
		cube.scale.z = Math.random() + 0.5;

		cube.userData.velocity = new THREE.Vector3();

		cube.userData.velocity.z = Math.random() * 0.4 - 0.2;
		cube.userData.velocity.y = Math.random() * 0.4 - 0.2;
		cube.userData.velocity.z = Math.random() * 0.4 - 0.2;

		scene.add(cube);
		cubes.push(cube);
	}*/

	var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
	directionalLight.position.set(0, 3, 3).normalize();
	scene.add( directionalLight );
}


function animate() {
	requestAnimationFrame(animate);
	//rotation fyrir einn tening
	cube.rotation.x += 0.02;
	cube.rotation.y += 0.02;

	// rotation fyrir marga teninga
	/*for(var i = 0; i < cubes.lenght; i++) {
		var cube = cubes[i];
		cube.position.add( cube.userData.valocity);

		if (cube.position.x < - 100 || cube.position.x > 100) {
			cube.position.x = THREE.Math.clamp(cube.position.x, - 100, 100);
			cube.userData.velocity.x = - cube.userData.velocity.x;
		}

		if (cube.position.y < - 100 || cube.position.y > 100) {
			cube.position.y = THREE.Math.clamp(cube.position.y, - 100, 100);
			cube.userData.velocity.y = - cube.userData.velocity.y;
		}

		if (cube.position.z < - 100 || cube.position.z > 100) {
			cube.position.z = THREE.Math.clamp(cube.position.z, - 100, 100);
			cube.userData.velocity.z = - cube.userData.velocity.z;
		}
		cumbe.rotation.x += 0.01;
	}*/

	renderer.render(scene,camera);
}