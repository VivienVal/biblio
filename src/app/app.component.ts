import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(){
		var config = {
		    apiKey: "AIzaSyD9NJ7MTWkoJIi8cR8szOIMSQGJ65p132c",
		    authDomain: "biblio-31040.firebaseapp.com",
		    databaseURL: "https://biblio-31040.firebaseio.com",
		    projectId: "biblio-31040",
		    storageBucket: "",
		    messagingSenderId: "679495257825"
	  	};
	  	firebase.initializeApp(config);
	}
}
