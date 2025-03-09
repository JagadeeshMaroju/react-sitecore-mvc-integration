using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sitecore.Mvc.Presentation;

namespace SitecoreMvc.Project.Integration.Controllers
{
    public class ReactController : Controller
    {
        public ActionResult RenderReactApp()
        {

            var dataSource = RenderingContext.Current.Rendering.Item;
            var model = new
            {
                title = dataSource.Fields["Title"].Value,
                description = dataSource.Fields["Description"].Value,
            };
            return View("~/Views/React/RenderReactApp.cshtml", model);
        }
    }
}
