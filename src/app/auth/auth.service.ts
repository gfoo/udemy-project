import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Injectable()
export class AuthService implements OnInit {

  token: string;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(localStorage.getItem('myCat'));
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
      error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
      response => {
        console.log(response);
        this.router.navigate(['/']);
        firebase.auth().currentUser.getToken()
          .then(
          (token: string) => this.token = token
          );
      }
      )
      .catch(
      error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getToken().then(
      (token: string) => this.token = token
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
