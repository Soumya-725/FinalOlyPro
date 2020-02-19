import { NotFoundComponent } from './../not-found/not-found.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRoutingService } from '../api-routing.service';

@Component({
  selector: 'index-header-with-search',
  templateUrl: './index-header-with-search.component.html',
  styleUrls: ['./index-header-with-search.component.css']
})
export class IndexHeaderWithSearchComponent implements OnInit {
  searchData: any;
  allSearchRes: any[];
  allTypeNames: any;
  types: any;
  isSearchResultBox: boolean;
  isNodataFound: boolean = false;

  constructor(private ApiRoutingService: ApiRoutingService, private router: Router) { }

  ngOnInit() {
  }

  search($event) {
    if ($event.target.value === '') {
      this.isSearchResultBox = false;
      this.isNodataFound = false;

    }
    else {
      this.ApiRoutingService.getSearch$($event.target.value)
        .subscribe(allSearchRes => {

          if (allSearchRes[0].length != 0) {
            this.isSearchResultBox = true;
            this.isNodataFound = false;
            this.allSearchRes = allSearchRes[0];
          }
          else {
            this.isSearchResultBox = false;
            this.isNodataFound = true;
          }

        },
          err => {
            this.isSearchResultBox = false;
          })
    }

  }
  pasteItems($val) {
    if($val.clipboarvalue.value === ''){
    this.isSearchResultBox = false;
    this.isNodataFound = true;
  }
  else {
    this.isSearchResultBox = true;
    this.isNodataFound = false;
  }

  }

  reDirect(type, id) {
    if (type === 'player') {
      this.router.navigate(['/player/' + id])
    }
    else {
      this.router.navigate(['/players/' + id])
    }
  }

}
