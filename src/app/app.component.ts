import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AddNoteComponent} from "./notes/components/note/add-note/add-note.component";
import {NotesHeaderComponent} from "./notes/notes-header/notes-header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddNoteComponent, NotesHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
