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

//Dispositivos
let devicesList = [
  {
    userId: 1,
    deviceId: 1,
    brand: "Apple",
    model: "Mcbook Pro 2019",
    serialNumber: "IJASN23KM200",
    deviceType: "Laptop",
    imageUrl:
      "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4LqQX?ver=fe80&q=90&m=6&h=705&w=1253&b=%23FFFFFFFF&f=jpg&o=f&p=140&aim=true",
    state: "Aprobado",
  },
  {
    userId: 1,
    deviceId: 2,
    brand: "Asus",
    model: "ZenBook Pro Duo",
    serialNumber: "UX582HS-XH99T",
    deviceType: "Laptop",
    imageUrl: "https://m.media-amazon.com/images/I/81AKWKpG4TL._AC_SY355_.jpg",
    state: "En revisión",
  },
];

module.exports = {
  usersList,
  roles,
  userRoles,
  devicesList,
};
