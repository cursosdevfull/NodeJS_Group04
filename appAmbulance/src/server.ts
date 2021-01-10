import {
  DatabaseBootstrap,
  IDatabaseBootstrap,
} from "./bootstrap/database.bootstrap";

const start = async () => {
  const databaseBootstrap: IDatabaseBootstrap = new DatabaseBootstrap();

  try {
    await databaseBootstrap.initialize();
  } catch (error) {
    console.log(error);
  }
};

start();
