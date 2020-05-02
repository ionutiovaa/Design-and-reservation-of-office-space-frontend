import AsyncStorage from '@react-native-community/async-storage';
import {Language} from '../data-models/Language';
import I18n from 'react-native-i18n';

export default class LanguageService {
  public async setLanguage(language: Language) {
    I18n.locale = language;
    await AsyncStorage.setItem('language', language);
  }

  public async getLanguage(): Promise<Language> {
    return (
      ((await AsyncStorage.getItem('language')) as Language) || Language.EN
    );
  }
  constructor() {
    this.getLanguage().then(lang => {
      I18n.locale = lang;
    });
  }

  public get(id: string): string {
    I18n.fallbacks = true;
    I18n.translations = {
      EN: require('../translations/en'),
      DE: require('../translations/de'),
      HU: require('../translations/hu'),
      RO: require('../translations/ro'),
    };

    return I18n.t(id);
  }
}
