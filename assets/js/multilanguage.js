$(document).ready(function () {
    let translations = {

        // All translations

        notification: {
            subTitle: {
                nl: "Andere gebruikers zijn geinteresseerd. Klik om naar matches te gaan!",
                en: "Other users are intressted. Click here to go to your matches!"
            },

            btn: {
                nl: "Meer details...",
                en: "More details..."
            }
        },

        header: {
            itemProfile: {
                nl: "Profiel",
                en: "Profile"
            },

            itemInterests: {
                nl: "Interesses",
                en: "Interests"
            }
        },

        profile: {
            title: {
                nl: "Profiel",
                en: "Profile"
            },

            subTitle: {
                nl: "Hier kun je, jouw profiel informatie aanpassen.",
                en: "You can change your profile information here."
            },

            headerProfile: {
                nl: "Profiel",
                en: "Profile"
            },

            button: {
                nl: "Wijzig tags",
                en: "Edit tags"
            },

            selectAvatar: {
                nl: "Kies een nieuwe avatar",
                en: "Select a new avatar"
            },

            closeText: {
                nl: "Sluit",
                en: "Close"
            },

            editBirthday: {
                nl: "✎ Wijzig geboortedatum",
                en: "✎ Edit birthday"
            },

            editFunction: {
                nl: "✎ Wijzig functie",
                en: "✎ Edit function"
            },

            editPhoneNumber: {
                nl: "✎ Wijzig telefoonnummer",
                en: "✎ Edit phone number"
            },

            editBio: {
                nl: "✎ Wijzig biografie",
                en: "✎ Edit biography"
            },

            chooseNationality: {
                nl: "Kies je nationaliteit!",
                en: "Choose your nationality!"
            },

            countriesVisited: {
                nl: "Landen waar ik ben:",
                en: "Countries I have:"
            },

            dragCountry: {
                nl: "(sleep de vlag in het vak)",
                en: "(drag flag to box)"
            },

            notVisited: {
                nl: "niet geweest",
                en: "not visited"
            },

            visited: {
                nl: "geweest",
                en: "been to"
            },

            mustVisited: {
                nl: "wil gaan",
                en: "must visit"
            },

            save: {
                nl: "Sla de bezochte & te bezoeken landen op !",
                en: "Save the visited & must visited countries !"
            },

            showCorendon: {
                nl: "Laat me zien op Corendon",
                en: "Show me on Corendon"
            },

            deletePermanent: {
                nl: "x permanent account verwijderen",
                en: "x permanently delete account"
            },

            editPics: {
                nl: "Bewerk foto's",
                en: "Modify pictures"
            },

            modalTitle: {
                nl: "Account permanent verwijderen",
                en: "Permanent delete account"
            },

            modalSubTitle: {
                nl: "Weet je zeker dat je je account wilt verwijderen?",
                en: "Are you sure to permanently delete your account?"
            },
            
            modalConfirmBtn: {
                nl: "Ja",
                en: "Yes"
            },

            modalDenyBtn: {
                nl: "Nee",
                en: "No"
            }
        },

        categories: {
            title: {
                nl: "Interesses (tags)",
                en: "Interests (tags)"
            },

            subTitle: {
                nl: "Voeg tags toe aan jouw profiel, en kom in aanraking met meer travelbuddies",
                en: "Add tags to your profile and get in touch with more travel buddies"
            },

            goBackBtn: {
                nl: "Ga Terug",
                en: "Go Back"
            },

            chooseCategory: {
                nl: "⭒ Kies een categorie ⭒",
                en: "⭒ Choose a category ⭒"
            },

            explenationBtn: {
                nl: "Klik voor uitleg",
                en: "Click for explenation"
            },

            showEverybody: {
                nl: "Laat iedereen weten wat je interesses zijn door ze toe te voegen aan je profiel. Klik op een categorie om te beginnen!",
                en: "Let everyone know about your interests by adding them to your profile. click on a category to start!"
            },

            modalExplenationHeading: {
                nl: "Wat zijn tags?",
                en: "What are tags?"
            },

            modalExplenationParagraph: {
                nl: "Laat iedereen weten wat je interesses zijn door ze toe te voegen aan je profiel. Zo vind je je perfecte buddy, speciaal voor jou ! ",
                en: "Let everyone know what your intrest are by adding tags to your profile. This is how you will find the perfect buddy ! "
            },

            modalExplenationSecondParagraph: {
                nl: "klik op een categorie om te beginnen !",
                en: "click on a category to start !"
            },

            findTag: {
                nl: "Vind jouw tag!",
                en: "Find your tag!"
            }
        },

        matches: {
            title: {
                nl: "Matches",
                en: "Matches"
            },
            subTitle: {
                nl: "Op deze pagina, vind je een overzicht van jouw matches.",
                en: "On this page, you will find an overview of your matches."
            },

            potentialTravelBuddy: {
                nl: "Potentiele travelbuddy",
                en: "Potential travelbuddy"
            },

            nationality: {
                nl: "Nationaliteit",
                en: "Nationality"
            },

            matches: {
                nl: "Matches",
                en: "Matches"
            },

            successBtn: {
                nl: "Interesse",
                en: "Interest"
            },
            
            dangerBtn: {
                nl: "Geen interesse",
                en: "No interest"
            },

            potential: {
                nl: "Potentiele travelbuddy",
                en: "Potential travelbuddy"
            },

            youSeeEarlier: {
                nl: "travelbuddies die de meeste interesse gemeen heeft in een categorie met jou     worden hier eerder getoont! ",
                en: "travelbuddies who have the most common interests as you in a catagorie show up earlier!"},

            noMatchTitle: {
                nl: "Geen potentiele match :(",
                en: "No potential match :("
            },

            noMatchMessage: {
                nl: "Je vind iedereen zo interessant dat ze rechts staan in plaats van hier :)",
                en: "You matched with every user we can throw at you, look to your right :)"

            }
        },

        voorwaarden: {
            title: {
                nl: "Algeme Voorwaarden",
                en: "Terms & Conditions"
            },

            subTitle: {
                nl: "Hier wordt de algemene voorwaarden weergegeven.",
                en: "Here are the terms & coniditions"
            },

            algemeneVoorwaarden: {
                nl: "Algemene Voorwaarden",
                en: "Terms & Conditions"
            }
        },

        admin: {
            title: {
                nl: "Admin gebruiker beheer",
                en: "Admin user manager"
            },

            subTitle: {
                nl: "Hier kun je gebruikers verwijderen",
                en: "Here you can remove users from the system"
            },

            id: {
                nl: "Id",
                en: "Id",
            },

            name: {
                nl: "Naam",
                en: "Name",
            },

            options: {
                nl: "Opties",
                en: "Options",
            },

            delete: {
                nl: "Verwijder",
                en: "Delete",
            }
        }

    };

    FYSCloud.Localization.setTranslations(translations);

    SESSION.then(function (sessionData) {
        let lang = sessionData.user.language;
        FYSCloud.Localization.switchLanguage(lang);

        $(document).on('change', '#localizationLanguageSwitch', () => {
            // Updates language in database 
            FYSCloud.Localization.switchLanguage($("#localizationLanguageSwitch").val());
            FYSCloud.API.queryDatabase("UPDATE user SET language = ? WHERE id = ?",
                [$("#localizationLanguageSwitch").val(), sessionData.user.id])
            updateElementBuilderLanguage();
        });

        // When language is selected. than language will say in selectbox
        $(`#localizationLanguageSwitch option[value='${lang}']`).attr("selected", "selected");
        updateElementBuilderLanguage();
    });
})

function updateTranslations() {
    FYSCloud.Localization.translate();
}
