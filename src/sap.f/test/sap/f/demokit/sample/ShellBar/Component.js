sap.ui.define(['sap/ui/core/UIComponent'],
	function (UIComponent) {
		"use strict";

		return UIComponent.extend("sap.f.sample.ShellBar.Component", {
			metadata: {
				rootView: {
					"viewName": "sap.f.sample.ShellBar.ShellBar",
					"type": "XML",
					"async": true
				},
				dependencies: {
					libs: [
						"sap.f"
					]
				},
				config: {
					sample : {
						stretch : true,
						files : [
							"ShellBar.view.xml",
							"ShellBar.controller.js"
						]
					}
				}
			}
		});
	});
