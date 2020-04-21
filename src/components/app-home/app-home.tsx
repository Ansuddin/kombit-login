import { Component, h } from '@stencil/core';
import {AuthService} from '../../auth/auth'

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">

        <ion-button onClick={() => AuthService.login()} >Login</ion-button>
      </ion-content>
    ];
  }
}
