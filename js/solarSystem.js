
var SolarApp =function(){
	Sim.App.call(this);
}


SolarApp.prototype=new Sim.App();


SolarApp.prototype.init=function(param){

	Sim.App.prototype.init.call(this,param);

	//this.camera.position.set(0,0,);
	 this.root.rotation.x = Math.PI / 8;

	var stars=new Stars();
	stars.init(Sun.SIZE_IN_EARTHS + SolarApp.EARTH_DISTANCE * SolarApp.PLUTO_DISTANCE_IN_EARTHS);
	this.addObject(stars);

	
    controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
				controls.addEventListener( 'change', this.render );


	var sun=new Sun();
	sun.init();
	this.addObject(sun);


	var earth = new Earth();
	earth.init();
	this.addObject(earth);

	//Adding  Jupiter
	spec={ size : .3, distance : 5, period : 11.86, map : "./images/realj2k.jpg"  }
	var planet=new Planet();
	planet.init({distance:spec.distance,//spec.distance * SolarApp.EARTH_DISTANCE + Sun.SIZE_IN_EARTHS, 
	    	size:spec.size,//spec.size * SolarApp.EXAGGERATED_PLANET_SCALE, 
	    	period : spec.period,
	    	revolutionSpeed : 0.002,
	    	mapurl : spec.map,
	    	radius : 3
	    });
		this.addObject(planet);

	//Adding Saturn
	
	var saturn=new Saturn();
	spec={ size : .2, distance : 8, period : 11.86, map : "./images/saturn_bjoernjonsson.jpg"  }
	saturn.init({distance:spec.distance,//spec.distance * SolarApp.EARTH_DISTANCE + Sun.SIZE_IN_EARTHS, 
	    	size:spec.size,//spec.size * SolarApp.EXAGGERATED_PLANET_SCALE, 
	    	period : spec.period,
	    	revolutionSpeed : 0.001,
	    	mapurl : spec.map,
	    	radius : 3
	    });
	this.addObject(saturn);
	


	


}


SolarApp.EARTH_DISTANCE = 50;
SolarApp.PLUTO_DISTANCE_IN_EARTHS = 77.2;
SolarApp.EXAGGERATED_PLANET_SCALE = 5.55;