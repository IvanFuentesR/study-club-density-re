import request from 'supertest'
import {app} from "../../app"

it('Test an email that does not exist', async()=>{
    return request(app)
    .post('/api/users/signin')
    .send({
        email: "test@test.com",
        password: "password"
    })
    .expect(400)
})


it("Test incorrect password", async()=>{
    await request(app)
    .post('/api/users/signup')
    .send({
        email: "test@test.com",
        password: "password"
    })
    .expect(201)

    await request(app)
    .post('/api/users/signin')
    .send({
        email: "test@test.com",
        password: "passwordd"
    })
    .expect(400)
})

it("Test returns valid cookie", async()=>{
    await request(app)
    .post('/api/users/signup')
    .send({
        email: "test@test.com",
        password: "password"
    })
    .expect(201)

    const response = await request(app)
    .post('/api/users/signin')
    .send({
        email: "test@test.com",
        password: "password"
    })
    .expect(200)

    expect(response.get("Set-Cookie")).toBeDefined

})