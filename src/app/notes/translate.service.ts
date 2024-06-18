import { Injectable } from '@angular/core';
import enTranslations from '../../assets/en.json';
import csTranslations from '../../assets/cs.json';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private translations = new Map<string, any>();
  private currentLang: string = 'en';

  constructor() {
    this.translations.set('en', enTranslations);
    this.translations.set('cs', csTranslations);
  }

  public setLanguage(lang: string): void {
    this.currentLang = lang;
  }

  public translate(key: string): string {
    return this.translations.get(this.currentLang)[key] || key;
  }
}
