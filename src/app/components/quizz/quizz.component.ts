import { Component, OnInit , Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import quizz from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any
  quizz_questions:any

  answers:string[] = []
  answerSelected:string =""

  questionIndex:number =0
  questionMaxIndex:number=0

  finished:boolean = false

   @Input()
   numberQuizzSelected!:number;
 
  constructor(private activeRoute: ActivatedRoute) { 
     this.activeRoute.params.subscribe(
       res => {
         this.numberQuizzSelected = Number(res['id'])
         console.log(res)}
     )
    
     this.quizz_questions = quizz[this.numberQuizzSelected]
   }

  ngOnInit(): void {
    console.log(this.quizz_questions)
    if(this.quizz_questions){
      this.finished = false
      this.title = this.quizz_questions.title

      this.questions = this.quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }

  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()

  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = this.quizz_questions.results[finalAnswer as keyof typeof this.quizz_questions.results ]
    }
  }

  async checkResult(anwsers:string[]){

    const result = anwsers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })

    return result
  }

}
