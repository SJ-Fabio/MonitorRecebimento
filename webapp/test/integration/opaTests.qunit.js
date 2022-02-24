/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require(["delaware/pro/monitor/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
