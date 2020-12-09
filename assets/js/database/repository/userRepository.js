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

    async getFirstByPasswordResetToken(passwordResetToken) {
        let result = FYSCloud.API.queryDatabase(
            "SELECT * FROM user WHERE passwordResetToken='" + passwordResetToken + "'"
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

    async updatePasswordResetToken(id, passwordResetToken) {
        FYSCloud.API.queryDatabase(
            "UPDATE `user` set passwordResetToken=? WHERE id = ?",
            [passwordResetToken, id]
        );
    }

    async updatePasswordByPasswordResetToken(passwordResetToken, password) {
        FYSCloud.API.queryDatabase(
            "UPDATE `user` set passwordResetToken = ?, password = ? WHERE passwordResetToken = ?",
            [null, password, passwordResetToken]
        );
    }
}
