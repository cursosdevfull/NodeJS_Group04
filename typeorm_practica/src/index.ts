import "reflect-metadata";
import {
  Brackets,
  createConnection,
  getConnection,
  getManager,
  getRepository,
} from "typeorm";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

createConnection()
  .then(async (connection) => {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.id = :id", { id: 2 })
      .getOne();

    console.log("user select", user);

    const userParameter = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.id = :id")
      .setParameter("id", 2)
      .getOne();

    console.log("userParameter", userParameter);

    const userAge = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.age > 24")
      .getMany();

    console.log("userAge", userAge);

    const userInAge = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.age IN (:...ages)", { ages: [28, 30] })
      .getMany();

    console.log("userInAge", userInAge);

    const usersWhere = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.firstName = :firstName", { firstName: "Karla" })
      .andWhere("user.age > :age", { age: 40 })
      .getMany();

    console.log("usersWhere", usersWhere);

    // const name = "'; delete from user where id>0; -- ";

    const usersOrWhere = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.firstName = :firstName", { firstName: "Karla" })
      .orWhere("user.age > :age", { age: 40 })
      .getMany();

    // ("select * from user where firstName=''; delete from user where id>0; -- ' and age>40");

    console.log("usersOrWhere", usersOrWhere);

    const usersFields = await getRepository(User)
      .createQueryBuilder("user")
      .select(["user.id", "user.firstName"])
      .where("user.firstName = :firstName", { firstName: "Karla" })
      .orWhere("user.age > :age", { age: 40 })
      .getMany();

    console.log("usersFields", usersFields);

    const usersBrackets = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.id >  :id", { id: 2 })
      .andWhere(
        new Brackets((qb) => {
          qb.where("user.firstName =:firstName", {
            firstName: "Claudia",
          }).orWhere("user.age > :age", { age: 30 });
        })
      )
      .getMany();

    console.log("usersBrackets", usersBrackets);

    const { sum } = await getRepository(User)
      .createQueryBuilder("user")
      .select("SUM(user.age)", "sum")
      .where("user.age > :age", { age: 24 })
      .getRawOne();

    console.log("sum", sum);

    const sumTotal = await getRepository(User)
      .createQueryBuilder("user")
      .select("user.age age")
      .addSelect("SUM(user.age)", "sum")
      .groupBy("user.age")
      .getRawMany();

    console.log("sumTotal", sumTotal);

    const usersHaving = await getRepository(User)
      .createQueryBuilder("user")
      .having("user.id > :id", { id: 2 })
      .getRawMany();

    console.log("usersHaving", usersHaving);

    const usersOrder = await getRepository(User)
      .createQueryBuilder("user")
      .orderBy("user.age", "DESC")
      .addOrderBy("user.firstName", "ASC")
      .getRawMany();

    console.log("usersOrder", usersOrder);

    const usersLimit = await getRepository(User)
      .createQueryBuilder("user")
      .orderBy("user.age", "DESC")
      .addOrderBy("user.firstName", "ASC")
      .limit(3)
      .getRawMany();

    console.log("usersLimit", usersLimit);

    const usersOffset = await getRepository(User)
      .createQueryBuilder("user")
      .orderBy("user.age", "DESC")
      .addOrderBy("user.firstName", "ASC")
      .limit(3)
      .offset(2)
      .getRawMany();

    console.log("usersOffset", usersOffset);

    const usersLeftJoin = await getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.cars", "cars")
      //.getSql();
      .getMany();

    console.log("usersLeftJoin", usersLeftJoin);

    const usersLeftJoinConditional = await getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.cars", "cars")
      .where("user.age < :age", { age: 40 })
      // .getSql();
      .getMany();

    console.log("usersLeftJoinConditional", usersLeftJoinConditional);

    const usersPagination = await getRepository(User)
      .createQueryBuilder("user")
      .skip(3)
      .take(3)
      .getMany();

    console.log("usersPagination", usersPagination);

    const age = 28;
    const entityManager = getManager();
    // const results = await entityManager.query(`call getUsers(${age});`);
    /*const results = await entityManager.query(
      `select * from user where age <= ${age}`
    );*/
    const results = await entityManager.query("select * from allUsers");

    console.log("results", results);

    // console.log("results sp", results[0]);
  })
  .catch((error) => console.log(error));
