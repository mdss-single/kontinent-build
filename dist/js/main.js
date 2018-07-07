(function($){
	"use strict";

	// certificates carousel
	$('.js-cert-list').slick();

	// reviews carousel
	$('.js-homepage-reviews').slick();

	// showroom carousel
	$('.js-homepage-showroom').slick({
		slidesToScroll: 1,
		mobileFirst: true,
		responsive: [
		{
			breakpoint: 479,
			settings: {
				slidesToShow: 2,
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 1279,
			settings: {
				slidesToShow: 4,
			}
		}
		]
	});

})(jQuery);