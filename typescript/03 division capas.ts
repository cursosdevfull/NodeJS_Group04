///////////////// Infraestructura

// Operaciones
class MedicoOperaciones implements MedicoRepositorio {
  insertar(medico: IMedico) {
    return medico;
  }
  actualizar(id: number, medico: IMedico) {}
  eliminar(id: number) {}
  listar() {
    const medicos: IMedico[] = [];
    return medicos;
  }
}

///////////////// Aplicación

// Caso de Uso
class MedicoCasoUso {
  medicoRepositorio: MedicoRepositorio;

  constructor(medicoRepositorio: MedicoRepositorio) {
    this.medicoRepositorio = medicoRepositorio;
  }
  insertarMedico(medico: IMedico) {
    return this.medicoRepositorio.insertar(medico);
  }
}

// Interface o Repositorio
interface MedicoRepositorio {
  insertar(medico: IMedico): IMedico;
  actualizar(id: number, medico: IMedico): void;
  eliminar(id: number): void;
  listar(): IMedico[];
}

///////////////// Dominio

// Entidad
/* class IMedico {
    constructor(public nombre: string, apellido: string, cmp: string, dni: string) {}
} */
interface IMedico {
  nombre: string;
  apellido: string;
  cmp: string;
  dni: string;
}

//////////////////////////////////////////
const medicoRepositorio: MedicoRepositorio = new MedicoOperaciones();
const medicoCasoUso: MedicoCasoUso = new MedicoCasoUso(medicoRepositorio);
const medico: IMedico = {
  nombre: "Alfredo",
  apellido: "Aramburú",
  cmp: "25456",
  dni: "07589651",
};

console.log(medicoCasoUso.insertarMedico(medico));
