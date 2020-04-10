import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(
    public authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authservice.getProfile().subscribe((profile:any) => {
      this.user = profile.user;
      console.log(profile.user);
    },
      err => {
        console.log(err);

        return false;
      });
  }

}
