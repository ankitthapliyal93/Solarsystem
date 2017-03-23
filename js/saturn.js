


Saturn= function(){
	Sim.Object.call(this);
}

Saturn.prototype=new Sim.Object();

Saturn.prototype.init=function(param){

	var saturnOrbitObject=new THREE.Object3D();
	this.setObject3D(saturnOrbitObject);

	var saturnGroup=new THREE.Object3D();
	var geometry=new THREE.SphereGeometry(param.radius,32,32);
	var texture=THREE.ImageUtils.loadTexture(param.mapurl);
	var material=new THREE.MeshPhongMaterial({map:texture});
	var saturnMesh= new THREE.Mesh(geometry,material);
	this.saturnMesh=saturnMesh;
	saturnGroup.castShadow=true;
	saturnGroup.add(saturnMesh);
	this.saturnGroup=saturnGroup;

	
	var distsquared=param.distance*param.distance;
	saturnGroup.position.set(Math.sqrt(distsquared/2), 0, Math.sqrt(distsquared/2));
	size=param.size;
	saturnGroup.scale.set(size,size,size);

	saturnOrbitObject.add(saturnGroup);
	this.period = param.period;
	this.revolutionSpeed = param.revolutionSpeed ? param.revolutionSpeed : Planet.REVOLUTION_Y;

	this.createRings();
	
	saturnGroup.rotation.x = Saturn.TILT;

	//Orbit
	var orbit=new Orbit();
	orbit.init(Math.sqrt(distsquared/2) *Math.sqrt(2));
	this.orbit=orbit;
	saturnOrbitObject.add(orbit.object3D);

}


Saturn.prototype.update=function(){

	this.object3D.rotation.y +=.003;// this.revolutionSpeed / this.period;

	Sim.Object.prototype.update.call(this);
}


Saturn.TILT = -0.466;
Saturn.REVOLUTION_Y = 0.003;


Saturn.prototype.createRings = function()
{
    // Create our Saturn with nice texture
    var ringsmap = "./images/SatRing.png";
    var geometry = new Saturn.Rings(3, 4.867, 64);
    
    var texture = THREE.ImageUtils.loadTexture(ringsmap);
    //var material = new THREE.MeshPhongMaterial( {emissiveMap:texture, emissive:0xffffff, color:0xffffff,transparent:true} );
    var material=new THREE.MeshLambertMaterial({map:texture,tranparent:true,ambient:0xffffff})
    var ringsMesh = new THREE.Mesh( geometry, material);
    material.side=THREE.DoubleSide;
    ringsMesh.receiveShadow=true;
    console.log(ringsMesh,material);
    ringsMesh.rotation.x = Math.PI / 2;

    // Add it to our group
    this.saturnGroup.add(ringsMesh);
	
    // Save it away so we can rotate it
    this.ringsMesh = ringsMesh;
}



// The rings
Saturn.Rings = function ( innerRadius, outerRadius, nSegments ) {

	THREE.Geometry.call( this );
	

	var outerRadius = outerRadius || 1,
	innerRadius = innerRadius || .5,
	gridY = nSegments || 10;
	
	var i, twopi = 2 * Math.PI;
	var iVer = Math.max( 2, gridY );
	console.log(outerRadius);

	var origin = new THREE.Vector3(0, 0, 0);	
	//this.vertices.push(new THREE.Vertex(origin));

	for ( i = 0; i < ( iVer + 1 ) ; i++ ) {

		var fRad1 = i / iVer;
		var fRad2 = (i + 1) / iVer;
		var fX1 = innerRadius * Math.cos( fRad1 * twopi );
		var fY1 = innerRadius * Math.sin( fRad1 * twopi );
		var fX2 = outerRadius * Math.cos( fRad1 * twopi );
		var fY2 = outerRadius * Math.sin( fRad1 * twopi );
		var fX4 = innerRadius * Math.cos( fRad2 * twopi );
		var fY4 = innerRadius * Math.sin( fRad2 * twopi );
		var fX3 = outerRadius * Math.cos( fRad2 * twopi );
		var fY3 = outerRadius * Math.sin( fRad2 * twopi );
		
		var v1 = new THREE.Vector3( fX1, fY1, 0 );
		var v2 = new THREE.Vector3( fX2, fY2, 0 );
		var v3 = new THREE.Vector3( fX3, fY3, 0 );
		var v4 = new THREE.Vector3( fX4, fY4, 0 );
		this.vertices.push(  v1  );
		this.vertices.push(v2);
		this.vertices.push( v3 );
		this.vertices.push( v4 );
		
	}

	for ( i = 0; i < iVer ; i++ ) {

		this.faces.push(new THREE.Face3( i * 4, i * 4 + 1, i * 4 + 2));
		this.faces.push(new THREE.Face3( i * 4, i * 4 + 2, i * 4 + 3));
		this.faceVertexUvs[ 0 ].push( [
			       						new THREE.Vector2(0, 1),
			       						new THREE.Vector2(1, 1),
			       						new THREE.Vector2(1, 0) ] );
		this.faceVertexUvs[ 0 ].push( [
			       						new THREE.Vector2(0, 1),
			       						new THREE.Vector2(1, 0),
			       						new THREE.Vector2(0, 0) ] );
	}	

	this.computeFaceNormals();
	this.computeVertexNormals();

	console.log(this);
};

Saturn.Rings.prototype = new THREE.Geometry();
Saturn.Rings.prototype.constructor = Saturn.Rings;

