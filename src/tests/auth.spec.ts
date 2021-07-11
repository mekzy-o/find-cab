import { should } from 'chai';
import request from 'supertest';
import app from '../../src/app';
import model from '../../src/database/models';

should();

const BASE_ROUTE = '/api/v1/auth';
const { User } = model;

describe('Authentication Routes', () => {
after(async () => { await User.destroy({ where: {} }); });
  describe('Signup Route', () => {
    it('should create a new user by posting to /signup route', async () => {
      const response = await request(app)
        .post(`${BASE_ROUTE}/signup`)
        .send({
          email: 'emekaofe@chekkit.com',
          password: '123456789',
          name:'Emeka',
          phone_number: '07083536368',
          license_number:'454464646',
          car_number:'3535355'
        });

      response.status.should.equal(201);
      response.body.status.should.equal('success');
      response.body.should.have.property('data');
    });

    it('should return an error if user is already registered', async () => {
      const response = await request(app)
        .post(`${BASE_ROUTE}/signup`)
        .send({
            email: 'emekaofe@chekkit.com',
            password: '123456789',
        });

      response.status.should.equal(422);
      response.body.status.should.equal('failed');
    });
  });

  describe('Login Route', () => {
    it('should post throw error if user is not verified', async () => {
      const response = await request(app)
        .post(`${BASE_ROUTE}/signin`)
        .send({
          email: 'emekaofe@chekkit.com',
          password: '123456789',
        });

      response.status.should.equal(400);
      response.body.status.should.eql('failed');
      response.body.message.should.eql('Account is not verified, Please be sure to check your email');
    });

    it('should throw an error for wrong password', async () => {
      const response = await request(app)
        .post(`${BASE_ROUTE}/signin`)
        .send({
          email: 'desmond@strv.com',
          password: '12345678',
        });

      response.status.should.equal(400);
      response.body.status.should.eql('failed');
      response.body.message.should.equal('User with this email does not exist');
    });

    it('should throw an error for wrong email', async () => {
      const response = await request(app)
        .post(`${BASE_ROUTE}/signin`)
        .send({
          email: 'desmond@wrong.com',
          password: '123456789',
        });

      response.status.should.equal(400);
      response.body.status.should.eql('failed');
      response.body.message.should.equal('User with this email does not exist');
    });
  });

  describe('Login Route', () => {
    beforeEach(async () => {
        //@ts-ignore
        await User.update({status:'active'}, {where:{email:'emekaofe@chekkit.com'}});
    })
    it('should login in user successful if user is verified', async () => {
      const response = await request(app)
        .post(`${BASE_ROUTE}/signin`)
        .send({
          email: 'emekaofe@chekkit.com',
          password: '123456789',
        });

      response.status.should.equal(200);
      response.body.status.should.eql('success');
      response.body.message.should.eql('You have successfully logged in');
      response.body.should.have.property('data');
    });
   
  });
});




