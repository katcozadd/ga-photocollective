$( document ).ready(function() {
    console.log( "ready!" );

    $('#signup-form').on('submit', function(event) {
    	event.preventDefault();

    	let signUpData = {
    		email: $('#email-input').val(),
    		password: $('#password-input').val()
    	};

    	console.log(signUpData);

    	$.ajax({
    		method: 'POST',
    		url: '/signup',
    		data: signUpData,
    		success: signUpSuccess,
    		error: signUpError
    	});
    });

    $('#login-form').on('submit', function(event) {
    	event.preventDefault();

    	let logInData = {
    		email: $('#email-input').val(),
    		password: $('#password-input').val()
    	};

    	console.log(logInData);

    	$.ajax({
    		method: "POST",
    		url: "/login",
    		data: logInData,
    		success: logInSuccess,
    		error: logInError
    	});
    });



    //signup success function
    function signUpSuccess () {
    	window.location.href = '/';
    }

    //signup error function
    function signUpError () {
    	console.log('sign, please try again!');
    }

    //login success function
    function logInSuccess () {
    	window.location.href = '/project';
    }

    //login error function 
    function logInError () {
    	console.log('error mom!')
    }
});
