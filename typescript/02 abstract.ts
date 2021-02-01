interface IPersona {
  id: number;
  nombre: string;
  edad: number;
  pasatiempos: string[];
}

abstract class IBDAcciones {
  obtenerConexionMySQL() {
    return "conexión";
  }
  abstract insertar(persona: Partial<IPersona>): void;
  abstract actualizar(persona: IPersona): void;
  abstract eliminar(persona: IPersona): void;
  abstract listar(persona: IPersona): void;
}

class BD_Acciones extends IBDAcciones {
  insertar(persona: Partial<IPersona>): void {
    console.log("insertar");
  }
  actualizar(persona: IPersona): void {
    console.log("actualizar");
  }
  eliminar(persona: IPersona): void {
    console.log("eliminar");
  }
  listar(persona: IPersona): void {
    console.log("listar");
  }

  obtenerCredenciales() {
    return "credenciales";
  }
}

class Acciones {
  bdAcciones: IBDAcciones;

  constructor(bdAcciones: IBDAcciones) {
    this.bdAcciones = bdAcciones;
    // this.bdAcciones = new BD_Acciones()
  }

  insertarRegistro() {
    const persona: Omit<IPersona, "id" | "nombre"> = {
      edad: 34,
      pasatiempos: "tocar el piano",
    };
    this.bdAcciones.insertar(persona);
  }
}

const bdAcciones: IBDAcciones = new BD_Acciones();
const acciones = new Acciones(bdAcciones);
acciones.insertarRegistro();
