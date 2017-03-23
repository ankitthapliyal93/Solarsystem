
Orbit=function(){
	Sim.Object.call(this);	
}

Orbit.prototype=new Sim.Object();

Orbit.prototype.init=function(distance){

	var geometry=new THREE.Geometry();
	var radius = distance;
	var twopi = 2 * Math.PI;
	var i;
	for(i=0; i <= Orbit.N_SEGMENTS;i++)
	{
		var x=distance * Math.cos( i / Orbit.N_SEGMENTS * twopi );
		var z=distance * Math.sin( i / Orbit.N_SEGMENTS * twopi );
		var vertex=new THREE.Vector3(x,0,z);
		geometry.vertices.push(vertex);
	}

	material=new THREE.LineBasicMaterial({color:0xffffff,opacity:.5,linewidth:1});
	var line=new THREE.Line(geometry,material);
	this.setObject3D(line);
}


Orbit.N_SEGMENTS = 120;