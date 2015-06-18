/**
 * Main JavaScript
 * Energy POrtal
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */

function dialog() {

	// calling the dialog.
	var video_dialog = new Dialog();

	// Modify the dialog.

	video_dialog.setTitle(language_handler.getText(null, 'dialog_video_title'));
	video_dialog.setSize(550, 366);

	$('a.youtube').not('.mobile').click(function(event) {

		// prevent link from working.
		event.preventDefault();

		// set content from URL and show it.
		video_dialog.setContentFromURL($(this).attr('href'));
		video_dialog.showWhenReady();
		video_dialog.setClearOnClose(true);
	});
}

Site.on_load = function() {
	// Initiate dialog
	dialog();
	// Setting fixed menu color
	var menu = $('header div.menu');
	var form = $('header div.menu form');
	var target1 = $('div.about_article h2:first-of-type').offset().top - 200;
	var target = $('div.form_wrap').offset().top;

	$(window).scroll(function(event) {
		if( $(window).scrollTop() > target ) {

			menu.css('background-color','white');


		} else {

		    menu.css('background-color','rgba(255, 255, 255, 0.7)');
		}
	});

	$(window).scroll(function(event) {
		if( $(window).scrollTop() > target1) {
			form.css('opacity','1')
				.css('visibility',"visible");

		} else {
			form.css('opacity','0')
				.css('visibility','hidden');

		}
	});

	// handle analytics event
	$('form').on('analytics-event', function(event, data) {
		if (!data.error)
			dataLayer.push({
            	'event':'leadSent'
            });
	});
};


// connect document `load` event with handler function
$(Site.on_load);
