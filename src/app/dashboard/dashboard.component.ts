import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CropService } from '../crop.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Crop {
  crop_name: string;
  id: number;
  index: number;
  payment_link: string;
  service_cost: number | null; // Assuming service_cost can be a number or null
  thumbnails: Thumbnail[];
}

// Define the Thumbnail interface
export interface Thumbnail {
  detail: string;
  id: number;
  image: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  paginatedProducts: any[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;
  username: any = localStorage.getItem('name');
  crops: Crop[] = [];
  detail: Crop[] = [];
  searchDetail: Crop[] = [];
  length: any;
  searchitem: any = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>([]);
  constructor(private cropDetail: CropService) {}
  ngOnInit(): void {
    this.cropDetail.getCrops().subscribe((data) => {
      this.detail = data.data;
      this.length = this.detail.length;
      this.setPaginatedProducts();
      console.log(this.crops[0].crop_name);
    });
  }

  handlePageEvent(event: any) {
    if (event.pageIndex < 5 && !this.searchitem) {
      const startIndex = event.pageIndex * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.crops = this.detail.slice(startIndex, endIndex);
    } else if (this.searchitem) {
      const startIndex = 0 * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.crops = this.searchDetail.slice(startIndex, endIndex);
    }
  }
  setPaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.crops = this.detail.slice(startIndex, endIndex);
  }

  searchItems(event: any): void {
    if (event.length > 0) {
      this.searchitem = true;
      this.searchDetail = this.detail.filter((item) =>
        item.crop_name.toLowerCase().includes(event.toLowerCase())
      );
      this.crops = this.searchDetail.slice(0, 10);
      this.length = this.searchDetail.length;
    } else {
      this.crops = this.detail.slice(0, 10);
      this.length = this.detail.length;
      this.searchitem = false;
    }
  }
}
