Planet=function(){
	Sim.Object.call(this);
}

Planet.prototype=new Sim.Object();


Planet.prototype.init=function(param){

	var planetOrbitGroup=new THREE.Object3D();

	this.setObject3D(planetOrbitGroup);

	var planetGroup=new THREE.Object3D();
	var geometry=new THREE.SphereGeometry(param.radius,32,32);
	var texture=THREE.ImageUtils.loadTexture(param.mapurl);
	var material=new THREE.MeshPhongMaterial({map:texture});
	var mesh=new THREE.Mesh(geometry,material);
	planetGroup.add(mesh);
	this.globeMesh=mesh;

	planetOrbitGroup.add(planetGroup);
	var distsquared=param.distance * param.distance;
	console.log(Math.sqrt(distsquared/2));
	planetGroup.position.set(Math.sqrt(distsquared/2), 0, -Math.sqrt(distsquared/2));

	var size = param.size || 1;
    planetGroup.scale.set(size, size, size);

    this.period = param.period;
	this.revolutionSpeed = param.revolutionSpeed ? param.revolutionSpeed : Planet.REVOLUTION_Y;

	var orbit=new Orbit();
	orbit.init(Math.sqrt(distsquared/2) *Math.sqrt(2));
	planetOrbitGroup.add(orbit.object3D);

	
}

Planet.prototype.update=function(){

	this.object3D.rotation.y +=.005;// this.revolutionSpeed / this.period;

	Sim.Object.prototype.update.call(this);
}

Planet.REVOLUTION_Y = 0.003;