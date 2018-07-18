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

	// show menu
	$('.js-menu').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		showMenu();
	});
	$(document).on('click', function(e) {
		if (!$(e.target).closest('.nav__main').length) {
			hideMenu();
		}
	});

	// sticky nav
	$('.nav').stick_in_parent({
		parent: 'body',
	});

	// doubt types
	$('.js-doubt-compare .doubt__types').each(function(i) {
		var storage = localStorage.getItem('tab' + i);
		if (storage) {
			$(this).find('.doubt__type').removeClass('doubt__type--active').eq(storage).addClass('doubt__type--active').closest('.doubt__compare').find('.doubt__content').removeClass('doubt__content--active').eq(storage).addClass('doubt__content--active');
		}
	});
	$('.js-doubt-compare .doubt__types').on('click', '.doubt__type:not(.doubt__type--active)', function() {
		$(this).addClass('doubt__type--active').siblings().removeClass('doubt__type--active').closest('.doubt__compare').find('.doubt__content').removeClass('doubt__content--active').eq($(this).index()).addClass('doubt__content--active');
		var ulIndex = $('.js-doubt-compare .doubt__types').index($(this).parents('.js-doubt-compare .doubt__types'));
		localStorage.removeItem('tab' + ulIndex);
		localStorage.setItem('tab' + ulIndex, $(this).index());
	});

	function showMenu() {
		if (!$('.nav__cover').length) $('body').prepend('<div class="nav__cover"></div>');
		$('html').addClass('no-scroll');
		$('.nav__main').addClass('nav__main--active');
	}

	function hideMenu() {
		if ($('html').hasClass('no-scroll')) $('html').removeClass('no-scroll');
		if ($('.nav__cover').length) {
			$('.nav__cover').remove();
		}
		$('.nav__main').removeClass('nav__main--active');
	}

})(jQuery);