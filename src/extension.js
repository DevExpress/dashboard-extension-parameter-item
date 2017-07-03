function parameterItemExtension(dashboardControl) {
    var parametersExtension = dashboardControl.findExtension("dashboard-parameter-dialog");
    if (!parametersExtension)
        throw Error('The "dashboard-parameter-dialog" extension does not exist. To register this extension, use the DashboardControl.registerExtension method.');
    this.name = PARAMETER_ITEM_EXTENSION_NAME;
    this.metaData = parameterItemMeta;
    this.createViewerItem = function (model, $element, content) {
        return new parameterItemViewer(model, $element, content, parametersExtension);
    };
    if (!!dashboardControl) {
        dashboardControl.registerIcon(PARAMETER_ITEM_ICON);
    }
}
