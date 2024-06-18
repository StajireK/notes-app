import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NoteModel} from "../../note.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteComponent {

  @Input() public note: NoteModel | undefined;

  constructor(private router: Router) {
  }

  public redirectToDetail(id: number): void {
    this.router.navigate(['notes/' + id]);
  }

}
