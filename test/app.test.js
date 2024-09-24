import request from 'supertest';
import app from '../app.js'; // Adjust the path as necessary
import { expect } from 'chai';

describe('Authentication API Tests', function () {
  it('should authenticate user and return tokens', async () => {
    const response = await request(app) // Use the local Express app
      .post('/authentications')
      .send({
        email: "testtoko@test.com",
        password: "123qweasdzxc"
      });

    expect(response.status).to.equal(201); // Check for the correct response status
    expect(response.body).to.have.property('status', 'success'); // Check for success status
    expect(response.body.data).to.have.property('accessToken'); // Check for access_token in the data object
    expect(response.body.data).to.have.property('refreshToken'); // Check for refresh_token in the data object
  });
});


// describe('Authentication API Tests', () => {
//     it('should authenticate user and return tokens', async () => {
//         const loginData = {
//             email: "testtoko@test.com",
//             password: "123qweasdzxc"
//         };

//         const res = await request(app)
//             .post('/authentications')
//             .send(loginData);

//         expect(res.status).to.equal(201);
//         expect(res.body).to.have.property('access_token'); // Check for access_token
//         expect(res.body).to.have.property('refresh_token'); // Check for refresh_token
//     });
// });
