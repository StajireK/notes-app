import { Routes } from '@angular/router';
import { NotesListComponent } from './notes/components/notes-list/notes-list.component';
import { NoteDetailComponent } from './notes/components/note/note-detail/note-detail.component';
import { SettingsComponent } from './notes/settings/settings.component';

export const routes: Routes = [
  { path: '', component: NotesListComponent },
  { path: 'notes/:id', component: NoteDetailComponent },
  { path: 'settings', component: SettingsComponent },
];
