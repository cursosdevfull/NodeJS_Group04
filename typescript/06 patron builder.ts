class HistoriaBuilder {
  fecha: string | undefined;
  contratante: string | undefined;
  codigoAutorizacion: string | undefined;
  poliza: string | undefined;
  nombrePaciente: string | undefined;
  apellidoPaciente: string | undefined;
  medico: string | undefined;
  paramedico: string | undefined;
  piloto: string | undefined;
  estado: string | undefined;
  sintomas: string | undefined;
  diagnostico: string | undefined;
  tratamiento: string | undefined;
  medicinas: string[] | undefined;

  constructor(private entidad: string) {}

  agregarFecha(fecha: string) {
    this.fecha = fecha;
    return this;
  }

  agregarContratante(contratante: string) {
    this.contratante = contratante;
    return this;
  }

  agregarCodigoAutorizacion(codigoAutorizacion: string) {
    this.codigoAutorizacion = codigoAutorizacion;
    return this;
  }

  agregarPoliza(poliza: string) {
    this.poliza = poliza;
    return this;
  }

  agregarNombrePaciente(nombrePaciente: string) {
    this.nombrePaciente = nombrePaciente;
    return this;
  }

  agregarApellidoPaciente(apellidoPaciente: string) {
    this.apellidoPaciente = apellidoPaciente;
    return this;
  }

  agregarMedico(medico: string) {
    this.medico = medico;
    return this;
  }

  agregarParamedico(paramedico: string) {
    this.paramedico = paramedico;
    return this;
  }

  agregarPiloto(piloto: string) {
    this.piloto = piloto;
    return this;
  }

  agregarEstado(estado: string) {
    this.estado = estado;
    return this;
  }

  agregarSintomas(sintomas: string) {
    this.sintomas = sintomas;
    return this;
  }

  agregarDiagnostico(diagnostico: string) {
    this.diagnostico = diagnostico;
    return this;
  }

  agregarTratamiento(tratamiento: string) {
    this.tratamiento = tratamiento;
    return this;
  }

  agregarMedicinas(medicinas: string[]) {
    this.medicinas = medicinas;
    return this;
  }

  build() {
    return new Historia(this);
  }
}

class Historia {
  private fecha: string | undefined;
  private contratante: string | undefined;
  private codigoAutorizacion: string | undefined;
  private poliza: string | undefined;
  private nombrePaciente: string | undefined;
  private apellidoPaciente: string | undefined;
  private medico: string | undefined;
  private paramedico: string | undefined;
  private piloto: string | undefined;
  private estado: string | undefined;
  private sintomas: string | undefined;
  private diagnostico: string | undefined;
  private tratamiento: string | undefined;
  private medicinas: string[] | undefined;

  constructor(historiaBuilder: HistoriaBuilder) {
    this.fecha = historiaBuilder.fecha;
    this.contratante = historiaBuilder.contratante;
    this.codigoAutorizacion = historiaBuilder.codigoAutorizacion;
    this.poliza = historiaBuilder.poliza;
    this.nombrePaciente = historiaBuilder.nombrePaciente;
    this.apellidoPaciente = historiaBuilder.apellidoPaciente;
    this.medico = historiaBuilder.medico;
    this.paramedico = historiaBuilder.paramedico;
    this.piloto = historiaBuilder.piloto;
    this.estado = historiaBuilder.estado;
    this.sintomas = historiaBuilder.sintomas;
    this.diagnostico = historiaBuilder.diagnostico;
    this.tratamiento = historiaBuilder.tratamiento;
    this.medicinas = historiaBuilder.medicinas;
  }
}

const historia: Historia = new HistoriaBuilder("Historia")
  .agregarFecha("2021-09-01 12:09")
  .agregarMedico("Pedro Castillo")
  .build();

console.log(historia);

/*
const historiaObj = new Historia("2021-09-01 12:09",
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
    ["aceite de recino"]) */
