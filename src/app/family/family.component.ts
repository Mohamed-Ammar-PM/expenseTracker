import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {
  constructor(
    private router: Router
  ){}
  ngOnInit(): void {
    this.load();
  }
  familyNames: any;

  load(){
    this.familyNames = localStorage.getItem('familyMember');
  }
  addFamily() {
    localStorage.setItem('familyMember', this.familyNames);
    this.router.navigate(['/expense']);

    // console.log(this.totalMembers);
    console.log(this.familyNames);
    console.log(this.familyNames.split('\n'));
    

  }

}
