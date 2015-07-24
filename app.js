var main = function() {
	$(document).keypress(function(event){//Menu toggle with arrows
		if(event.keyCode === 37) { //Left arrow
			$('.menu').animate({
			  left: "-200px"
			}, 200);

			$('body').animate({
			  left: "0px"
			}, 200);
		} else if(event.keyCode === 39) {//Right arrow
			$('.menu').animate({
			  left: "0px"
			}, 200);

			$('body').animate({
			  left: "200px"
			}, 200);
		}
	});

	$('.menu_open').click(function() { //Menu Open
	    $('.menu').animate({
	      left: "0px"
	    }, 200);

	    $('body').animate({
	      left: "200px"
	    }, 200);
	});

	$('.menu_close').click(function() {//Menu Close
	    $('.menu').animate({
	      left: "-200px"
	    }, 200);

	    $('body').animate({
	      left: "0px"
	    }, 200);
	});
	$('.btn_post').addClass('disabled');

	$('.btn_post').click(function(){//Post Comment
		var post = $('.commentbox').val();

		$('<li>').text(post).prependTo('.comments');
		$('.commentbox').val('');
		$('.count_char').text('300');
		$(this).addClass('disabled');
	});

	$('.commentbox').keyup(function(){//Update Char Counter
		var postLength = $(this).val().length;
		var charLeft = 300 - postLength;
		$('.count_char').text(charLeft);

		if(charLeft < 0) {
			$('.btn_post').addClass('disabled');
		} else if(charLeft >= 300) {
			$('.btn_post').addClass('disabled');
		} else {
			$('.btn_post').removeClass('disabled');
		}
	});

	$.ajax({
		url : "http://api.wunderground.com/api/f4a19adf0055efa0/conditions/q/CA/San_Jose.json",
		dataType : "jsonp",
		success : function(parsed_json) {
			var location = parsed_json['current_observation']['display_location'].city;
			var temp_f = parsed_json['current_observation']['temp_f'];
			//alert("Current temperature is: " + temp_f);
			//$('identifier').html('value'); To change contents of html
			$('#temp').html('The current temperature in ' + location +
			 ' is ' + temp_f + ' degrees fahrenheit.');
		},
		error : function(msg) {//In case of failure for request
			$('#temp').html('Couldn\'t load the weather data. Sorry about that');
		}
	});
};
$(document).ready(main);