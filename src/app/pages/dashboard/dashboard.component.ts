import { Component, OnInit } from '@angular/core';
import quizzBase from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  listQuizz:Object[] = []
  
  constructor() { }

  ngOnInit(): void {
    this.listQuizz = quizzBase
  }

}
