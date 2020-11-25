function getCookieByName(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}

function setCookie(name, value, days) {
    let currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + currentDate.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function removeCookie(name) {
    if (getCookieByName(name)) {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/"
    }
}
