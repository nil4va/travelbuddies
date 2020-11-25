class sessionInserter {
    async insertSession(userId, token) {
        let result = FYSCloud.API.queryDatabase(
            "INSERT INTO `session` (`id`, `userId`, `token`, `payload`) VALUES (NULL, '" + userId + "', '" + token +"', NULL);"
        );
        return await result;
    }
}
