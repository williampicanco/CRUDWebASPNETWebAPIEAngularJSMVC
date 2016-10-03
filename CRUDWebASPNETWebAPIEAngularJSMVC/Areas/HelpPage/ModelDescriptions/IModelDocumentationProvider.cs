using System;
using System.Reflection;

namespace CRUDWebASPNETWebAPIEAngularJSMVC.Areas.HelpPage.ModelDescriptions
{
    public interface IModelDocumentationProvider
    {
        string GetDocumentation(MemberInfo member);

        string GetDocumentation(Type type);
    }
}