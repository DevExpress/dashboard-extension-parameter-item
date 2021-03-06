var PARAMETER_ITEM_EXTENSION_NAME = 'ParameterItem';

var parameterItemMeta = {
    properties: [{
        propertyName: 'showHeaders',
        editor: DevExpress.Dashboard.Metadata.editorTemplates.buttonGroup,
        displayName: "Show Headers",
        values: {
            Off: "Off",
            On: "On"
        },
        defaultVal: 'On'
    }, {
        propertyName: 'showParameterName',
        editor: DevExpress.Dashboard.Metadata.editorTemplates.buttonGroup,
        displayName: "Show Parameter Name",
        values: {
            Off: "Off",
            On: "On"
        },
        defaultVal: 'On'
    }, {
        propertyName: 'automaticUpdates',
        editor: DevExpress.Dashboard.Metadata.editorTemplates.buttonGroup,
        displayName: "Automatic Updates",
        values: {
            Off: "Off",
            On: "On"
        },
        defaultVal: 'Off'
    }],

    icon: PARAMETER_ITEM_EXTENSION_NAME,

    title: "Parameters"
};
