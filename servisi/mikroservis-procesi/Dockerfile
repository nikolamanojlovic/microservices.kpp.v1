FROM  mcr.microsoft.com/dotnet/core/sdk:2.2-alpine3.9 AS build
WORKDIR /app

COPY *.sln .
COPY mikroservis-procesi/*.csproj ./mikroservis-procesi/
RUN dotnet restore

COPY . .
WORKDIR /app/mikroservis-procesi
RUN dotnet build

FROM build AS publish
WORKDIR /app/mikroservis-procesi

RUN dotnet publish -c Release -o out /p:ShowLinkerSizeComparison=true 

FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-alpine3.9 AS runtime
ENV DOTNET_USE_POLLING_FILE_WATCHER=true
WORKDIR /app
COPY --from=publish /app/mikroservis-procesi/out ./

EXPOSE 80

RUN chmod +x ./mikroservis-procesi.dll
ENTRYPOINT ["dotnet", "./mikroservis-procesi.dll"]