<h1 align="center">
	Windel Integrador API
</h1>

<h4 align="center">Firebird base integration API for Windel ERP</h4>

<p align="center">
  <a href="#about">About</a> • <a href="#dificults">Instalation</a> • <a href="#modifications">Authors</a>
</p>

<center>
<p>

![License](https://img.shields.io/badge/GPL-3/2007-green) ![Node](https://img.shields.io/badge/node-14.16.1-brightgreen) ![Express](https://img.shields.io/badge/express-4.17.1-yellow) ![Sequelize](https://img.shields.io/badge/sequelize-6.6.2-informational) ![Mariadb](https://img.shields.io/badge/mariadb-10.3.27-9cf)<br />
![Tests](https://img.shields.io/badge/tests-100%25-green) ![LastCommit](https://img.shields.io/badge/last%20commit-Jul-orange)

</p>
</center>

## About

This project was concept for integration more than one servers Windel ERP to interact between, traffic datas on localbase.

## Instalation

- Clone the repository
- Install all package with YARN
- Generate ".env" file with server ip and port
- Configure file database.json in directory "src/database/config" with sets of MariaDB server
- Generate migrations with command "$ sequelize db:migrate"
- Run the command "$ yarn build" to build files dist
- Run the command "$ yarn start" tu run application

## Authors

<a href="https://github.com/rscholant">Rafael Scholant</a><br />
<a href="https://github.com/ricovilela">Rico Vilela</a>

## License

GPL © [Windel Sistemas Ltda](https://github.com/windelsistemas/windel-integrador-api/blob/main/LICENSE)
