import { DataSource } from "typeorm";
import AppDataSource from "../../../database/data-source";
import request from "supertest";
import app from "../../../app";
import { createPet, pets, user, userSession } from "../../mocks";


describe('/pet', () => {


    let connection: DataSource

    beforeEach( async () => {
        await AppDataSource.initialize().then((res => {
            connection = res
        })).catch(err => {
            console.log(err)
        })
    })

    afterEach( async () => {
       await connection.destroy()
    })

    test('POST /pet -> Deve ser capaz de criar um pet', async () => {
        
        const userResponse = await request(app).post('/users').send(user)
        const createResponse = await request(app).post('/login').send(userSession)
        const response = await request(app).post('/pet').set("Authorization", `Bearer ${createResponse.body.token}`).send(createPet)
        
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('is_adoptable')
        expect(response.body).toHaveProperty('is_active')
        expect(response.body).toHaveProperty('info_pet')

        pets.push(response.body)
    })

    test("POST /pet ->  Não deve cadastrar um pet sem o token",async () => {
        const response = await request(app).post('/pet').send(createPet)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
             
    })

    test("POST /pet - Não deve ser capaz de criar um pet que já existe",async () => {
        const response = await request(app).post('/pet').send(createPet)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
             
    })
})