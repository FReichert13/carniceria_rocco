$(document).ready(function(){
	// Header scroll

	$(window).on("scroll", function() {
		if($(window).scrollTop() > 30) {
			$(".header").addClass("active");
		} else {
		   $(".header").removeClass("active");
		}
	});
	
	// Modal

	$('.cart').on('click', function(){
		$('.modal').css({'display': 'block'});
	})
	$('.back').on('click', function(){
		$('.modal').css({'display': 'none'});
	})
	$(document).on('click', function(e){
		if (e.target == $('.modal')) {
			$('.modal').css({'display': 'none'});
		}
	})
});
async function getAllProducts(){
    const response = await fetch('../assets/json/products.json');
    return response.json()
}
