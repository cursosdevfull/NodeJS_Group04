import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

createConnection()
  .then(async (connection) => {
    const userRepository = getRepository(User);
    const carRepository = getRepository(Car);
    const user = await userRepository.findOne({ id: 1 });

    const car = new Car();
    car.manufacturer = "Nissan";
    car.description = "Nuevo modelo TIDDA";
    car.color = "green";
    car.year = 2021;
    car.isSold = false;
    car.user = user;

    await carRepository.save(car);
    console.log("Car inserted", car);
  })
  .catch((error) => console.log(error));
