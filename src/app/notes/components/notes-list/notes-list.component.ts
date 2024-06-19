import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { NoteComponent } from '../note/note.component';
import { NoteModel } from '../../note.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AddNoteComponent } from '../note/add-note/add-note.component';
import { TranslatePipe } from '../../translate.pipe';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [NoteComponent, MatProgressSpinner, AddNoteComponent, TranslatePipe],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  public notes: NoteModel[] = [];
  public isLoading: boolean = false;
  public error: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.isLoading = true; // Set loading to true when starting to fetch data
    this.apiService.getNotes().subscribe({
      next: (notes) => {
        this.notes = notes;
        this.isLoading = false; // Set loading to false on successful data retrieval
      },
      error: (err) => {
        this.error = 'Failed to load notes'; // Set an error message
        this.apiService.handleError(err);
        this.isLoading = false; // Set loading to false also on error
      },
    });
  }
}
