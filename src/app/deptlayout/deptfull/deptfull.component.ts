import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deptfull',
  templateUrl: './deptfull.component.html',
  styleUrls: ['./deptfull.component.scss']
})
export class DeptfullComponent implements OnInit {
  public domain_name: any;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.domain_name = this.route.snapshot.paramMap.get('domain_name');
  }

}
