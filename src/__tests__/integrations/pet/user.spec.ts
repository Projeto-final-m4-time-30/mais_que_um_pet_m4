import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import app from '../../../app'
import request from 'supertest'
import { user, userInvalid, userNoPassword, users, userSession, userSessionErro } from "../../mocks"


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

    test("POST /users - Não deve ser capaz de criar um usuário que já existe", async () => {
        const response = await request(app).post('/users').send(user)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)

    })

    test("POST /users - Deve retornar um erro caso password não seja passado", async () => {
        const response = await request(app).post('/users').send(userNoPassword)

        expect(response.status).toBe(400)
        expect(response.body).toMatchObject({ error: "password is a required field" })

    })

    test("POST /login - Deve fazer login do usuário", async () => {
        const response = await request(app).post('/login').send(userSession)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')

    })

    test("POST /login - Não deve ser capaz de fazer login com email ou password inválidos", async () => {
        const response = await request(app).post('/login').send(userInvalid)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')

    })

    test("POST /login - Não deve ser capaz de fazer login com email ou password errados", async () => {
        const response = await request(app).post('/login').send(userSessionErro)

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('message')
    })

    test('DELETE /users/:id -> Deve ser capaz de deletar o usuário', async () => {
        const responseLogin = await request(app).post('/login').send(userSession)
        const token = `Bearer ${responseLogin.body.token}`
        const responseList = await request(app).get('/users').set("Authorization", token).send(userSession)

        const responseDelete = await request(app).delete(`/users/${responseList.body[0].id}`).set("Authorization", token)

        expect(responseDelete.status).toBe(204)
    })


    test('DELETE /users/:id -> Não deve ser capaz de fazer soft delete com id inválido', async () => {
        const response = await request(app).post('/login').send(userSession)
        const token = `Bearer ${response.body.token}`

        const responseDelete = await request(app).delete('/users/13970660-5dbe-423a-9a9d-5c23b37943cf').set("Authorization", token)

        expect(responseDelete.status).toBe(400)
        expect(responseDelete.body).toHaveProperty('message')
    })

    test('DELETE /users/:id -> Não deve ser capaz de fazer soft delete sem estar logado', async () => {
        const response = await request(app).post('/login').send(userSession)
        const token = `Bearer ${response.body.token}`

        const responseDelete = await request(app).delete(`/users/${users[0].id}`).set("Authorization", token)

        expect(responseDelete.status).toBe(401)
        expect(responseDelete.body).toHaveProperty('message')
    })

    test("PATCH /users/:id - Não deve ser capaz de fazer update com id inválido", async () => {
        const values = { name: "Joana Brito", email: "joanabrito@mail.com" }

        const responseLogin = await request(app).post("/login").send(user);
        const token = `Bearer ${responseLogin.body.token}`

        const response = await request(app).patch(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", token).send(values)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

    test("PATCH /users/:id - Deve ser capaz de fazer update do usuário", async () => {
        const values = { name: "Joana Brito", email: "joanabrito@mail.com" }

        const responseLogin = await request(app).post("/login").send(userSession);
        const token = `Bearer ${responseLogin.body.token}`

        const response = await request(app).patch(`/users/${users[0].id}`).set("Authorization", token).send(values)

        expect(response.status).toBe(200)
    })


    test("PATCH /users/:id - Não deve ser capaz de fazer update sem estar logado", async () => {
        const values = { name: "Joana Brito", email: "joanabrito@mail.com" }

        const responseLogin = await request(app).post("/login").send(userSession);
        const token = `Bearer ${responseLogin.body.token}`

        const response = await request(app).patch(`/users/${users[0].id}`).set("Authorization", token).send(values)

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('message')

    })

})