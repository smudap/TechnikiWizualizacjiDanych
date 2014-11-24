var com = com || {};
com.nature = com.nature || {};

(function ($) {

	var d = document,
		functionsToInit = [
		'initBookmarking',
		'initDeliveryServices',
		'initAuthors',
		'initAudio',
		'initCompoundNumbers',
		'initGlossaryTerms',
		'initCollapsed',
		'initBrightcoveSettings',
		'initFigureBrowserTabs',
		'initFigureBrowser',
		'initDbLinks',
		'initDraggable',
		'initReferenceContextLinks',
		'initCommenting',
		'initBoxes',
		'initArticleNavigation',
		'initToggleAll',
		'initReshighCarousel',
		'initIcbViewer',
		'initDownloading',
		'initCitations',
		'initCopyLink',
		'initRelatedVideoThumb',
		'initTooltips',
		'initMOPcontainer',
		'initHighlighting',
		'initReadCube',
		'initSequences',
		'initSummBox',
		'initRelatedFigureTabs',
		'initClickTrack',
		'initExcerptToggle'
	];
	// loops through items to be initialised and removes those not used on mobile display
	var n = functionsToInit.length;
	var toExclude = {};
	if ($(d.body).hasClass('small-screen')) {
		toExclude.initDraggable = 0;
	}
	if (com.nature.Configuration.get('isMetrics')) {
		toExclude.initCompoundNumbers = 0;
		toExclude.initGlossaryTerms = 0;
		toExclude.initDeliveryServices = 0;
		toExclude.initCompoundViewer = 0;
		toExclude.initFigureBrowser = 0;
		toExclude.initDraggable = 0;
		toExclude.initCommenting = 0;
		toExclude.initReshighCarousel = 0;
		toExclude.IcbViewer = 0;
		toExclude.Downloading = 0;
		toExclude.initToggleAll = 0;
		toExclude.initRelatedVideoThumb = 0;
		toExclude.initHighlighting = 0;
	}

	while (n--) {
		if (functionsToInit[n] in toExclude) {
			functionsToInit.splice(n, 1);
		}
	}

	$(function () {
		com.nature.articleInstance = new com.nature.ArticleSetup();
		for (var i = 0; functionsToInit[i]; ++i) {
			com.nature.articleInstance[functionsToInit[i]]();
		}
	});
}(jQuery));
