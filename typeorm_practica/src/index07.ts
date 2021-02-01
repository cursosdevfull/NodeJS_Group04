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

    const user1 = new User();
    user1.firstName = "Claudia";
    user1.lastName = "Goñe";
    user1.age = 24;
    user1.cars = [car1, car2];

    const user2 = new User();
    user2.firstName = "Karla";
    user2.lastName = "Zuñiga";
    user2.age = 24;
    user2.cars = [car1, car2];

    await userRepository.save(user1);
    await userRepository.save(user2);
    console.log("User1", user1);
    console.log("User2", user2);
  })
  .catch((error) => console.log(error));
