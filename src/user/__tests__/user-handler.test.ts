import * as user from '../user-handlers';

describe('User Handler', () => {
  it('should create a new user', async () => {
    const req = {
      body: {
        username: 'test',
        email: 'test@test.test',
        password: 'test'
      }
    };
    const res = {
      json({ token }) {
        console.log(token);
      }
    };
    
    const resJsonSpy = jest.spyOn(res, 'json');

    await user.createUser(req, res);
    
    expect(resJsonSpy).toBeCalled();
  });
});
