FROM  mcr.microsoft.com/dotnet/core/sdk:2.2 AS build-env
WORKDIR /app

EXPOSE 80

COPY *.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/runtime:2.2
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "mikroservis-procesi.dll"]