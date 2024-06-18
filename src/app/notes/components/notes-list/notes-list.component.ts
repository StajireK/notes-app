import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ApiService } from '../../api.service';
import { NoteComponent } from '../note/note.component';
import { NoteModel } from '../../note.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AddNoteComponent } from '../note/add-note/add-note.component';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [NoteComponent, MatProgressSpinner, AddNoteComponent],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListComponent implements OnInit {
  public notes: NoteModel[] = [];
  public isLoading: boolean = false;
  public error: string = '';

  constructor(
    private apiService: ApiService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.apiService.notes$.subscribe({
      next: (notes) => {
        this.notes = notes;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching notes', err);
        this.error = 'Failed to load notes';
        this.isLoading = false;
      },
    });
    this.apiService.getNotes().subscribe();
  }
}
