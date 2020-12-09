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
    
    async getFirstByUsername(username) {
        let result = FYSCloud.API.queryDatabase(
            "SELECT * FROM user WHERE name='" + username + "'"
        );
        return await result;
    }

    async createUser(firstName, lastName, username, email, password, BirthDate) {
        FYSCloud.API.queryDatabase(
            "INSERT INTO `user` (`id`, `firstName`, `lastName`, `name`, `email`, `password`, `birthDate`) VALUES (NULL, ?, ?, ?, ?, ?, ?)",
            [firstName, lastName, username, email, password, BirthDate]
        );
    }

    async updateProfilePictureUrl(id, profilePictureUrl) {
        FYSCloud.API.queryDatabase(
            "UPDATE `user` set profilePictureUrl=? WHERE id = ?",
            [profilePictureUrl, id]
        );
    }
}
