import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../../translate.pipe';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatIcon,
    FormsModule,
    MatLabel,
    MatIconButton,
    MatSuffix,
    TranslatePipe,
  ],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNoteComponent {
  public value: string = '';

  constructor(
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  public addNote() {
    if (this.value) {
      const newNote = { title: this.value };
      this.apiService.createNote(newNote).subscribe({
        next: () => {
          this.value = '';
          this.changeDetectorRef.markForCheck();
        },
        error: (error) => console.error('Error adding note:', error),
      });
    }
  }
}
