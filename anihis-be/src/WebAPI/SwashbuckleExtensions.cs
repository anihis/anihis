using Microsoft.OpenApi.Models;

namespace WebAPI;
public static class SwashbuckleExtensions
{
    public static void AddOpenAPI(this IServiceCollection services)
    {
        //https://docs.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-5.0&tabs=visual-studio
        //TODO: consider: https://github.com/domaindrivendev/Swashbuckle.AspNetCore#swashbuckleaspnetcoreannotations
        services.AddSwaggerGen(options =>
        {
            //https://github.com/domaindrivendev/Swashbuckle.AspNetCore/issues/1607
            //options.CustomSchemaIds(type => type.ToString());//IMPORTANT: resolves "The same schemaId is already used for type" when application layer has a class of same name as domain

            //TODO: find equivalent
            //options.EnableAnnotations();
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "API",
                Version = "v1",
            });
            //options.UseAllOfForInheritance();
            //options.SelectSubTypesUsing(basetype =>
            //{
            //    return typeof(Startup).Assembly.GetTypes().Where(type => type.IsSubclassOf(basetype));
            //});
            options.UseOneOfForPolymorphism();

            //options.CustomSchemaIds(type => type.ToString()); //TODO: Djordje's change from another project (consider)

            //TODO: not needed?
            //options.SchemaFilter<OpenApiExcludeSchemaFilter>();//for POST body
            //options.OperationFilter<OpenApiExcludeOperationFilter>();//for GET query
            //options.OperationFilter<AuthorizeOperationFilter>();//TODO: consider


            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.ApiKey,
                In = ParameterLocation.Header,
                Description = "Please insert JWT with Bearer into field",
                Name = "Authorization"
            });

            options.AddSecurityRequirement(new OpenApiSecurityRequirement {
                {
                     new OpenApiSecurityScheme
                     {
                       Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                      },
                      new string[] { }
                    }
            });
        });

        //TODO: turn on
        //services.AddSwaggerGenNewtonsoftSupport();
    }

    public static void UseOpenAPI(this IApplicationBuilder app)
    {
        app.UseSwagger(options =>
        {
            options.RouteTemplate = "{documentName}/openapi.json";
        })
            .UseSwaggerUI(options =>
            {
                options.RoutePrefix = "";
                options.SwaggerEndpoint("v1/openapi.json", "API");
                //options.OAuthUsePkce();
            });
    }
}
