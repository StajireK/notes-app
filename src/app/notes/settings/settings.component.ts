import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { TranslatePipe } from '../translate.pipe';
import { MatFormField } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatIcon,
    MatFabButton,
    TranslatePipe,
    MatFormField,
    MatOption,
    MatSelect,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  public selectedLanguage: string = 'en';

  constructor(
    private router: Router,
    private translateService: TranslateService,
  ) {}

  public onLanguageChange(lang: string): void {
    this.selectedLanguage = lang;
    this.translateService.setLanguage(this.selectedLanguage);
  }

  public goBack() {
    this.router.navigate(['/']);
  }
}
