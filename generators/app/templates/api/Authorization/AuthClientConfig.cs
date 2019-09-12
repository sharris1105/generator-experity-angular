using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using <%= namespaceName %>.ConfigModels;

namespace <%= namespaceName %>.Authorization
{
    public class AuthClientConfig : HttpClientConfig
    {
        public string AppName { get; set; }
        public string AppSecret { get; set; }

    }
}
