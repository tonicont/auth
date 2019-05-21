import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';

@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss']
})
export class UserComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.user = data;
        this.getUserData();
        this.createForm(this.user.name, this.user.surname);
      }
    });
  }

  createForm(name, surname) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ],
      surname: [surname, Validators.required ]
    });
  }

  save(value) {
    this.userService.updateCurrentUser(value)
      .then(res => {
        console.log(res);
      }, err => console.log(err));
  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log('Logout error', error);
      });
  }

  getUserData() {
    this.userService.readUserData(this.user.id)
      .then(doc => {
        if (doc.exists) {
          this.user.name = doc.data().username;
          this.user.surname = doc.data().surname;
          this.createForm(this.user.name, this.user.surname);
        } else {
          console.log('Usuario no encontrado');
        }
    }).catch(error => {
      console.log('Error al obtener datos de usuario');
    });
  }
}
