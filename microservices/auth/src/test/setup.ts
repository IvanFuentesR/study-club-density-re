import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'
import {app} from '../app'
import request from 'supertest'



declare global {
    var getCookie: (email:string, password:string) => Promise<string[]|null>;
}


let mongo:any

beforeAll(async()=>{
    mongo = await MongoMemoryServer.create();
    const mongoUri= await mongo.getUri();

    await mongoose.connect(mongoUri, {} );
})

beforeEach(async()=>{
    const colections = await mongoose.connection.db.collections();
    for(let colection of colections){
        await colection.deleteMany({})
    }
})

afterAll(async()=>{
    await mongo.stop()
    await mongoose.connection.close()
})


global.getCookie = async (email :string, password :string)=>{
    const response = await  request(app)
    .post('/api/users/signup')
    .send({
        email,
        password
    })
    .expect(201)

    const cookie = response.get("Set-Cookie")

    if(!cookie) return null

    return cookie
}


