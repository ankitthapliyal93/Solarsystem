Stars=function(){
	Sim.Object.call(this);
}

Stars.prototype=new Sim.Object();

Stars.prototype.init=function(minDistance){

	var starGroup= new THREE.Object3D();
	this.setObject3D(starGroup); 

	var geometry=new THREE.Geometry();
	
	for (i=0; i<Stars.NVERTICES; i++){
		var vertex = new THREE.Vector3( (Math.random() * 2 - 1) * minDistance, 
				(Math.random() * 2 - 1) * minDistance, 
				(Math.random() * 2 - 1) * minDistance);
		
		if (vertex.length() <  minDistance)
		{
			vertex = vertex.setLength(minDistance);
		}
		geometry.vertices.push(vertex);
	}

	var materials=[]

	for(i=0; i<Stars.NMATERIALS; i++){
		materials.push(new THREE.PointsMaterial( { color: 0x101010 * (i + 1), 
					size: i % 2 + 1, 
					sizeAttenuation: false } ));
	}



	for(i=0; i<Stars.NPARTICLESYSTEMS; i++){

		var stars=new THREE.Points(geometry,materials[i % Stars.NMATERIALS]);
		stars.rotation.y = i / (Math.PI * 2);
		starGroup.add(stars);

	}



}


Stars.NVERTICES = 667;
Stars.NMATERIALS = 8;
Stars.NPARTICLESYSTEMS = 24;