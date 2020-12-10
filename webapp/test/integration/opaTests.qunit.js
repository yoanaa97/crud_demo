/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"home/kpmg/crud_demo/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});