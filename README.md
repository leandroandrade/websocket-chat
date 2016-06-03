# websocket-chat
====================

This project is a simple chat implementation with websockets. You can use Jboss EAP 6.4 or Tomcat 8.

English Details
------------
Tomcat: just enable javax.websocket-api lib in pom.xml.
Jboss: enable jboss-websocket-api_1.0_spec lib in pom.xml and need to use files into configurations-jboss folder.

* Copy files into configurations-jboss folder to "bin" folder into JBoss
* Access the folder 'bin' by console with JBoss running and execute the commands below:
* Linux: jboss-cli.sh --connect --file=configure-http-connector.cli
* Windows: jboss-cli.bat --connect --file=configure-http-connector.cli

To use HTTPS, change files above to use 'connector=https'

Detalhes em português
------------
Tomcat: habilita javax.websocket-api lib no pom.xml.
Jboss: habilita jboss-websocket-api_1.0_spec lib no pom.xml e use os arquivos do diretório configurations-jboss.

* Copiar os arquivos em anexo na pasta “bin” do JBOSS.
* Acessar a pasta “bin” pelo console e com o JBOSS rodando executar os seguintes comandos:
* Para Linux: jboss-cli.sh --connect --file=FILE_NAME <configure-http-connector.cli>
* Para Windows: jboss-cli.bat --connect --file=FILE_NAME <configure-http-connector.cli>

Pra funcionar com HTTPS tem que alterar os arquivos em anexo para usar “connector=https”
