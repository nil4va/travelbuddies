class SessionUser {
    constructor(id, firstName, lastName, birthDate, name, email, profilePictureUrl, passwordResetToken, admin, language) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.name = name;
        this.email = email;
        this.profilePictureUrl = profilePictureUrl;
        this.passwordResetToken = passwordResetToken;
        this.admin = admin;
        this.language = language;
    }

    getId() {
        return this.id;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getFirstName() {
        return this.firstName;
    }

    setFirstName(firstName) {
        this.firstName = firstName;
    }

    getLastName() {
        return this.lastName;
    }

    setLastName(lastName) {
        this.lastName = lastName;
    }

    getBirthDate() {
        return this.birthDate;
    }

    setBirthDate(birthDate) {
        this.birthDate = birthDate;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }

    getProfilePictureUrl() {
        return this.profilePictureUrl;
    }

    setProfilePictureUrl(profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    getPasswordResetToken() {
        return this.passwordResetToken;
    }

    setPasswordResetToken(passwordResetToken) {
        this.passwordResetToken = passwordResetToken;
    }

    isAdmin() {
        return this.admin;
    }

    setIsAdmin(admin) {
        this.admin = admin;
    }

    getLanguage() {
        return this.language;
    }

    setLanguage(language) {
        this.language = language;
    }
}
