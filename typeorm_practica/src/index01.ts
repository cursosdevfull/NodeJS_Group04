import "reflect-metadata";
import { createConnection } from "typeorm";
import { Car } from "./entity/Car";

createConnection()
  .then(async (connection) => {
    const car = new Car();
    car.manufacturer = "Toyota";
    car.description = "un texto largo";
    car.year = 2019;
    car.isSold = false;
    car.color = "blue";

    const carRepository = connection.getRepository(Car);

    const allCars = await carRepository.find();
    console.log("allCars", allCars);

    const firstCar = await carRepository.findOne();
    console.log("firstCar", firstCar);

    const toyotaCar = await carRepository.findOne({ manufacturer: "Toyota" });
    console.log("toyotaCar", toyotaCar);

    const carsByYear = await carRepository.find({ year: 2020 });
    console.log("carsByYear", carsByYear);

    const carsSold = await carRepository.find({ isSold: true });
    console.log("carsSold", carsSold);

    const [records, carCount] = await carRepository.findAndCount();
    console.log("records", records);
    console.log("carCount", carCount);

    // Insertar
    // const carInserted = await carRepository.save(car);
    // const carInserted = await connection.manager.save(car);
    // console.log(carInserted);

    /*
      Connection
      EntityManager
      Repository
    */
  })
  .catch((error) => console.log(error));
