import { DataSource } from "typeorm";
import AppDataSource from "../../../database/data-source";
import request from "supertest";
import app from "../../../app";
import { createPet, pets } from "../../mocks";
import { IPetRequest } from "../../../interfaces/pet";


describe('/pet', () => {
    let connection: DataSource

    beforeAll( async () => {
        await AppDataSource.initialize().then((res => {
            connection = res
        })).catch(err => {
            console.log(err)
        })
    })

    afterAll( async () => {
       await connection.destroy()
    })

    test('POST /pet -> Deve ser capaz de criar um pet', async () => {
        const response = await request(app).post('/pet').send(createPet)
        
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('is_adoptable')
        expect(response.body).toHaveProperty('is_active')
        expect(response.body).toHaveProperty('info_pet')
    })

    test("POST /pet - Não deve ser capaz de criar um pet que já existe",async () => {
        const response = await request(app).post('/pet').send(createPet)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
             
    })
})