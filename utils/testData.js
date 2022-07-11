//Usuarios
let usersList = [
  {
    userId: 1,
    user: "UsuarioPrueba",
    password: "comun",
    name: "Pedro",
    lastName: "Perez",
    Carnet: "B62787",
    Identificacion: "123456789",
    email: "EcciPass@gmail.com",
    AccountType: "estudiante",
  },
  {
    userId: 2,
    user: "AdminPrueba",
    password: "admin",
    name: "Andrea",
    lastName: "Rojas",
    identificacion: "111222333",
    email: "admin@gmail.com",
    accountType: "administrador",
  },
  {
    userId: 3,
    user: "GuardaPrueba",
    password: "guarda",
    name: "Patricio",
    lastName: "Quesada",
    identificacion: "444555666",
    email: "guarda@gmail.com",
    accountType: "guarda",
  },
  {
    userId: 4,
    user: "UsuarioDelete",
    password: "delete",
    name: "Marshall",
    lastName: "Garcia",
    carnet: "A92487",
    identificacion: "123456789",
    email: "delete@gmail.com",
    accountType: "estudiante",
  },
];

const roles = [
  {
    id: 1,
    name: "Admin",
  },
  {
    id: 2,
    name: "Guarda",
  },
  {
    id: 3,
    name: "Comun",
  },
];

let userRoles = [
  {
    userId: 1,
    roleID: 3,
  },
  {
    userId: 2,
    roleID: 1,
  },
  {
    userId: 3,
    roleID: 2,
  },
  {
    userId: 4,
    roleID: 3,
  },
];

//Dispositivos
let devicesList = [
  {
    userId: 1,
    deviceId: 1,
    brand: "Apple",
    model: "Mcbook Pro 2019",
    serialNumber: "IJASN23KM200",
    deviceType: "Laptop",
    imageUrl: "https://ci0137.s3.amazonaws.com/ecci-pass/devices/1.jpg",
    state: "Aprobado",
  },
  {
    userId: 1,
    deviceId: 2,
    brand: "Asus",
    model: "ZenBook Pro Duo",
    serialNumber: "UX582HS-XH99T",
    deviceType: "Laptop",
    imageUrl: "https://ci0137.s3.amazonaws.com/ecci-pass/devices/2.jpg",
    state: "En revisión",
  },
  {
    userId: 1,
    deviceId: 3,
    brand: "DELL",
    model: "G3 15 3579",
    serialNumber: "UX582HS-XH99T",
    deviceType: "Laptop",
    imageUrl: "https://ci0137.s3.amazonaws.com/ecci-pass/devices/3.jpg",
    state: "Extraviado",
  },
];

let recoveryCodes = [
  {
    email: "andazo2501@gmail.com",
    code: 12345,
  }
];

module.exports = {
  usersList,
  roles,
  userRoles,
  devicesList,
  recoveryCodes
};
