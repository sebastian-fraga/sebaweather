import countries from "i18n-iso-countries"
import enLocale from "i18n-iso-countries/langs/en.json"

countries.registerLocale(enLocale)

export function getFlagUrl(countryName: string, size: 40 | 80 | 160 = 80) {
    const code = countries.getAlpha2Code(countryName, "en")
    if (!code) return ""

    return `https://flagcdn.com/w${size}/${code.toLowerCase()}.png`
}