let usersList = [
  {
    userId: 1,
    user: "UsuarioPrueba",
    password: "comun",
    name: "Pedro",
    lastName: "Perez",
    Carnet: "B62787",
    Identificacion: "123456789",
    email: "comun@gmail.com",
    AccountType: "estudiante",
  },
  {
    userId: 2,
    user: "AdminPrueba",
    password: "admin",
    name: "Andrea",
    lastName: "Rojas",
    Identificacion: "111222333",
    email: "admin@gmail.com",
    AccountType: "administrador",
  },
  {
    userId: 3,
    user: "GuardaPrueba",
    password: "guarda",
    name: "Patricio",
    lastName: "Quesada",
    Identificacion: "444555666",
    email: "guarda@gmail.com",
    AccountType: "guarda",
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
];

module.exports = {
  usersList,
  roles,
  userRoles,
};
