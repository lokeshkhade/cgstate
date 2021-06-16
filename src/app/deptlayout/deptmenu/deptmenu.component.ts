import { Component, OnInit } from '@angular/core';
import { Menus } from './menu-item';
@Component({
  selector: 'app-deptmenu',
  templateUrl: './deptmenu.component.html',
  styleUrls: ['./deptmenu.component.scss']
})
export class DeptmenuComponent implements OnInit {
  public menus: any = [];
  constructor() { }

  ngOnInit(): void {
    this.menus = Menus;
  }

}
