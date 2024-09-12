import request from 'supertest'
import {app} from "../../app"

it("Test user details", async()=>{
    const cookie = await getCookie("test@test.com", "password")
    
    if(!cookie) throw new Error("Cookie is undefined")

    const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200)
    expect(response.body.currentUser?.email).toEqual("test@test.com")
})

it("Test unauth request", async()=>{
    const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200)
    expect(response.body.currentUser).toEqual(null)
})