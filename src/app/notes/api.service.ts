import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {NoteModel} from "./note.model";

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseUrl: string = 'https://private-4177dc-note10.apiary-mock.com/notes';
  private notesSubject : BehaviorSubject<NoteModel[]> = new BehaviorSubject<NoteModel[]>([]);
  public notes$: Observable<NoteModel[]> = this.notesSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  // Get all Notes
  public getNotes(): Observable<NoteModel[]> {
    return this.http.get<NoteModel[]>(this.baseUrl).pipe(
      tap(notes => this.notesSubject.next(notes))
    );
  }

  public createNote(note: any): Observable<NoteModel> {
    return this.http.post<NoteModel>(this.baseUrl, note).pipe(
      tap(note => {
        const currentNotes = this.notesSubject.getValue();
        this.notesSubject.next([...currentNotes, note]);
      })
    );
  }

  // Get single Note by ID
  public getNoteById(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url);
  }


  // Update an existing Note
  public updateNote(id: number, note: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, note);
  }

  // Delete a Note
  public deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
