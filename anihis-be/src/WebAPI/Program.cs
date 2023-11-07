using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using anihis.Infrastructure.Persistence;
using WebAPI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration, builder.Environment);
builder.Services.AddWebAPIServices();
builder.Services.AddHttpClient();

builder.Services.AddScoped<IBaseRepository<Animal>, BaseRepository<ICoreDbContext, Animal>>();
builder.Services.AddScoped<IBaseRepository<Breed>, BaseRepository<ICoreDbContext, Breed>>();
builder.Services.AddScoped<IBaseRepository<HealthRecord>, BaseRepository<ICoreDbContext, HealthRecord>>();
builder.Services.AddScoped<IBaseRepository<Owner>, BaseRepository<ICoreDbContext, Owner>>();
builder.Services.AddScoped<IBaseRepository<Species>, BaseRepository<ICoreDbContext, Species>>();
builder.Services.AddScoped<IBaseRepository<User>, BaseRepository<ICoreDbContext, User>>();
builder.Services.AddScoped<IBaseRepository<Veterinarian>, BaseRepository<ICoreDbContext, Veterinarian>>();
builder.Services.AddScoped<IBaseRepository<VeterinaryClinic>, BaseRepository<ICoreDbContext, VeterinaryClinic>>();

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("CorsPolicy", builder => builder
//        .AllowAnyMethod()
//        .AllowAnyHeader()
//        .SetIsOriginAllowed(origin => true)
//        .AllowCredentials());
//});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CorsPolicy",
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4000")
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();

    // Initialise and seed database
    using (var scope = app.Services.CreateScope())
    {
        var initialiser = scope.ServiceProvider.GetRequiredService<CoreDbContextInitialiser>();
        await initialiser.InitialiseAsync();
    }
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseOpenAPI();

app.UseHealthChecks("/health");
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapRazorPages();

app.MapFallbackToFile("index.html");

app.Run();