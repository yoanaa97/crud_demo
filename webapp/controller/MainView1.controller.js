sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/base/EventProvider",
	"sap/ui/base/ManagedObject",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, EventProvider, ManagedObject, JSONModel) {
	"use strict";

	return Controller.extend("home.kpmg.crud_demo.controller.MainView1", {
		onInit: function () {},

		oDataCall: function (oEvent) {
			// call oData service's function based on which button is clicked.
			//debugger;
			var usersModel = this.getView().getModel("usersModel");

			// CREATE******************
			if (oEvent.oSource.mProperties.text == "Create") {
				var obj = {};
				obj.Id = this.getView().byId("uniqueid").getValue();
				obj.Name = this.getView().byId("nameid").getValue();
				obj.Email = this.getView().byId("emailid").getValue();
				obj.Mobile = this.getView().byId("mobid").getValue();
				usersModel.create("/userdataSet", obj, {
					success: function (oData, oResponse) {
						// debugger;
						MessageToast.show("Record Created Successfully");
					},
					error: function (err, oResponse) {
						// debugger;
						MessageToast.show("Error while creating record");
						// .concat(err.response.statusText));
					}
				});
			}
			// READ******************
			else if (oEvent.oSource.mProperties.text == "Read") {
				var readurl = "/userdataSet?$filter=(Id eq '')";
				usersModel.read(readurl, {
					success: function (oData, oResponse) {
						// debugger;
						var userdata = new sap.ui.model.json.JSONModel({
							"Result": oData.results
						});
						var tab = this.getView().byId("userdatatable");
						tab.setModel(userdata);
						var i = 0;
						tab.bindAggregation("items", {
							path: "/Result",
							template: new sap.m.ColumnListItem({
								cells: [new sap.ui.commons.TextView({
									text: "{Id}",
									design: "H5",
									semanticColor: "Default"
								}), new sap.ui.commons.TextView({
									text: "{Name}",
									design: "H5",
									semanticColor: "Positive"
								}), new sap.ui.commons.TextView({
									text: "{Email}",
									design: "H5",
									semanticColor: "Positive"
								}), new sap.ui.commons.TextView({
									text: "{Mobile}",
									design: "H5",
									semanticColor: "Positive"
								})]
							})
						});
					},
					error: function (err) {
						// debugger;
					}
				});
			}
			// UPDATE******************
			if (oEvent.oSource.mProperties.text == "Update") {
				var object = {};
				object.Id = this.getView().byId("uniqueid").getValue();
				object.Name = this.getView().byId("nameid").getValue();
				object.Email = this.getView().byId("emailid").getValue();
				object.Mobile = this.getView().byId("mobid").getValue();
				var updateurl = "/userdataSet(Id='" + this.getView().byId("uniqueid").getValue() + "')";

				usersModel.update(updateurl, object, {
					success: function (oData, oResponse) {
						// debugger;
						MessageToast.show("Record Updated Successfully");
					},
					error: function (err, oResponse) {
						// debugger;
						MessageToast.show("Error while updating record"
							.concat(err.response.statusText));
					}
				});
			}
			// DELETE******************
			if (oEvent.oSource.mProperties.text == "Delete") {
				var delurl = "/userdataSet(Id='" + this.getView().byId("uniqueid").getValue() + "')";
				usersModel.remove(delurl, {
					success: function (oData, oResponse) {
						// debugger;
						MessageToast.show("Record Removed Successfully");
					},
					error: function (err, oResponse) {
						// debugger;
						MessageToast.show("Error while removing record");
						// .concat(err.response.statusText));
					}
				});
			}
		}
	});
});