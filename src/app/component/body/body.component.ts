import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  constructor(public matDialog: MatDialog) {}
  ngOnInit(): void {
    this.closeModal();
  }

  closeModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    const modalDialog = this.matDialog.closeAll();
  }
}
