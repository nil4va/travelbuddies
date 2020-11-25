class UserRepository {
    async getFirstByToken(sessionToken) {
        let result = FYSCloud.API.queryDatabase(
            "SELECT * FROM session LEFT JOIN user ON user.id = session.userId WHERE `token`= '" + sessionToken + "'"
        );
        return await result;
    }    
    
    async getFirstByEmail(email) {
        let result = FYSCloud.API.queryDatabase(
            "SELECT * FROM user WHERE email='" + email + "'"
        );
        return await result;
    }
}
