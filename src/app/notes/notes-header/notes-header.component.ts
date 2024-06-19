import { Component } from '@angular/core';
import { TranslateService } from '../translate.service';
import { TranslatePipe } from '../translate.pipe';
import { AsyncPipe } from '@angular/common';
import {
  MatButton,
  MatFabButton,
  MatIconButton,
  MatMiniFabButton,
} from '@angular/material/button';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes-header',
  standalone: true,
  imports: [
    TranslatePipe,
    AsyncPipe,
    MatButton,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatFormField,
    MatSelect,
    MatOption,
    FormsModule,
    MatFabButton,
    MatIcon,
    MatMiniFabButton,
    MatIconButton,
  ],
  templateUrl: './notes-header.component.html',
  styleUrl: './notes-header.component.scss',
})
export class NotesHeaderComponent {
  public selectedLanguage: string = 'en';

  constructor(
    private translateService: TranslateService,
    private router: Router,
  ) {
    this.translateService.setLanguage(this.selectedLanguage);
  }
  public isSettingsPage(): boolean {
    return this.router.url === '/settings';
  }

  public goToSettings(): void {
    this.router.navigate(['settings']);
  }
}
