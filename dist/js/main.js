(function($){
	"use strict";

	// init select styler
	$('.select, .checkbox, .radio').styler();

	// certificates carousel
	$('.js-cert-list, .js-vacancy-gallery').slick({
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

	// input file
	$('.js-input-file').change(function() {
		$(this).next('label[for="' + this.id + '"]').text($(this).val().replace(/^.*\\/, ""));
	});

	// about us gallery
	$('.js-about-gallery').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		asNavFor: '.js-about-gallery-nav'
	});
	$('.js-about-gallery-nav').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: false,
		asNavFor: '.js-about-gallery',
		dots: true,
		//centerMode: true,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 1023,
				settings: {
					variableWidth: true,
					centerMode: true,
				}
			},
		]
	});

	// product gallery
	$('.js-product-gallery-main').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		adaptiveHeight: true,
		asNavFor: '.js-product-gallery-nav'
	});
	$('.js-product-gallery-nav').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.js-product-gallery-main',
		//centerMode: true,
		focusOnSelect: true,
	});

	// open modal window
	$('.js-modal').fancybox({
		touch: false,
		lang : 'ru',
		i18n : {
			'ru' : {
				CLOSE: 'Закрыть',
				ERROR: 'Невозможно загрузить данные. Попробуйте еще раз.',
			}
		},
		afterLoad: function(current) {
			$(this).find('input[autofocus]').focus();
		}
	});

	$('.js-notice-close').on('click', function(e) {
		e.preventDefault();
		$(this).closest('.notice-block').remove();
	});

	// open image
	$('.js-fancybox').fancybox();

	// modal city tip
	$('.js-modal-city-example').on('click', function(e) {
		e.preventDefault();
		var thisText = $(this).text();
		$('.modal-city__input').val(thisText);
	});

	// modal city autocomplete
	$('.js-modal-city-autocomplete').easyAutocomplete({
		url: 'js/towns.js',
		list: {
			match: {
				enabled: true
			}
		},
		highlightPhrase: false
	});

	// modal callback tabs
	$('.modal-callback__tabs').each(function(i) {
		var storage = localStorage.getItem('tab' + i);
		if (storage) {
			$(this).find('.modal-callback__tab').removeClass('modal-callback__tab--active').eq(storage).addClass('modal-callback__tab--active').closest('.modal-callback__form').find('.modal-callback__main').removeClass('modal-callback__main--active').eq(storage).addClass('modal-callback__main--active');
		}
	});
	$('.modal-callback__tabs').on('click', '.modal-callback__tab:not(.modal-callback__tab--active)', function() {
		$(this).addClass('modal-callback__tab--active').siblings().removeClass('modal-callback__tab--active').closest('.modal-callback__form').find('.modal-callback__main').removeClass('modal-callback__main--active').eq($(this).index()).addClass('modal-callback__main--active');
		var ulIndex = $('.modal-callback__tabs').index($(this).parents('.modal-callback__tabs'));
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