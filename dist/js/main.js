(function($){
	"use strict";

	// certificates carousel
	$('.js-cert-list').slick({
		mobileFirst: true,
		responsive: [
		{
			breakpoint: 639,
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

	// reviews carousel
	$('.js-homepage-reviews').slick({
		mobileFirst: true,
		responsive: [
		{
			breakpoint: 639,
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