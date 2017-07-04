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

var PARAMETER_ITEM_ICON = '<svg id="' + parameterItemMeta.icon + '" viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="11" fill="#39A866" /></svg>';

var buttonsStyle = {
    containerHeight: 60,
    height: 40,
    width: 82,
    marginRight: 15,
    marginTop: 10
};

var parameterItemViewer = (function(_super) {
    __extends(parameterItemViewer, _super);
    function parameterItemViewer(model, $container, options, parametersExtension) {
        _super.call(this, model, $container, options);
        var _this = this;
        this.$gridContainer = undefined;
        this.$buttonContainer = undefined;
        this.parametersExtension = parametersExtension;
        this.parametersContent = undefined;
        this.dialogButtonSubscribe = undefined;
        this._subscribeProperties();
        this.parametersExtension.showDialogButton(false);
        this.parametersExtension.subscribe(function() {
            _this._generateParametersContent();
        });
        this.dialogButtonSubscribe = this.parametersExtension.showDialogButton.subscribe(function() {
            _this.parametersExtension.showDialogButton(false);
        });
    }

    parameterItemViewer.prototype.setSize = function (width, height) {
        _super.prototype.setSize.call(this, width, height);
        this._setGridHeight();
    };

    parameterItemViewer.prototype.renderContent = function ($element, changeExisting, afterRenderCallback) {
        if (!changeExisting) {
            $element.empty();
            $element.css('overflow', 'auto');
            var _this = this;

            this.$gridContainer = $("<div />");
            $element.append(this.$gridContainer);
            this._generateParametersContent();

            this.$buttonContainer = $("<div />", {
                css: {
                    'height': buttonsStyle.containerHeight + 'px',
                    'width':  buttonsStyle.width * 2 + buttonsStyle.marginRight * 2 + 'px',
                    'float': 'right'
                }
            });
            
            $element.append(this.$buttonContainer);

            var $resetButton = this._createButton("Reset", function () {
                _this.parametersContent.resetParameterValues();
            });
            $resetButton.appendTo(this.$buttonContainer);
            var $submitButton = this._createButton("Submit", function () {
                _this._submitValues();
            });
            $submitButton.appendTo(this.$buttonContainer);
            if (this.getPropertyValue('automaticUpdates') != 'Off')
                this.$buttonContainer.hide();
        }
    };
    parameterItemViewer.prototype._generateParametersContent = function () {
        var _this = this;
        this.parametersContent = this.parametersExtension.generateContent(this.$gridContainer);
        this.parametersContent.grid.option('onDisposing', function () {
            _this.dialogButtonSubscribe.dispose();
            _this.parametersExtension.showDialogButton(true);
        });
        this.parametersContent.valueChanged.add(function() { return _this._updateParameterValues(); });
        this._setGridHeight();
        this._update({
            showHeaders: _this.getPropertyValue('showHeaders'),
            showParameterName: _this.getPropertyValue('showParameterName')
        });
    }
    parameterItemViewer.prototype._submitValues = function () {
        var _this = this;
        this.parametersContent.submitParameterValues();
        this._update({
            showHeaders: _this.getPropertyValue('showHeaders'),
            showParameterName: _this.getPropertyValue('showParameterName')
        });
    }
    parameterItemViewer.prototype._updateParameterValues = function () {
        this.getPropertyValue('automaticUpdates') != 'Off' ? this._submitValues() : null;
    }
    parameterItemViewer.prototype._setGridHeight = function () {
        var gridHeight = this.contentHeight();
        if (this.getPropertyValue('automaticUpdates') === 'Off')
            gridHeight -= buttonsStyle.containerHeight;
        this.parametersContent.grid.option('height', gridHeight);
    }
    parameterItemViewer.prototype._createButton = function (buttonText, onClick) {
        $button = $("<div />", {
            css: {
                'margin-right': buttonsStyle.marginRight + 'px',
                'margin-top': buttonsStyle.marginTop + 'px'
            }
        }).dxButton({
            text: buttonText,
            height: buttonsStyle.height + 'px',
            width: buttonsStyle.width + 'px',
            onClick: onClick
        });
        return $button;
    }
    parameterItemViewer.prototype._subscribeProperties = function () {
        var _this = this;
        this.subscribe('showHeaders', function (showHeaders) { _this._update({ showHeaders: showHeaders }); });
        this.subscribe('showParameterName', function (showParameterName) { _this._update({ showParameterName: showParameterName }); });
        this.subscribe('automaticUpdates', function (automaticUpdates) { _this._update({ automaticUpdates: automaticUpdates }) });
    };
    parameterItemViewer.prototype._update = function (options) {
        var _this = this;
        if (!!options.showHeaders) {
            this.parametersContent.grid.option('showColumnHeaders', options.showHeaders === 'On');
        }
        if(!!options.showParameterName) {
            this.parametersContent.valueChanged.empty();
            this.parametersContent.grid.columnOption(0, 'visible', options.showParameterName === 'On');
            this.parametersContent.valueChanged.add(function () { return _this._updateParameterValues(); });
        }
        if(!!options.automaticUpdates) {
            if (options.automaticUpdates == 'Off') {
                this.$buttonContainer.show();
            } else {
                this.$buttonContainer.hide();
            }
        }
        this._setGridHeight();
    };
    return parameterItemViewer;
}(DevExpress.Dashboard.customViewerItem));

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
