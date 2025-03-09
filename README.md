# Sitecore MVC + React Integration

This repository demonstrates how to integrate a React application into a Sitecore MVC project. It provides a structured approach to embedding a React app within a Sitecore rendering while passing dynamic data from Sitecore to React.

## Features
- Use React components inside Sitecore MVC renderings
- Pass Sitecore context data to React seamlessly
- Example Sitecore MVC Controller and View setup
- Example React app with TypeScript

## Prerequisites
- Sitecore XP/XM installed
- Node.js and npm installed
- .NET Framework and MVC setup

---

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/JagadeeshMaroju/react-sitecore-mvc-integration.git
cd react-sitecore-mvc-integration
```

### 2. Setup the React App
```sh
cd sitecore-react-app
npm install
npm run build
```
This will generate the production build files in the `/build` directory.

### 3. Add React App to Sitecore MVC
Copy the React build directory into your Sitecore MVC project under `intetpub/wwwroot/`.

### 4. Implement Sitecore MVC Controller
```csharp
using System.Web.Mvc;
using Sitecore.Mvc.Presentation;
using YourNamespace.Models;

namespace YourNamespace.Controllers
{
       public ActionResult RenderReactApp()
        {

            var dataSource = RenderingContext.Current.Rendering.Item;
            var model = new
            {
                title = dataSource.Fields["Title"].Value,
                resultsPerPage = dataSource.Fields["Description"].Value,
            };
            return View("~/Views/React/RenderReactApp.cshtml", model);
        }
}
```

### 5. Implement Sitecore MVC View
```html
@{
    var manifestPath = Server.MapPath("~/build/asset-manifest.json");

    var manifest = System.IO.File.Exists(manifestPath)
        ? Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, object>>(System.IO.File.ReadAllText(manifestPath))
        : new Dictionary<string, object>();

    var files = manifest.ContainsKey("files")
        ? Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, string>>(manifest["files"].ToString())
        : new Dictionary<string, string>();

    var jsFile = files.ContainsKey("main.js") ? files["main.js"] : "dist/main.js";
    var cssFile = files.ContainsKey("main.css") ? files["main.css"] : "dist/main.css";
}

<link rel="stylesheet" href="@Url.Content("~" + cssFile)">
<script src="@Url.Content("~" + jsFile)"></script>


@model dynamic
<div id="react-root"></div>
<script>
  window.ReactModel = @Html.Raw(Json.Encode(Model));
</script>


<script>
    document.addEventListener("DOMContentLoaded", function () {
        const root = document.getElementById("react-root");
        if (window.ReactApp && window.ReactApp.renderReactComponent) {
            window.ReactApp.renderReactComponent(root);
        }
    });
</script>
```

### 6. Implement the React App Entry Point (index.tsx)
```tsx
import ReactDOM from "react-dom/client";
import Greeting from "./components/Greeting";


export const renderReactComponent = (rootElement: HTMLElement, props: any) => {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<Greeting {...props} />);
};

window.ReactApp = { renderReactComponent };
```

### 7. Implement a Simple React Component (Greeting.tsx)
```tsx
import React from "react";

type Props = {
  title: string;
  description: string;
};

const Greeting: React.FC<Props> = ({ title, description }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Greeting;
```

### 8. Run Sitecore and Test
Ensure your Sitecore instance is running and browse the page where the rendering is added.

---


## License
MIT License.

