sap.ui.define([
	"./BaseController",
    'sap/ui/model/json/JSONModel'

], function(BaseController,JSONModel) {
	"use strict";

	    return BaseController.extend("delaware.pro.monitor.controller.S2", {

            onInit: function(){

                this._oRouter = this.getOwnerComponent().getRouter();
                let oRoute = this._oRouter.getRoute("Document");
    
                oRoute.attachPatternMatched( this.onCallDocumentFlow, this ); 
   
            },

            onCallDocumentFlow: function(oEvent){

                var sPath =  oEvent.getParameters().arguments.id;
                var nodes = this.getModel("local").getData().nodes;
                var documentos = this.getModel("local").getData().documentos;
                var display = [];
                
                nodes.filter((el)=>{
                    
                    if (el.PurchaseOrder === sPath){

                        display.push({
                            "PurchaseOrder": el.PurchaseOrder,
                            "id":  el.id,
                            "lane": el.lane,
                            "title": el.title,  
                            "children": el.children,  
                            "titleAbbreviation":  el.titleAbbreviation,
                            "state":  el.state,
                            "stateText":  el.stateText,
                            "texts": el.texts }) ;
                    }

                  });

                  if (display.length === 0){
                    display.push({
                        "PurchaseOrder": "",
                        "id":  "0",
                        "lane": "0",
                        "title": "Aguardando Processamento",  
                        "children": null,
                        "titleAbbreviation":  "Aguardando...",
                        "state":  "Planned",
                        "stateText":  "Documento Pendente",
                        "texts": [] }) ; 
                  }

                  var oModel = new JSONModel(display);
                  this.getView().setModel(oModel, "DocumentDisplay")
                  this.getModel("local").getData().PurchaseOrder = "Pedido de Compras: " + sPath;

                  
                  var documento = documentos.find(doc => doc.PurchaseOrder === sPath);

                  var oDocumentoHeader =        
                  {
                    "StatusGeral": documento.StatusGeral,
                    "StateOfStatusGeral": documento.StateOfStatusGeral,
                    "PurchaseOrder": documento.PurchaseOrder,
                    "DataAgendamento": documento.DataAgendamento,
                    "DataFim": documento.DataFim,
                    "LocalRecebimento": documento.LocalRecebimento,
                    "ICMS": documento.ICMS,
                    "ICMS_ST": documento.ICMS_ST,
                    "IPI": documento.IPI,
                    "POS": documento.POS,
                    "COFINS": documento.COFINS,
                    "Moeda": documento.Moeda,
                    "Total": documento.Total
        
                    };

                oModel = new JSONModel(oDocumentoHeader);
                this.getView().setModel(oModel, "DocumentoHeader")
                 
                
            }

	});
});