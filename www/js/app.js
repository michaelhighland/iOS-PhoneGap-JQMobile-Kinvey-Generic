function App(){
	this.setup = function(){
		checkIn();
	}
}

function initKinvey(){
	Kinvey.init({
		appKey: 'kid_PTU06lpJ9f',
		appSecret: '06decabf816043728dbe15c8df5d2662'
	});
}

function pingKinvey(){
	
 	Kinvey.ping({
	    success: function(response) {
			console.log('Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
			return true;
	    },
	    error: function(error) {
			console.log('Kinvey Ping Failed. Response: ' + error.description);
			return false;
	    }
	 });
}

function checkIn(){
	
	console.log("Attempting Checkin for: "+device.uuid);
	
	var user = new Kinvey.User();
	user.login(device.uuid, device.uuid, {
	    success: function(user) {
	        $("#test").html("Device Recognized");
	    },
	    error: function(error) {
	        registerDevice();
	    }
	});
	
}

function registerDevice(){
	// Create a user named John Doe.
	Kinvey.User.create({
	    username: device.uuid,
	    password: device.uuid,
	}, {
	    success: function(user) {
	        $("#test").html("Device Registered to "+device.uuid);
	    },
	    error: function(error) {
	        $("#test").html("Could not register device");
	    }
	});
	
}