A custom **Parameter** item renders dashboard parameter dialog content inside the dashboard layout and edit parameter values.

This dashboard item supports the following capabilities:

- Edit and submit parameter values

## Installation

To add a custom Parameter item extension to the Web Dashboard, follow the steps below.

1. Download the required version of scripts [here](https://github.com/DevExpress/dashboard-extension-parameter-item/releases) and add the *dist* folder in your project.

2. Attach the download script to the project.
```xml
<script src="/your-path/dashboard-extension-parameter-item/dist/parameter-item.min.js"></script>
```

3. Handle the Web Dashboard's [BeforeRender](https://documentation.devexpress.com/#Dashboard/DevExpressDashboardWebScriptsASPxClientDashboard_BeforeRendertopic) event to perform client-side customization of the Web Dashboard control before the control and its elements have been rendered.
```xml
<dx:ASPxDashboard ID="ASPxDashboard1" runat="server" DashboardStorageFolder="~/App_Data">
  <ClientSideEvents BeforeRender="onBeforeRender" />
</dx:ASPxDashboard>
```

4. Register the custom item extension to add the Parameter to the Web Dashboard.

```javascript
function onBeforeRender(sender) {
  var dashboardControl = sender.GetDashboardControl();
  dashboardControl.registerExtension(CustomItemParametersExtension(dashboardControl));
}
```


## Settings
The **Parameter** dashboard item supports the following settings that you can configure in the Web Dashboard UI:

* **Show Headers** - Specifies whether the parameter table headers are shown.
* **Show Parameter Name** - Specifies whether the first column of the the parameter table with parameter names is shown.
* **Automatic Updates** - Specifies whether 'Submit' button to defer update and 'Reset' button to reset parameter values are shown.

## Development 

You can use this extension code as a base for your own [dashboard item extension](https://documentation.devexpress.com/#Dashboard/CustomDocument117546) development. 

Before you start, we advise you to [fork](https://help.github.com/articles/fork-a-repo/) this repository and work with your own copy.

1. Clone this extension to get a local copy of the repository.
```Batchfile
git clone https://github.com/DevExpress/dashboard-extension-parameter-item.git
cd dashboard-extension-parameter-item
```

2. In this extension we use the [Node.js](https://nodejs.org/en/about/) toolset. Use the command below to install all modules listed as dependencies in the extension's **package.json** file.
```Batchfile
npm install
```

3. Then install [Gulp](http://gulpjs.com) to build the solution. You can install it globally...
```Batchfile
npm install -g gulp
gulp build
```

... or use a local Gulp version.
```Batchfile
.\node_modules\.bin\gulp build
```

You can find the resulting files at ```...\dashboard-extension-parameter-item\dist```:
**parameter-item.js** and **parameter-item.min.js**.


## License

This extension is distributed under the **MIT** license (free and open-source), but can only be used with a commercial DevExpress Dashboard software product. You can [review the license terms](https://www.devexpress.com/Support/EULAs/NetComponents.xml) or [download a free trial version](https://go.devexpress.com/DevExpressDownload_UniversalTrial.aspx) of the Dashboard suite at [DevExpress.com](https://www.devexpress.com).

## Support & Feedback

* Follow [this guideline](https://www.devexpress.com/Support/Center/Question/Details/T491859) for general information about a custom extension.
* To learn how to create a custom item, see the following [KB article](https://www.devexpress.com/Support/Center/Question/Details/T491984).
* To address questions regarding the Web Dashboard and JavaScript API, use [DevExpress Support Center](https://www.devexpress.com/Support/Center).
