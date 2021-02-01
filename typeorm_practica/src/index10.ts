import "reflect-metadata";
import { createConnection, getConnection, getRepository } from "typeorm";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

createConnection()
  .then(async (connection) => {
    const user = await getRepository(User)
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.id = :id", { id: 2 })
      .getOne();

    console.log("user select", user);

    /*     const results = await getRepository(User)
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { firstName: "Héctor", lastName: "Valdivia", age: 30 },
        { firstName: "Carlos", lastName: "Luque", age: 50 },
      ])
      .execute();

    console.log("results insert", results); */

    const update = await getRepository(User)
      .createQueryBuilder()
      .update(User)
      .set({ firstName: "Luis", lastName: "Cáceres" })
      .where("user.id = :id", { id: 3 })
      .execute();

    const userDeleted = await getRepository(User)
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("user.id = :id and user.age = :age", { id: 4, age: 50 })
      .execute();
  })
  .catch((error) => console.log(error));
