interface IMedico {
  nombre: string;
  apellido: string;
  cmp: string;
  dni: string;
}

const medico: IMedico = {
  nombre: "Alfredo",
  apellido: "Aramburú",
  cmp: "83473",
  dni: "23875890",
};

class IMedicoV2 {
  constructor(
    public nombre: string,
    public apellido: string,
    public cmp: string,
    public dni: string
  ) {}
}

const medicov2: IMedicoV2 = new IMedicoV2(
  "Alfredo",
  "Aramburú",
  "83473",
  "23875890"
);

console.log("medico", medico);
console.log("medicov2", medicov2);

console.log(medico.nombre);
console.log(medicov2.nombre);
