import request from 'supertest'
import {app} from "../../app"


it('Test successful signup', async ()=>{
    return request(app)
            .post('/api/users/signup')
            .send({
                email: "test@test.com",
                password: "password"
            })
            .expect(201)
})

it('Test invalid email', async()=>{
    return request(app)
    .post('/api/users/signup')
    .send({
        email: "test",
        password: "password"
    })
    .expect(400)
})

it('Test invalid password', async()=>{
    return request(app)
    .post('/api/users/signup')
    .send({
        email:  "test@test.com",
        password: "pas"
    })
    .expect(400)
})

it('Test missing email and password', async()=>{
    return request(app)
    .post('/api/users/signup')
    .send({
    })
    .expect(400)
})

it("Test unique emails", async()=>{
    await request(app)
    .post('/api/users/signup')
    .send({
         email:  "test@test.com",
        password: "password"
    })
    .expect(201)

    await request(app)
    .post('/api/users/signup')
    .send({
         email:  "test@test.com",
        password: "password"
    })
    .expect(400)
})

it("Test set a cookies after a sucessfull signup", async()=>{
    const response =  await request(app)
    .post('/api/users/signup')
    .send({
         email:  "test@test.com",
        password: "password"
    })
    .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
})