import { DataSource } from "typeorm";
import AppDataSource from "../../../../database/data-source";
import request from "supertest";
import app from "../../../../app";

describe('/pet', () => {
    let connection: DataSource

    beforeAll( async () => {
        AppDataSource.initialize().then((res => {
            connection = res
        })).catch(err => {
            console.log(err)
        })
    })

    afterAll( async () => {
       await connection.destroy()
    })
})