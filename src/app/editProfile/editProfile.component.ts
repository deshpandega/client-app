import {Component} from '@angular/core';

@Component({
  selector: 'edit-profile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.css']
})

export class EditProfileComponent  {

  currentDiv= 'profile' ;
  managePayment(){
    this.currentDiv = 'payment';
    console.log(this.currentDiv + ' is the current value');
  }
  openDiv() {
    this.currentDiv = 'profile';
    console.log( ' ------ ' + this.currentDiv);
    // if (activityName === 'EditProfile') {
    //   this.currentDiv = 'profile';
    // } else {
    //   this.currentDiv = 'falafal';
    // }
    // var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    // tabcontent = document.getElementsByClassName("tabcontent");
    // for (i = 0; i < tabcontent.length; i++) {
    //   tabcontent[i].style.display = "none";
    // }

    // Get all elements with class="tablinks" and remove the class "active"
    // tablinks = document.getElementsByClassName("tablinks");
    // for (i = 0; i < tablinks.length; i++) {
    //   tablinks[i].className = tablinks[i].className.replace(" active", "");
    // }

    // Show the current tab, and add an "active" class to the link that opened the tab
    // document.getElementById(activityName).style.display = "block";
    // evt.currentTarget.className += " active";
  }

}
