$(document).ready(function () {
    let translations = {

        // All translations

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

            headerProfile: {
                nl: "Profiel",
                en: "Profile"
            },

            button: {
                nl: "Wijzig tag",
                en: "Edit tag"
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

            editBio: {
                nl: "✎ Wijzig biografie",
                en: "✎ Edit biography"
            },

            showCorendon: {
                nl: "Laat me zien op Corendon",
                en: "Show me on Corendon"
            },

            deletePermanent: {
                nl: "x permanent account verwijderen",
                en: "x permanently delete account"
            }
        },

        categories: {

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
            potentialTravelBuddy: {
                nl: "Potentiele travelbuddy",
                en: "Potential travelbuddy"
            }
        },

        voorwaarden: {
            algemeneVoorwaarden: {
                nl: "Algemene Voorwaarden",
                en: "Terms & Conditions"
            }
        }

    };

    FYSCloud.Localization.setTranslations(translations);

    SESSION.then(function (session) {
        FYSCloud.Localization.switchLanguage(session.user.language);

        $("#localizationLanguageSwitch").on("change", () => {
            FYSCloud.Localization.switchLanguage($("#localizationLanguageSwitch").val());
            FYSCloud.API.queryDatabase("UPDATE user SET language = ? WHERE id = ?",
                [$("#localizationLanguageSwitch").val(), session.user.id])
        })
    });
    
})
