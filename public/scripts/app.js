$( document ).ready(function() {
    console.log( "ready!" );

    $('#signup-form').on('submit', function(event) {
    	event.preventDefault();

    	let formInput = {
    		email: $('#email-input').val(),
    		password: $('#password-input').val()
    	};

    	console.log(formInput);

    	$.ajax({
    		method: 'POST',
    		url: '/user',
    		data: formInput,
    		success: signUpSuccess,
    		error: signUpError
    	});
    });


    //signup success function
    function signUpSuccess () {
    	window.location.href = '/index';
    }


    //signup error function
    function signUpError () {
    	console.log('not quite!');
    }
});
