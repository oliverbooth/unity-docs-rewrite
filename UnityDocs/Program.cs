using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using UnityDocs;

await Host.CreateDefaultBuilder(args)
          .ConfigureWebHostDefaults(webBuilder => webBuilder.UseStartup<Startup>())
          .Build()
          .RunAsync();
