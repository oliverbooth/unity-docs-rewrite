FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["UnityDocs/UnityDocs.csproj", "UnityDocs/"]
RUN dotnet restore "UnityDocs/UnityDocs.csproj"
COPY . .
WORKDIR "/src/UnityDocs"
RUN dotnet build "UnityDocs.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "UnityDocs.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "UnityDocs.dll"]
