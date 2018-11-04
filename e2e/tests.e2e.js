const request = require('supertest');
require('dotenv').config();

const app = require('../app');

describe('Home', function(done){
    it('should return 200', function(){
        request(app)
            .get('/')
            .expect(200, done); 
    })
})

describe('API', function(done){
    it('should return 200', function(){
        request(app)
            .get('/apiv1/adds')
            .expect(200, done); 
    })
    it('should return JSON', function(){
        request(app)
            .get('/apiv1/adds')
            .expect('Content-Type', /json/, done); 
    })
})