import { Component, Input } from '@angular/core';
import { NoteModel } from '../../note.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  @Input() public note: NoteModel | undefined;
}
