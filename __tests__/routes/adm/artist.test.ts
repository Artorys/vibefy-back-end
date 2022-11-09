import { DataSource } from "typeorm"
import { AppDataSource } from "../../../src/data-source"
import request from "supertest"
import app from "../../../src/app"
import { user } from "../../mocks/user"
import { adm } from "../../mocks/adm"
import { loginAdm, loginArtist, loginUser } from "../../mocks/session"
import { String } from "aws-sdk/clients/cloudtrail"
import { artist } from "../../mocks/artist"
import { IArtist } from "../../interfaces/artist"

describe("/artist - With adm privileges",()=>
{
    let connect : DataSource
    let admToken : string
    let userToken : string
    let artistToken : string
    let userId : String
    let artistId : string
    beforeAll(async()=>
    {
       await AppDataSource.initialize().then((connection)=>
        {
            connect = connection
        }).catch((errConnection)=>
        {
            console.log(errConnection)
        })
        const userCreate = await request(app).post("/user").send(user)
        const admCreate = await request(app).post("/adm").send(adm)
        const artistCreate = await request(app).post("/artist").send(artist)
        const userLogin = await request(app).post("/login").send(loginUser)
        const artistLogin = await request(app).post("/login").send(loginArtist)
        const admLogin = await request(app).post("/login").send(loginAdm)
        userId = userCreate.body.id
        artistId = artistCreate.body.id
        userToken = userLogin.body.token
        artistToken = artistLogin.body.token
        admToken = admLogin.body.token
    })
    afterAll(async()=>
    {
        await connect.destroy()
    })
    it("GET /artist - Should to be able list all artists",async()=>
    {
        const response = await request(app).get(`/artist`).set("Authorization",`Bearer ${admToken}`)
        const body = response.body as IArtist[]
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(body)).toBeTruthy()
        expect(body[0]).toHaveProperty("id")
        expect(body[0]).toHaveProperty("name")
        expect(body[0]).toHaveProperty("email")
        expect(body[0]).toHaveProperty("avatar_img")
        expect(body[0]).toHaveProperty("isActive")
        expect(body[0]).toHaveProperty("created_At")
        expect(body[0]).toHaveProperty("updated_At")
    })
    it("GET /artist - Should not to be able list all artists with password property",async()=>
    {
        const response = await request(app).get(`/artist`).set("Authorization",`Bearer ${admToken}`)
        const body = response.body as IArtist[]
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(body)).toBeTruthy()
        expect(body[0]).not.toHaveProperty("password")
    })
    it("GET /artist - Should not to be able list all artists without token",async()=>
    {
        const response = await request(app).get(`/artist`)
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
    it("GET /artist - Should not to be able list all artists using user token",async()=>
    {
        const response = await request(app).get(`/user`).set("Authorization",`Bearer ${userToken}`)
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
    it("GET /artist/:id - Should to be able list an artist by id",async()=>
    {
        const response = await request(app).get(`/artist/${artistId}`).set("Authorization",`Bearer ${admToken}`)
        const body = response.body as IArtist
        expect(response.statusCode).toBe(200)
        expect(body).toHaveProperty("name")
        expect(body).toHaveProperty("email")
        expect(body).toHaveProperty("avatar_img")
    })
    it("GET /artist/:id - Should not be able list an artist by id returning password property",async()=>
    {
        const response = await request(app).get(`/artist/${artistId}`).set("Authorization",`Bearer ${admToken}`)
        const body = response.body as IArtist
        expect(response.statusCode).toBe(200)
        expect(body).not.toHaveProperty("password")
    })
    it("GET /artist/:id - Should not to be able list an user by id without token",async()=>
    {
        const response = await request(app).get(`/artist/${artistId}`)
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
    it("GET /artist/:id - Should not to be able list an user by id with invalid id",async()=>
    {
        const response = await request(app).get("/artist/invalidId").set("Authorization",`Bearer ${admToken}`)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty("message")
    })
    it("DELETE /artist/:id - Should to be able delete an artist by id",async()=>
    {
        const response = await request(app).delete(`/artist/${artistId}`).set("Authorization",`Bearer ${admToken}`)
        expect(response.statusCode).toBe(204)
    })
    it("DELETE /artist/:id - Should to be able delete an artist by id already deleted",async()=>
    {
        const response = await request(app).delete(`/artist/${artistId}`).set("Authorization",`Bearer ${admToken}`)
        expect(response.statusCode).toBe(400)
    })
    it("DELETE /artist/:id - Should not to be able delete an artist by id using user token",async()=>
    {
        const response = await request(app).delete(`/artist/${artistId}`).set("Authorization",`Bearer ${userToken}`)
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
    it("DELETE /artist/:id - Should not to be able delete an artist by id with invalid id",async()=>
    {
        const response = await request(app).delete("/artist/invalidId").set("Authorization",`Bearer ${admToken}`)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty("message")
    })
})