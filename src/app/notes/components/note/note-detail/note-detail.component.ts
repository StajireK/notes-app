import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { NoteModel } from '../../../note.model';
import { NoteComponent } from '../note.component';
import { TranslatePipe } from '../../../translate.pipe';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { TranslateService } from '../../../translate.service';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatSuffix,
    NoteComponent,
    MatFabButton,
    TranslatePipe,
    MatProgressSpinner,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDetailComponent implements OnInit {
  public note: NoteModel | undefined;
  public isLoading: boolean = false;
  public isEditMode: boolean = false;

  public noteForm = new FormGroup({
    note: new FormControl('', Validators.required),
  });

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private translateService: TranslateService,
  ) {}

  public ngOnInit() {
    this.noteForm.disable();
    this.isLoading = true;
    this.route.params
      .pipe(
        switchMap((params) => {
          const id = +params['id'];
          return this.apiService.getNoteById(id);
        }),
      )
      .subscribe({
        next: (note) => {
          this.note = note;
          this.noteForm.patchValue({ note: note.title });
          this.isLoading = false;
          this.changeDetector.markForCheck();
        },
        error: (err) => {
          this.apiService.handleError(err);
          console.error('Error fetching notes', err);
          this.isLoading = false;
        },
      });
  }

  public edit() {
    this.noteForm.enable();
    this.isEditMode = true;
  }

  public save() {
    if (this.noteForm.valid && this.note && this.note.id) {
      const updatedNote: NoteModel = {
        id: this.note.id,
        title: this.noteForm.value.note,
      };
      this.apiService.updateNote(this.note.id, updatedNote).subscribe({
        next: (updatedNote) => {
          this.note = updatedNote;
          this.isEditMode = false;
          this.apiService.showSuccessMessage(
            this.translateService.translate('note_updated'),
          );
          this.changeDetector.markForCheck();
        },
        error: (err) => {
          this.apiService.handleError(err);
          console.error('Failed to update note', err);
        },
      });
    }
  }

  public goBack() {
    this.router.navigate(['/']);
  }

  public deleteNote() {
    if (this.note && this.note.id) {
      this.apiService.deleteNote(this.note.id).subscribe({
        next: () => {
          this.apiService.showSuccessMessage(
            this.translateService.translate('note_deleted'),
          );
          this.goBack();
        },
        error: (err) => {
          this.apiService.handleError(err);
          console.error('Failed to delete note', err);
        },
      });
    }
  }
}
