const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("toughts", "kaidev", "1234", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    sequelize.authenticate();
    console.log("Conectado ao banco de dados.");
  } catch (error) {
    console.log(`Não foi possível conectar ao banco de dados: ${err}`);
  }
})();

module.exports = sequelize;
