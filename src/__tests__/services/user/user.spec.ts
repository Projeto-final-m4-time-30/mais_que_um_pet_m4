import { DataSource } from "typeorm"
import AppDataSource from "../../../database/data-source"
import app from '../../../app'
import request from 'supertest'
import { user, userNoPassword, users, userSession } from "../mocks"


describe('/users', () => {
    let connection: DataSource

    beforeAll(async () => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
    })

    afterAll(async () => {
        await connection.destroy()
    })

    test('POST /users -> Deve ser capaz de criar um usuário', async () => {
        const response = await request(app).post('/users').send(user)
        
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('user_name')
        expect(response.body).toHaveProperty('email')
        expect(response.body).toHaveProperty('address')
        expect(response.body).toHaveProperty('contact')
        expect(response.body).not.toHaveProperty('password')
        users.push(response.body)
    })

    test("POST /users - Não deve ser capaz de criar um usuário que já existe",async () => {
        const response = await request(app).post('/users').send(user)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
             
    })

    test("POST /users - Deve retornar um erro caso password não seja passado",async () => {
        const response = await request(app).post('/users').send(userNoPassword)

        expect(response.status).toBe(400)
        expect(response.body).toMatchObject({
            message: 'Password is missing'
        })
             
    })

    test("POST /login - Deve fazer login do usuário",async () => {
        const response = await request(app).post('/login').send(userSession)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')
             
    })
    
})