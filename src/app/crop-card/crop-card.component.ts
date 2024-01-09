import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Crop } from '../dashboard/dashboard.component';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-crop-card',
  templateUrl: './crop-card.component.html',
  styleUrls: ['./crop-card.component.scss'],
})
export class CropCardComponent implements OnInit {
  @Input() crop: Crop | undefined;

  ngOnInit(): void {}

  constructor(public dialog: MatDialog) {}

  openImageModal(): void {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: {
        imageUrl: this.crop?.thumbnails[0].image,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
