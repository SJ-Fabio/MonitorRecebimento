sap.ui.define([
    "./BaseController",
	"sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController,JSONModel) {
        "use strict";

        return BaseController.extend("delaware.pro.monitor.controller.S1", {
            onInit: function () {

                this._oRouter = this.getOwnerComponent().getRouter();

				let oRoute = this._oRouter.getRoute("home");
				oRoute.attachPatternMatched(this.onCallHome,this);

            },

            onCallHome: function(oEvent){

				
			},

            onItemPress: function(oEvent){

                var sDocument = oEvent.getParameter("listItem").getCells()[0].getText();
                this.navTo("Document",{ id: sDocument });

            }
        });
    });
