import { DataSource } from "typeorm";
import AppDataSource from "../../../database/data-source";
import request from "supertest";
import app from "../../../app";
import { createPet, pets, user, users, userSession } from "../../mocks";


describe('/pet', () => {


    let connection: DataSource

    beforeEach(async () => {
        await AppDataSource.initialize().then((res => {
            connection = res
        })).catch(err => {
            console.log(err)
        })
    })

    afterEach(async () => {
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

    test("POST /pet ->  Não deve cadastrar um pet sem o token", async () => {
        const response = await request(app).post('/pet').send(createPet)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)

    })

    test("POST /pet - Não deve ser capaz de criar um pet que já existe", async () => {
        const response = await request(app).post('/pet').send(createPet)

        expect(response.status).toBe(400)

    })


    test("PATCH /pet/:id - Não deve ser capaz de fazer update de pet sem estar logado", async () => {
        const values = { name: "Jack" }

        const responseCreate = await request(app).post('/users').send(user)
        users.push(responseCreate.body)
        const responseLogin = await request(app).post("/login").send(userSession);
        const token = `Bearer ${responseLogin.body.token}`

        const response = await request(app).patch(`/pet/${pets[0].id}`).send(values)

        expect(response.status).toBe(400)

    })

    test("PATCH /pet/:id - Não deve ser capaz de fazer update de pet inexistente", async () => {
        const values = { name: "Jack" }

        const responseCreate = await request(app).post('/users').send(user)
        users.push(responseCreate.body)
        const responseLogin = await request(app).post("/login").send(userSession);
        const token = `Bearer ${responseLogin.body.token}`

        const response = await request(app).patch(`/pet/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", token).send(values)
        expect(response.status).toBe(404)

    })

    test("PATCH /pet/adopt/ - Não deve ser capaz de adotar um pet sem estar logado", async () => {
        const values = { name: "Jack" }

        const responseCreate = await request(app).post('/users').send(user)
        users.push(responseCreate.body)
        const responseLogin = await request(app).post("/login").send(userSession);
        const token = `Bearer ${responseLogin.body.token}`

        const response = await request(app).patch(`/pet/adopt/${users[0].id}`).send(values)
        expect(response.status).toBe(400)

    })

    test("PATCH /pet/adopt/ - Não deve ser capaz de adotar um pet inexistente", async () => {
        const values = { name: "Jack" }

        const responseCreate = await request(app).post('/users').send(user)
        users.push(responseCreate.body)
        const responseLogin = await request(app).post("/login").send(userSession);
        const token = `Bearer ${responseLogin.body.token}`

        const response = await request(app).patch(`/pet/adopt/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", token).send(values)
        expect(response.status).toBe(400)

    })


    test("DELETE /pet/:id - Não deve ser capaz de fazer delete sem estar logado", async () => {
        const values = { name: "Jack" }

        const responseCreate = await request(app).post('/users').send(user)
        users.push(responseCreate.body)
        const responseLogin = await request(app).post("/login").send(userSession);
        const token = `Bearer ${responseLogin.body.token}`

        const response = await request(app).patch(`/pet/${pets[0].id}`).send(values)

        expect(response.status).toBe(400)

    })

    test("DELETE /pet/:id - Não deve ser capaz de fazer delete de pet inexistente", async () => {
        const values = { name: "Jack" }

        const responseCreate = await request(app).post('/users').send(user)
        users.push(responseCreate.body)
        const responseLogin = await request(app).post("/login").send(userSession);
        const token = `Bearer ${responseLogin.body.token}`

        const response = await request(app).patch(`/pet/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", token).send(values)

        expect(response.status).toBe(404)

    })
})