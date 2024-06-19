import { Injectable } from '@angular/core';
import enTranslations from '../../assets/en.json';
import csTranslations from '../../assets/cs.json';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private translations = new Map<string, { [key: string]: string }>();
  private currentLang: string = 'en';

  constructor() {
    this.translations.set('en', enTranslations);
    this.translations.set('cs', csTranslations);
  }

  public setLanguage(lang: string): void {
    this.currentLang = lang;
  }

  public getLanguage(): string {
    return this.currentLang;
  }

  public translate(key: string): string {
    const languagePack = this.translations.get(this.currentLang);
    if (languagePack && key in languagePack) {
      return languagePack[key];
    }
    return key; // Return the key itself if translation is not found
  }
}
