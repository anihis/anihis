##  SETUP

dotnet tool install --global dotnet-ef

##  CORE

dotnet ef migrations remove --context CoreDbContext --project src\Core.Infrastructure\Core.Infrastructure.csproj --startup-project src\Core.WebAPI\Core.WebAPI.csproj

dotnet ef migrations add Initial --context CoreDbContext --output-dir Persistence\Migrations --project src\Core.Infrastructure\Core.Infrastructure.csproj --startup-project src\Core.WebAPI\Core.WebAPI.csproj
