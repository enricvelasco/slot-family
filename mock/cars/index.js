import {castrol, marlboro, movistar, ngk, piaa, pirelli} from "../sponsors";

export const impreza = {
   manufacturer: "Scalextric",
   make: "Subaru",
   model: "Impreza WRX",
   year: "1999",
  imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMUKo771DXjzSxSr0Q9uUffmsFFtDcAOuGl-1v2VmcT9yT0vYc8rYA9OI4cSvs4YtyAHA&usqp=CAU",
   owner: "Enric Velasco",
   sponsors: [pirelli],
   description: "Coche adquirido el año 1999",
   group: "Rally slow"
 }

 export const lancer = {
   manufacturer: "Scalextric",
   make: "Mitsubishi",
   model: "Lancer evo VI",
   year: "1999",
   imgUrl: "https://i.pinimg.com/originals/b0/9f/37/b09f370f73726aec7919bc99e8170c97.jpg",
   owner: "Pau Velasco",
   sponsors: [marlboro, piaa, ngk],
   description: "Coche adquirido el año 1999",
   group: "Rally slow"
 }

 export const corolla = {
   manufacturer: "Scalextric",
   make: "Toyota",
   model: "Corolla WRC",
   year: "1998",
   imgUrl: "https://ugc.kn3.net/i/760x/http://www.ultimatecarpage.com/images/large/478/Toyota-Corolla-WRC_2.jpg",
   owner: "Pau Velasco",
   sponsors: [castrol, movistar],
   description: "Coche adquirido el año 1999",
   group: "Rally slow"
 }

 export const carsDemoList = [
   impreza,
   lancer,
   corolla
 ]
