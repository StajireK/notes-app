import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogData } from './notes-dialog-data.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-note-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogTitle, NgClass],
  templateUrl: './notes-dialog.component.html',
  styleUrl: './notes-dialog.component.scss',
})
export class NotesDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
