##  SETUP

dotnet tool install --global dotnet-ef

##  CORE

dotnet ef database update --context CoreDbContext --project src\Infrastructure\Infrastructure.csproj --startup-project src\WebAPI\WebAPI.csproj

dotnet ef migrations remove --context CoreDbContext --project src\Infrastructure\Infrastructure.csproj --startup-project src\WebAPI\WebAPI.csproj

dotnet ef migrations add Initial --context CoreDbContext --output-dir Persistence\Migrations --project src\Infrastructure\Infrastructure.csproj --startup-project src\WebAPI\WebAPI.csproj

dotnet ef migrations add Prescription --context CoreDbContext --output-dir Persistence\Migrations --project src\Infrastructure\Infrastructure.csproj --startup-project src\WebAPI\WebAPI.csproj
