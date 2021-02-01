import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

createConnection()
  .then(async (connection) => {
    const carRepository = getRepository(Car);
    const userRepository = getRepository(User);

    const car1 = new Car();
    car1.manufacturer = "Hyundai";
    car1.color = "whitesmoke";
    car1.description = "Auto compacto";
    car1.isSold = false;
    car1.year = 2020;

    const car2 = new Car();
    car2.manufacturer = "Kia";
    car2.color = "greenlemon";
    car2.description = "SUV";
    car2.isSold = false;
    car2.year = 2020;

    await carRepository.save(car1);
    await carRepository.save(car2);

    const user = new User();
    user.firstName = "Carmela";
    user.lastName = "Nieto";
    user.age = 40;
    user.cars = [car1, car2];

    await userRepository.save(user);
    console.log("User", user);
  })
  .catch((error) => console.log(error));
