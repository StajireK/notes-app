import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { NoteModel } from './note.model';
import { MatDialog } from '@angular/material/dialog';
import { NotesDialogComponent } from './components/notes-dialog/notes-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string =
    'https://private-4177dc-note10.apiary-mock.com/notes';
  private notesSubject: BehaviorSubject<NoteModel[]> = new BehaviorSubject<
    NoteModel[]
  >([]);

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
  ) {}

  // Get all Notes
  public getNotes(): Observable<NoteModel[]> {
    return this.http
      .get<NoteModel[]>(this.baseUrl)
      .pipe(tap((notes) => this.notesSubject.next(notes)));
  }

  public createNote(note: NoteModel): Observable<NoteModel> {
    return this.http.post<NoteModel>(this.baseUrl, note).pipe(
      tap((note) => {
        const currentNotes = this.notesSubject.getValue();
        this.notesSubject.next([...currentNotes, note]);
      }),
    );
  }

  // Get single Note by ID
  public getNoteById(id: number): Observable<NoteModel> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<NoteModel>(url);
  }

  // Update an existing Note
  public updateNote(id: number, note: NoteModel): Observable<NoteModel> {
    return this.http.put<NoteModel>(`${this.baseUrl}/${id}`, note);
  }

  // Delete a Note
  public deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  public handleError(error: HttpErrorResponse) {
    const userFriendlyMessage =
      'Unable to complete request. Please try again later.';
    const errorCode = 'Error code :' + error.status;

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred
      console.error('Network error:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
      );
    }

    // Show user-friendly error message
    this.showErrorMessage(userFriendlyMessage, errorCode);

    // Optionally transform error for component consumption
    return throwError(() => new Error(userFriendlyMessage));
  }

  public showErrorMessage(userFriendlyMessage: string, errorCode: string) {
    const dialogRef = this.dialog.open(NotesDialogComponent, {
      data: {
        error: userFriendlyMessage,
        errorMessage: errorCode,
      },
    });
    setTimeout(() => {
      dialogRef.close();
    }, 3000);
  }

  public showSuccessMessage(message: string) {
    const dialogRef = this.dialog.open(NotesDialogComponent, {
      data: {
        success: message,
      },
    });
    setTimeout(() => {
      dialogRef.close();
    }, 3000);
  }
}
