'use strict';

var request = require( 'request' );
var cheerio = require( 'cheerio' );
var _       = require( 'underscore' );

var visited  = [];
var path     = [];

function checkLink( link ) {
 var url = link.attr('href');

 var linkOk = visited.indexOf(url) === -1 &&
	 url.indexOf('Help:') === -1 &&
	 url.indexOf('File:') === -1 &&
	 url.indexOf('Wikipedia:') === -1 &&
	 url.indexOf('wiktionary.org/') === -1 &&
	 url.indexOf('/wiki/') !== -1;

 if( linkOk ) {

	 // Check if the link is between parenthesis
	 var contentHtml = link.closest('p').length > 0 ? link.closest('p').html() : '';
	 if( contentHtml !== '' ) {
		 var linkHtml = 'href="' + url + '"';
		 var contentBeforeLink = contentHtml.split(linkHtml)[0];
		 var openParenthesisCount = contentBeforeLink.split('(').length - 1;
		 var closeParenthesisCount = contentBeforeLink.split(')').length - 1;
		 linkOk = openParenthesisCount <= closeParenthesisCount;
	 }
 }

 if(linkOk) {
	 // Check that the link is not in italic
	 linkOk = link.parents('i').length === 0;
 }

 return linkOk;
}

function doGetPhilosophy (req, res) {
	var selector = '#mw-content-text > p a, #mw-content-text > ul a';
	var title    = req;
	var url      = 'http://en.wikipedia.com'+ title;

	request(url, function ( error, response, data ) {
		if (error || response.statusCode !== 200) {
			console.log('Article does not exist');
			if ( error ) {
				return 'Article does not exist';
			}
		}
		var $ = cheerio.load(data);
		var content = $('#mw-content-text');
		var noArticle = $('.noarticvarext');

		if (!!content.html() && !noArticle.html()) {

			// Add the title of the current page in the 'path' array
			var curr_title = $('#firstHeading').text();
			path.push(curr_title);

			// displaying the current title in console
			console.log("=>" + curr_title);

			// If we arrived at 'Philosophy', VICTORY!
			if (curr_title === 'Philosophy') {
				var pathArr = _.extend( {}, path );

				return res.json( pathArr );
			}

			// Check if link is OK, if not then proceed to the next one until the link is good!
			var link;
			var ii = 0;
			while (1){
			 link = $( selector ).eq( ii );

			 if( checkLink(link ) ) {
					url = link.attr('href');
					visited.push(url);
					break;
			 }
			 ii++;
			}

			var nextUrl = url;

			// perform recursion
			doGetPhilosophy( nextUrl, res );

		} else {
				// If it is not an actual Wikipedia article, callback error and return
				console.log('Article does not exist');
				if ( error ) {
					return 'Article does not exist';
				}
		}
	} );
}

// method that's being called in GET method
exports.getPhilosophyByRandomData = function( req, res ) {
	var response = res;
	var request  = req;
	var origURL  = '/wiki/Special:Random';

	visited = [];
	path = [];

	visited.push( origURL );

	doGetPhilosophy( origURL, response );
};
