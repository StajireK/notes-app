import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '../../../translate.pipe';
import { ApiService } from '../../../api.service';
import { TranslateService } from '../../../translate.service';
import { NoteModel } from '../../../note.model';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatIcon,
    MatLabel,
    MatIconButton,
    MatSuffix,
    TranslatePipe,
  ],
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNoteComponent {
  public noteForm = new FormGroup({
    note: new FormControl('', Validators.required),
  });

  constructor(
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef,
    private translateService: TranslateService,
  ) {}

  public addNote() {
    if (this.noteForm.valid) {
      const newNote: NoteModel = {
        title: this.noteForm.get('note')?.value || '',
      };
      this.apiService.createNote(newNote).subscribe({
        next: () => {
          this.noteForm.reset(); // Reset the form
          this.apiService.showSuccessMessage(
            this.translateService.translate('note_added'),
          );
          this.changeDetectorRef.markForCheck();
        },
        error: (error) => {
          this.apiService.handleError(error);
          console.error('Error adding note:', error);
        },
      });
    }
  }
}
