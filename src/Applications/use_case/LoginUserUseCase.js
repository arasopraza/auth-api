const UserLogin = require('../../Domains/users/entities/UserLogin');
const NewAuthentication = require('../../Domains/authentications/entities/NewAuth');

class LoginUserUseCase {
    constructor({
        userRepository,
        authenticationRepository,
        authenticationTokenManager,
        passwordHash,
    }) {
        this._userRepository = userRepository;
        this._authenticationRepository = authenticationRepository;
        this._authenticaionTokenManager = authenticationTokenManager;
        this._passwordHash = passwordHash;
    }

    async execute(useCasePayload) {
        const { username, password } = new UserLogin(useCasePayload);

        const encryptedPassword = await this._userRepository.getPasswordByUsername(username);

        await this._passwordHash.comparePassword(password, encryptedPassword);

        const accessToken = await this._authenticaionTokenManager
            .createAccessToken({ username });
        const refreshToken = await this._authenticaionTokenManager
            .createRefreshToken({ username });

        const newAuthentication = new NewAuthentication({
            accessToken,
            refreshToken,
        });

        await this._authenticationRepository.addToken(newAuthentication.refreshToken);

        return newAuthentication;
    }
}

module.exports = LoginUserUseCase;