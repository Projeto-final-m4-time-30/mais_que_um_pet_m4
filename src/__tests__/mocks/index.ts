import { IPet, IPetRequest } from "../../interfaces/pet"
import { IUser, IUserNoPassword } from "../../interfaces/user"

const users: Array<IUser> = []
const pets: Array<IPet> = []

const user: IUser= {
    user_name: "Test",
    user_image: "https://static4.depositphotos.com/1011434/493/i/600/depositphotos_4939645-stock-photo-cute-puppy.jpg",
    email: "test@kenzie.com",
    password: "1234",
    address: {
        cep: "88020-20",
        city: "Florianópolis",
        state: "SC",
        district: "Rua João de Deus",
        number: "2407"
    },
    contact: {
        phone: "4898989696",
        secondary_email: "test2@kenzie.com",
        whatsapp: "48998999896",
        description: "Adoro cachorro!"
    }
}

const userNoPassword: IUserNoPassword= {
    user_name: "Test",
    user_image: "https://static4.depositphotos.com/1011434/493/i/600/depositphotos_4939645-stock-photo-cute-puppy.jpg",
    email: "test@kenzie.com",
    address: {
        cep: "88020-20",
        city: "Florianópolis",
        state: "SC",
        district: "Rua João de Deus",
        number: "2407"
    },
    contact: {
        phone: "4898989696",
        secondary_email: "test2@kenzie.com",
        whatsapp: "48998999896",
        description: "Adoro cachorro!"
    }
}

const userSession = {
    email: "test@kenzie.com",
    password: "1234"
}

const createPet: IPetRequest = {
    name: "Viola",
    is_adoptable: true,
    is_active: true,
    info_pet: {
        pet_image: "",
        size: "médio porte",
        color: "Caramelo universal",
        species: "Vira-Lata",
        description: "Cadelinha de 7 anos muito tranquila e parceira",
        vaccine: "todas"
    }
}
export {  user, userNoPassword, userSession, users, createPet, pets }