# mssql-server-linux za bazu zaposlenih 
FROM mcr.microsoft.com/mssql/server:2017-GA-ubuntu
EXPOSE 1433

ENV ACCEPT_EULA='Y'
ENV SA_PASSWORD='bazaProcesi123'

RUN mkdir /opt/mssql-scripts
COPY kreirajBazu.sql /opt/mssql-scripts/

RUN ( /opt/mssql/bin/sqlservr --accept-eula & ) | grep -q "Service Broker manager has started" \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P $SA_PASSWORD -i /opt/mssql-scripts/kreirajBazu.sql \
    && pkill sqlservr 