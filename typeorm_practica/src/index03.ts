import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

createConnection()
  .then(async (connection) => {
    const carRepository = getRepository(Car);
    const listCars = await carRepository.find({
      relations: ["user"],
      where: { year: 2021 },
    });
    console.log("listCars", listCars);
  })
  .catch((error) => console.log(error));
