import "reflect-metadata";
import { createConnection, getConnection, getRepository } from "typeorm";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

createConnection()
  .then(async (connection) => {
    /*     const user = await getRepository(User)
      .createQueryBuilder("usuario")
      .where("usuario.id = :id", { id: 2 })
      .getOne(); */

    const obj = getConnection()
      .createQueryBuilder()
      .select(["user.lastName", "user.firstName"])
      .from(User, "user")
      .where("user.id = :id", { id: 2 });

    const user = await obj.getOne();
    const userSQL = obj.getSql();
    console.log("user", user, "userSQL", userSQL);
  })
  .catch((error) => console.log(error));
