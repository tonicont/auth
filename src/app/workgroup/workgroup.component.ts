import {Component, OnInit} from '@angular/core';
import {WorkgroupService} from '../core/workgroup.service';
import {ActivatedRoute} from "@angular/router";
import {FirebaseUserModel} from "../core/user.model";
import {UserService} from "../core/user.service";

@Component({
  selector: 'app-workgroup',
  templateUrl: './workgroup.component.html',
  styleUrls: ['./workgroup.component.scss']
})
export class WorkgroupComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();

  workgroupList = [];

  constructor(public workgroupService: WorkgroupService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.user = data;
        this.getGroups();
      }
    });
  }

  getGroups() {
    const workgroupsList = this.workgroupService.getUserGroups(this.user.id);
    workgroupsList.then(groupList => {
      groupList.forEach(group => {
        this.workgroupList.push(group.data());
      });
    });
  }

}
