interface IPersona {
  nombre: string;
  edad: number;
  pasatiempos: string[];
}

class Persona {
  constructor(public datos: IPersona) {}

  descripcion(): string {
    return `
            ${this.datos.edad} tiene ${
      this.datos.edad
    } años y le gusta ${this.datos.pasatiempos.join(", ")}
        `;
  }
}

class Americano extends Persona {
  paisOrigen: string;

  constructor(nombre: string, edad: number, pasatiempos: string[]) {
    super({ nombre, edad, pasatiempos });
    this.paisOrigen = "Perú";
  }

  mostrarDatos() {
    console.log(`${this.datos.nombre}`);
  }
}

const datos: IPersona = { nombre: "Carmen", edad: 25, pasatiempos: ["pintar"] };
const persona = new Persona(datos);
// console.log(persona.nombre)
console.log(persona);
console.log(persona.descripcion());
const americano = new Americano("Claudia", 22, ["bailar"]);
console.log("País origen", americano.paisOrigen);
americano.mostrarDatos();
