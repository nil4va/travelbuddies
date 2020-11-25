function generateRandomString() {
    return Math.random().toString(36).substr(2);
}

function generateRandomStringRounds(rounds) {
    let result = '';
    for (i = 0; i < rounds; i++) {
        result += generateRandomString();
    }
    return result;
}
