
let $session = new Promise(function (resolve, reject) {
    let $userRepository = new UserRepository;

    let sessionToken = getCookieByName(SessionEnum.SESSION_COOKIE_NAME);
    let hasSessionCookie = sessionToken !== undefined;

    if (hasSessionCookie === true) {
        let databaseUserPromise = $userRepository.getFirstByToken(sessionToken);

        databaseUserPromise.then(function (data) {

            let firstResult = data[0];
            if (firstResult === undefined) {
                removeCookie(SessionEnum.SESSION_COOKIE_NAME);
                resolve();
                return;
            }

            let attributes = firstResult.payload;
            if (attributes === null) {
                attributes = JSON.stringify([]);
            }

            let sessionUser = new SessionUser(
                firstResult.id,
                firstResult.firstName,
                firstResult.lastName,
                firstResult.birthDate,
                firstResult.name,
                firstResult.email,
                firstResult.profilePictureUrl,
            );

            let result = {
                'user': sessionUser,
                'attributes': JSON.parse(attributes)
            };
            resolve(result);
        });
        return;
    }

    reject(SessionEnum.ERROR_NOT_LOGGED_IN);
});
