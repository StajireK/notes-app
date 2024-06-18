import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ApiService } from "../../../api.service";
import {ActivatedRoute, Router} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {NoteModel} from "../../../note.model";
import {NoteComponent} from "../note.component";
import {TranslatePipe} from "../../../translate.pipe";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";

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
    MatLabel
  ],
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NoteDetailComponent implements OnInit {

  public note: NoteModel | undefined;
  public isLoading: boolean = false;
  public isEditMode: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.params.pipe(
      switchMap(params => {
        const id = +params['id'];
        return this.apiService.getNoteById(id);
      })
    ).subscribe({
      next: (note) => {
        this.note = note;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching notes', err);
        this.isLoading = false;
      }
    });
  }

  public edit() {
    this.isEditMode = true;
  }

  public save() {
    if (this.note && this.note.id) {
      this.apiService.updateNote(this.note.id, this.note).subscribe({
        next: (updatedNote) => {
          this.note = updatedNote;
          this.isEditMode = false;
          this.changeDetector.markForCheck();
        },
        error: (err) => {
          console.error('Failed to update note', err);
        }
      });
    }
  }


  public goBack() {
    this.router.navigate(['/'])
  }

  public deleteNote() {
    if (this.note && this.note.id) {
      this.apiService.deleteNote(this.note.id).subscribe({
        next: () => {
          this.goBack();
        },
        error: (err) => {
          console.error('Failed to delete note', err);
        }
      });
    }
  }
}
