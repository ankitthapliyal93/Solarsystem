
Sun=function(){
	Sim.Object.call(this);
}

Sun.prototype=new Sim.Object();

Sun.prototype.init=function(){

	var sunGroup=new THREE.Object3D();
	this.setObject3D(sunGroup);
	console.log(this.Object3D);

	this.createLight(); 
	this.createGlobe();
	
}



Sun.prototype.createGlobe=function(){

	var sunGeometry=new THREE.SphereGeometry(Sun.SIZE_IN_EARTHS,32,32);
	var mapUrl="./images/SunTexture_2048.png";
	var texture=THREE.ImageUtils.loadTexture(mapUrl);
	var sunMaterial=new THREE.MeshPhongMaterial({emissiveMap:texture, emissive:0xffffff, color:0xffffff});
	var sunMesh=new THREE.Mesh(sunGeometry,sunMaterial);
	this.object3D.add(sunMesh);
	this.sunMesh=sunMesh;
}


Sun.prototype.createLight=function(){
	var light = new THREE.PointLight( 0xffffff, 1, 0);
	//light.position.set( 0, 0, 0 );
	this.object3D.add(light);
	this.light=light;
}


Sun.SIZE_IN_EARTHS=1.5;