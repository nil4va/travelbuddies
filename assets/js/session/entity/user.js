class SessionUser {
    constructor(id, firstName, lastName, birthDate, name, email, profilePictureUrl) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.name = name;
        this.email = email;
        this.profilePictureUrl = profilePictureUrl;
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
}
