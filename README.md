A custom **Parameter** item renders [dashboard parameter dialog](https://documentation.devexpress.com/Dashboard/117571/Preparing-the-Designer-and-Viewer-Applications/Web-Dashboard/Manage-Dashboard-Parameters) content inside the dashboard layout and allows you to edit and submit parameter values.

## Installation

To add a custom Parameter item to the Web Dashboard, follow the steps below.

1. Download the required version of scripts [here](https://github.com/DevExpress/dashboard-extension-parameter-item/releases).

2. Add the *dist* folder in your project.

3. Attach the download script to the project inside the `<body>` section before the end tag onto the page containing Web Dashboard.
```xml
<body>
    <!-- ... -->
    <script src="/dist/parameter-item.min.js"></script>
</body>
```

4. Handle the Web Dashboard's [BeforeRender](https://documentation.devexpress.com/#Dashboard/DevExpressDashboardWebScriptsASPxClientDashboard_BeforeRendertopic) event to perform client-side customization of the Web Dashboard control before the control and its elements have been rendered.
<!-- For ASP.NET Web Forms -->
<dx:ASPxDashboard ID="ASPxDashboard1" runat="server" DashboardStorageFolder="~/App_Data/Dashboards">
  <ClientSideEvents BeforeRender="onBeforeRender" />
</dx:ASPxDashboard>
```
```C#
@* For ASP.NET MVC *@
@Html.DevExpress().Dashboard(settings => {
    settings.Name = "Dashboard";
    settings.ClientSideEvents.BeforeRender = "onBeforeRender";
}).GetHtml()
```

5. Register the custom item extension to add the Parameter item to the Web Dashboard.

```javascript
function onBeforeRender(sender) {
  var dashboardControl = sender.GetDashboardControl();
  dashboardControl.registerExtension(new parameterItemExtension(dashboardControl));
}
```


## Settings
The **Parameter** dashboard item supports the following settings that you can configure in the Web Dashboard UI:
![wdd-extension-parameter](https://user-images.githubusercontent.com/17986517/27904791-8fc4f18c-6246-11e7-882b-12c2b5541be9.png)

* **Show Headers** - Specifies whether to show headers in the parameters table.
* **Show Parameter Name** - Specifies whether to show the first column with parameter names.
* **Automatic Updates** - Specifies whether a parameter item is updated automatically. When enabled, this option hides the 'Submit' and 'Reset' buttons.

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
