
// Custom Earth class
Earth = function()
	{
		Sim.Object.call(this);
	}


Earth.prototype = new Sim.Object();
Earth.prototype.init = function()
	{
		
		var earthOrbitGroup=new THREE.Object3D();
		this.setObject3D(earthOrbitGroup);


		//creating orbit
		var orbit=new Orbit();
		orbit.init(2*Math.sqrt(2));
		earthOrbitGroup.add(orbit.object3D);

		// Create a group to contain Earth and Clouds
		var earthGroup = new THREE.Object3D();
		this.earthGroup=earthGroup;

		earthOrbitGroup.add(earthGroup);
		// Add the earth globe and clouds
		earthGroup.position.set(2,0,2);
		earthGroup.scale.set(0.1,0.1,0.1);
		this.createGlobe();
		this.createClouds();
		this.createMoon();
	}
			



Earth.prototype.createGlobe = function()
	{
		// Create our Earth with nice texture - normal map for elevation,specular highlights
		var surfaceMap = THREE.ImageUtils.loadTexture("./images/earth_surface_2048.jpg" );
		var normalMap = THREE.ImageUtils.loadTexture("./images/earth_normal_2048.jpg" );
		var specularMap = THREE.ImageUtils.loadTexture("./images/earth_specular_2048.jpg" );
		
		var shaderMaterial = new THREE.MeshPhongMaterial({
   			 map: surfaceMap,
    		normalMap: normalMap,
    		specularMap: specularMap});
		var globeGeometry = new THREE.SphereGeometry(1, 32, 32);
		// We'll need these tangents for our shader
		//globeGeometry.computeTangents();
		var globeMesh = new THREE.Mesh( globeGeometry, shaderMaterial );
		// Let's work in the tilt
		globeMesh.rotation.z = Earth.TILT;
		// Add it to our group
		this.earthGroup.add(globeMesh);
		// Save it away so we can rotate it
		this.globeMesh = globeMesh;
	}



Earth.prototype.createClouds = function()
	{
		// Create our clouds
		var cloudsMap = THREE.ImageUtils.loadTexture("./images/earth_clouds_1024.png" );
		var cloudsMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, map: cloudsMap, transparent:true } );
		var cloudsGeometry = new THREE.SphereGeometry(Earth.CLOUDS_SCALE,32, 32);
		cloudsMesh = new THREE.Mesh( cloudsGeometry, cloudsMaterial );
		cloudsMesh.rotation.z = Earth.TILT;
		// Add it to our group
		this.earthGroup.add(cloudsMesh);
		// Save it away so we can rotate it
		this.cloudsMesh = cloudsMesh;
	}


Earth.prototype.createMoon=function(){

	var moon=new Moon();
	moon.init();	
	this.addChild(moon);
	moon.setPosition(2, 0, 2);
	moon.setScale(0.1,0.1,0.1);
}

Earth.prototype.update = function()
	{
		// "I feel the Earth move..."
		//this.object3D.rotation.y+=0.05;
		this.object3D.rotation.y += Earth.REVOLUTION;
		this.globeMesh.rotation.y += Earth.ROTATION_Y;
		// "Clouds, too..."
		this.cloudsMesh.rotation.y += Earth.CLOUDS_ROTATION_Y;
	
		Sim.Object.prototype.update.call(this);
	}

Earth.ROTATION_Y = 0.05;
Earth.TILT = 0.41;
Earth.RADIUS = 6371;
Earth.CLOUDS_SCALE = 1.005;
Earth.CLOUDS_ROTATION_Y = Earth.ROTATION_Y * 0.95;
Earth.REVOLUTION=0.005;




//Moon Class
Moon=function(){
	Sim.Object.call(this);
}

Moon.prototype=new Sim.Object();

Moon.prototype.init=function(){


	var moonGeometry=new THREE.SphereGeometry(Moon.SIZE_IN_EARTHS,32,32);
	var moonMap=THREE.ImageUtils.loadTexture("./images/moon_1024.jpg" );
	var moonMaterial=new THREE.MeshPhongMaterial({map:moonMap/*,ambient:0x888888*/});
	var moonMesh=new THREE.Mesh(moonGeometry,moonMaterial);

	var distance = Moon.DISTANCE_FROM_EARTH / Earth.RADIUS;
	//var distance=10000;
	moonMesh.position.set(Math.sqrt(distance / 2), 0, -Math.sqrt(distance / 2));

	

	moonMesh.rotation.y = Math.PI;
	var moonGroup = new THREE.Object3D();
	moonGroup.add(moonMesh);

	//Creating moon orbit
	var orbit=new Orbit();
	orbit.init(Math.sqrt(distance / 2)*Math.sqrt(2));
	moonGroup.add(orbit.object3D);



	moonGroup.rotation.x = Moon.INCLINATION;
	this.setObject3D(moonGroup);
	this.moonMesh = moonMesh;

}


Moon.prototype.update=function(){

	


	this.object3D.rotation.y += (Earth.ROTATION_Y / Moon.PERIOD);
	//this.moonMesh.rotation.y += (Earth.ROTATION_Y / Moon.PERIOD);
	
	Sim.Object.prototype.update.call(this);
}



Moon.DISTANCE_FROM_EARTH = 100000//356400;
Moon.PERIOD = 28;
Moon.EXAGGERATE_FACTOR = 1.2;
Moon.INCLINATION = 0.089;
Moon.SIZE_IN_EARTHS = 1 / 2.7 * Moon.EXAGGERATE_FACTOR;



