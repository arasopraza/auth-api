const UserLogin = require('../UserLogin');

describe('UserLogin entities', () => {
    it('should throw error when payload doesnot contain needed property', () => {
        //Arange
        const payload = {
            username: 'dicoding',
        };

        // Action & Assert
        expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload not meet data type specification', () => {
        //Aramge
        const payload = {
            username: 'dicoding',
            password: 12345,
          };
      
          // Action & Assert
          expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create UserLogin entities correctly', () => {
        // Arrange
        const payload = {
          username: 'dicoding',
          password: '12345',
        };
    
        // Action
        const userLogin = new UserLogin(payload);
    
        // Assert
        expect(userLogin).toBeInstanceOf(UserLogin);
        expect(userLogin.username).toEqual(payload.username);
        expect(userLogin.password).toEqual(payload.password);
      });
})