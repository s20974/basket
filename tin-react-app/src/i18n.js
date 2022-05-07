import i18n from 'i18next'
import { initReactI18next } from "react-i18next";
import translationEnglish from "./locales/en.json"
import translationPolish from "./locales/ru.json"

const resources = {
    en:{
        translation :translationEnglish
    },
    ru:{
        translation : translationPolish
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng:"en",

        interpolation:{
            escapeValue:false
        }
    });

export default i18n;