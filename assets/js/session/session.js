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

            let sessionUser = new SessionUser(firstResult.name, firstResult.email);

            let result = {
                'user': sessionUser,
                'attributes': JSON.parse(attributes)
            };
            resolve(result);
        });
    }
});
