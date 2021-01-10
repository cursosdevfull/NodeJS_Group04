interface IHistoria {
  fecha: string;
  contratante: string;
  codigoAutorizacion: string;
  poliza: string;
  nombrePaciente: string;
  apellidoPaciente: string;
  medico: string;
  paramedico: string;
  piloto: string;
  estado: string;
  sintomas: string;
  diagnostico: string;
  tratamiento: string;
  medicinas: string[];
}

class Historia {
  constructor(
    public fecha: string,
    public contratante: string,
    public codigoAutorizacion: string,
    public poliza: string,
    public nombrePaciente: string,
    public apellidoPaciente: string,
    public medico: string,
    public paramedico: string,
    public piloto: string,
    public estado: string,
    public sintomas: string,
    public diagnostico: string,
    public tratamiento: string,
    public medicinas: string[]
  ) {}
}

const historia: IHistoria = {
  fecha: "2021-09-01 12:09",
  contratante: "Juan Pérez",
  codigoAutorizacion: "abc-3456",
  poliza: "12783",
  nombrePaciente: "Alberto",
  apellidoPaciente: "Santana",
  medico: "Pedro Castillo",
  paramedico: "Javier Luque",
  piloto: "Luis Chang",
  estado: "Atendido",
  sintomas: "dolor intenso en el abdomen",
  diagnostico: "intoxicación alimentaria",
  tratamiento: "limpieza intestinos",
  medicinas: ["aceite de recino"],
};

const historiaObj = new Historia(
  "2021-09-01 12:09",
  "Juan Pérez",
  "abc-3456",
  "12783",
  "Alberto",
  "Santana",
  "Pedro Castillo",
  "Javier Luque",
  "Luis Chang",
  "Atendido",
  "dolor intenso en el abdomen",
  "intoxicación alimentaria",
  "limpieza intestinos",
  ["aceite de recino"]
);
