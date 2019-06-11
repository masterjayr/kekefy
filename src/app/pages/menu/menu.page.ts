import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth';
import { UserService } from 'src/app/services/user/user.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
    {
      title: 'Home',
      url: '/menu/request',
      icon: 'home',
      type: 2
    },
    {
      title: 'Home',
      url: '/menu/tabrider/tabrider/pickup',
      icon: 'home',
      type: 1
    },
    {
      title: 'Support',
      url: '/menu/support',
      icon: 'home',
      type: 1
    },

    {
      title: 'Support',
      url: '/menu/support',
      icon: 'home',
      type: 2
    },

    {
      title: 'Profile',
      url: '/menu/profile',
      icon: 'contact',
      type: 2 
    },

    {
      title: 'Profile',
      url: '/menu/profile',
      icon: 'contact',
      type: 1
    }, 

    {
      title: 'Messages',
      url: '/menu/cuschat',
      icon: 'chatbubbles',
      type: 2
    },

    {
      title: 'About',
      url: '/menu/about',
      icon: 'more',
      type: 2
    },

    {
      title: 'About',
      url: '/menu/about',
      icon: 'more',
      type: 1
    }

  ]

  selectedPath = '';
  whoIsLoggedIn: number;
  photoURL = '';
  displayName = '';
  constructor(private router: Router, private authservice: AuthService, private userService: UserService) {
    this.photoURL = firebase.auth().currentUser.photoURL;
    this.displayName= firebase.auth().currentUser.displayName;
    console.log("Photo URL >>>", this.photoURL);
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    })
    if (this.authservice.type === undefined) {
      this.whoIsLoggedIn = this.userService.type
      console.log("User service>>> ", this.userService.type)
      console.log("Sign Up who is logged in>>> ", this.whoIsLoggedIn)
    } else {
      this.whoIsLoggedIn = this.authservice.type
      console.log(this.authservice.type);
    }

  }

  ngOnInit() {
  }

}
