/*!
 * ${copyright}
 */

sap.ui.define([
	"sap/ui/fl/Utils",
	"sap/m/MessageBox",
	"sap/base/util/ObjectPath",
	"sap/ui/rta/util/validateStableIds",
	"sap/ui/rta/util/showMessageBox",
	"sap/base/Log",
	"sap/ui/rta/Utils"
], function (
	FlUtils,
	MessageBox,
	ObjectPath,
	validateStableIds,
	showMessageBox,
	Log,
	Utils
) {
	"use strict";

	function isValidApp(oComponent) {
		var oManifest = oComponent.getManifest();

		return (
			ObjectPath.get(["sap.app", "id"], oManifest) !== "sap.ui.documentation.sdk"
			&& !ObjectPath.get(["sap.ovp"], oManifest)
		);
	}

	return function (oRta) {
		// Avoid check in tests
		if (
			"QUnit" in window
			|| (
				window.frameElement
				&& window.frameElement.getAttribute("id") === "OpaFrame"
			)
		) {
			return;
		}

		var oComponent = FlUtils.getAppComponentForControl(oRta.getRootControlInstance());

		if (oComponent && isValidApp(oComponent)) {
			var oManifest = oComponent.getManifest();

			var vFlexEnabled = ObjectPath.get(["sap.ui5", "flexEnabled"], oManifest);
			if (typeof vFlexEnabled !== "boolean") {
				showMessageBox(
					oRta._getTextResources().getText("MSG_NO_FLEX_ENABLED_FLAG"),
					{
						icon: MessageBox.Icon.WARNING,
						title: oRta._getTextResources().getText("HEADER_WARNING"),
						styleClass: Utils.getRtaStyleClassName()
					}
				);
			} else {
				var aUnstableOverlays = validateStableIds(oRta._oDesignTime.getElementOverlays(), oComponent);

				if (aUnstableOverlays.length) {
					aUnstableOverlays.forEach(function (oElementOverlay) {
						Log.error("Control ID was generated dynamically by SAPUI5. To support SAPUI5 flexibility, a stable control ID is needed to assign the changes to.", oElementOverlay.getElement().getId());
					});

					showMessageBox(
						oRta._getTextResources().getText("MSG_UNSTABLE_ID_FOUND"),
						{
							icon: MessageBox.Icon.ERROR,
							title: oRta._getTextResources().getText("HEADER_ERROR"),
							styleClass: Utils.getRtaStyleClassName()
						}
					);
				}
			}
		}
	};
});