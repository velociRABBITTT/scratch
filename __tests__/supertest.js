const request = require('supertest');
const path = require('path');
const fs = require('fs');



const server = 'http://localhost:3000';


describe('Route Integration', () => {

  describe('/', () => {
    describe('GET', () => {

      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
    describe('GET', () => {

      it('If we request nonexisting route - we receive a 404 not found', () => {
        return request(server)
          .get('/nonexistingroute')
          .expect('Content-Type', "text/plain; charset=utf-8")
          .expect(404)
          .expect('Not Found')
      });
    });

  });

  describe('/sess', () => {
    describe('GET', () => {

      it('responds with 200 status and json object with user data', () => {
        return request(server)
          .get('/sess')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
      });
    });
  });

  describe('/logout', () => {
    describe('GET', () => {

      it('For some reason we return 200 as a string on the response object', () => {
        return request(server)
          .get('/logout')
          .expect('Content-Type', "text/html; charset=utf-8")
          .expect('200')
          .expect(200);
      });
    });
  });

  describe('/login', () => {
    describe('POST', () => {

      it('When we send valid login credentials - the response object should hold the user data in form of json', () => {
        return request(server)
          .post('/login')
          .send({ username: 'sess', password: 'sess' })
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect({
            _id: '611d6e6af64c8227e48e8730',
             username: 'sess', 
             email: 'sess@gmail', 
             password: '$2b$10$0Xj1hQPCdg6v0nyzk6CPOOi24MEz5ZfCQh26CjFdBvodBry/YPSfC', 
             __v: 0})
      });
    });
  });

  describe('/login', () => {
    describe('POST', () => {

      it('When we send INVALID user info - response body should hold an err object with specific properties', () => {
        return request(server)
          .post('/login')
          .send({ username: 'nonexistingusername', password: 'sess' })
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect({
            log: 'Unknown Middleware error',
            status: 400,
            message: "userController.verifyUser: Error: Error: It's either your password is wrong or your user name is wrong"
          })
      });
    });
  });


  describe('/new', () => {
    describe('POST', () => {

      it('When we send a unique Username with pass - it should properly create the document and send it back in JSON', () => {
        return request(server)
          .post('/new')
          .send({ username: 'session', password: 'session' })
          .expect('Content-Type', 'application/json; charset=utf-8')
      });
    });
  });

  describe('/new', () => {
    describe('POST', () => {

      it('When we send a Non-Unique Username we receive a not very descriptive error - with a status of 400', () => {
        return request(server)
          .post('/new')
          .send({ username: 'sess', password: 'session' })
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect({
            log: 'Unknown Middleware error',
            status: 400,
            message: 'userController.createUser: Error: ValidationError: email: Path `email` is required.'
          })
      });
    });
  });


});