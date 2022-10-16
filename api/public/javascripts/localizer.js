class Localizer
{
    constructor(locale = 'en')
    {
        const localeList = ["en", "ru"]
        if (localeList.indexOf(locale.toLowerCase()) >= 0)
        { this.locale = locale.toLowerCase(); }
        else
        { throw new Error(`Illegal -locale- argument value (${locale}) at Localizer constructor!`)}
    }

    getLocalizedText(textKey)
    {
        const dictionary = {
            'en': {
                'api response': 'API is working properly!'
            },
            'ru': {
                'api response': 'API работает корректно!'
            },
        };
        return dictionary[this.locale][textKey];
    }
}

module.exports = Localizer;