import { questionList } from './helpers/questionList';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
} from '@angular/core';
import { IQuestion } from './models/question';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('slider', { static: true }) slider!: ElementRef<HTMLDivElement>;
  @ViewChild('answer', { static: true }) answer!: ElementRef<HTMLDivElement>;
  @ViewChild('questionContainer', { static: true }) questionContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('logo', { static: true }) logo!: ElementRef<HTMLDivElement>;
  @ViewChild('search', { static: true }) search!: ElementRef<HTMLDivElement>;
  @ViewChild('main', { static: true }) main!: ElementRef<HTMLDivElement>;
  @ViewChild('actions', { static: true }) actions!: ElementRef<HTMLDivElement>;
  @ViewChild('progress', { static: true }) progress!: ElementRef<HTMLDivElement>;
  @ViewChild('menu', { static: true }) menu!: ElementRef<HTMLUListElement>;
  @ViewChild('elementToAnswer', { static: true }) elementToAnswer!: QueryList<ElementRef<HTMLDivElement>>;
  // Use @ViewChild to get references to DOM elements.

  currentQuestionIndex = 0;
  // Initialize the current question index to 0.

  progressValue: number = 0;
  // Initialize the progress value to 0.

  questions = questionList;
  // Assign the imported question list to the questions property.

  selectedAnswers: number[] = [];
  // Initialize an array to store selected answers.

  constructor(private _ChangeDetectorRef: ChangeDetectorRef) {}
  // Inject the ChangeDetectorRef service to manually trigger change detection.

  ngOnInit(): void {
    this.initAnimations();
    // Initialize animations when the component loads.

    this.increaseProgressValue();
    // Calculate the initial progress value.
  }

  initAnimations(): void {
    gsap.from(this.main.nativeElement, {
      delay: 0.2,
      duration: 0.4,
      opacity: 0,
      y: -20,
    });
    // Animate the main container with GSAP.

    gsap.from(this.questionContainer.nativeElement.childNodes, {
      delay: 0.5,
      duration: 0.4,
      opacity: 0,
      y: -20,
      stagger: 0.15,
    });
    // Animate the question container children with GSAP.

    gsap.from(this.menu.nativeElement.childNodes, {
      delay: 0.4,
      duration: 0.4,
      opacity: 0,
      y: -20,
      stagger: 0.15,
    });
    // Animate the menu items with GSAP.

    gsap.from(this.search.nativeElement.childNodes, {
      delay: 0.8,
      duration: 0.4,
      opacity: 0,
      y: -20,
      stagger: 0.15,
    });
    // Animate the search area with GSAP.

    gsap.from(this.logo.nativeElement, {
      delay: 0.3,
      duration: 0.4,
      opacity: 0,
      y: -20,
    });
    // Animate the logo with GSAP.

    gsap.from(this.actions.nativeElement.childNodes, {
      delay: 0.6,
      duration: 0.4,
      opacity: 0,
      y: -20,
      stagger: 0.15,
    });
    // Animate the action buttons with GSAP.

    gsap.from(this.progress.nativeElement.childNodes, {
      delay: 0.7,
      duration: 0.4,
      opacity: 0,
      y: -20,
      stagger: 0.15,
    });
    // Animate the progress bar with GSAP.

  }

  ngAfterViewInit(): void {
    this.hello()
  }

  get question(): IQuestion {
    return this.questions[this.currentQuestionIndex];
    // Get the current question based on the current question index.
  }

  hello() {
    this.elementToAnswer.forEach((item) => {
      console.log(item);
    })
  }

  increaseProgressValue(): void {
    this.progressValue = (100 * (this.currentQuestionIndex + 1)) / this.questions.length;
    // Calculate the progress value as a percentage.

    if (this.currentQuestionIndex == 0) {
      gsap.to(this.slider.nativeElement, {
        delay: 0.7,
        duration: 0.6,
        width: `${this.progressValue}%`,
      });
    } else {
      gsap.to(this.slider.nativeElement, {
        duration: 0.6,
        width: `${this.progressValue}%`,
      });
    }
    // Animate the progress bar width based on the progress value.
  }

  onSelect(answerIndex: number): void {
    this.selectedAnswers[this.currentQuestionIndex] = answerIndex;
    // Store the selected answer index for the current question.

    this.updateSelectedAnswer();
    // Update the selected answer visually.
  }

  isAnswerSelected(): boolean {
    return this.selectedAnswers[this.currentQuestionIndex] !== undefined;
  }
  // check if there is any answer has been selected to disable the next button

  updateSelectedAnswer(): void {
    this.answer.nativeElement.childNodes.forEach((node, index) => {
      if (node instanceof HTMLDivElement && node.classList && node.classList.contains('answer')) {
        if (this.selectedAnswers[this.currentQuestionIndex] === index) {
          node.classList.add('selected');
        } else {
          node.classList.remove('selected');
        }
      }
    });
    // Add or remove the 'selected' class for answer elements based on the selected answer.
  }

  prev(): void {
    if (this.currentQuestionIndex > 0) {
      gsap.to(this.questionContainer.nativeElement.childNodes, {
        duration: 0.4,
        opacity: 0,
        y: -20,
        stagger: 0.15,
        onComplete: () => {
          this.currentQuestionIndex--;
          this.increaseProgressValue();
          this._ChangeDetectorRef.detectChanges();
          this.updateSelectedAnswer();
          gsap.to(this.questionContainer.nativeElement.childNodes, {
            duration: 0.4,
            opacity: 1,
            y: 0,
            stagger: 0.15,
          });
        },
      });
    }
    // Navigate to the previous question with animations if not on the first question.
  }

  goToNextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      gsap.to(this.questionContainer.nativeElement.childNodes, {
        duration: 0.4,
        opacity: 0,
        y: -20,
        stagger: 0.15,
        onComplete: () => {
          this.currentQuestionIndex++;
          this.increaseProgressValue();
          this._ChangeDetectorRef.detectChanges();
          this.updateSelectedAnswer();
          gsap.to(this.questionContainer.nativeElement.childNodes, {
            duration: 0.4,
            opacity: 1,
            y: 0,
            stagger: 0.2,
          });
        },
      });
    }
    // Navigate to the next question with animations if not on the last question.
  }
}
