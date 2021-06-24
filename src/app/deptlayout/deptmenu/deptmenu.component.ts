import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menus } from './menu-item';
@Component({
  selector: 'app-deptmenu',
  templateUrl: './deptmenu.component.html',
  styleUrls: ['./deptmenu.component.scss']
})
export class DeptmenuComponent implements OnInit {
  public menus: any = [];
  public domain_name: any;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.domain_name = '/dept/' + this.route.snapshot.paramMap.get('domain_name');
    console.log(this.domain_name);
    this.menus = Menus;
  }

}
