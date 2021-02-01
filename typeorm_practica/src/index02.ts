import "reflect-metadata";
import { createConnection } from "typeorm";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

createConnection()
  .then(async (connection) => {
    /*  const userRepository = connection.getRepository(User); */

    const user = new User();
    user.firstName = "Alfonso";
    user.lastName = "Baella";
    user.age = 50;

    const carRepository = connection.getRepository(Car);

    const car = new Car();
    car.manufacturer = "Hyundai";
    car.description = "Camioneta todo terreno";
    car.color = "blue";
    car.year = 2021;
    car.isSold = true;
    car.user = user;

    await carRepository.save(car);
    console.log("car inserted", car);
    /* 
    const userInserted = await userRepository.save(user);
    console.log("userInserted", userInserted); */
  })
  .catch((error) => console.log(error));
