import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, Input } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-module-overview',
  templateUrl: './module-overview.component.html',
  styleUrls: ['./module-overview.component.css']
})
export class ModuleOverviewComponent implements OnInit, AfterViewInit {

  moduleNames: any[] = [];
  selectedModule: any;
  contentType: string;
  moduleData: any;
  contentData: any;
  webLinks: any;
  webVideoLinks: any;
  showVideo = false;
  showWebResult = false;
  value = "";
  videovalue = "";
  abstract: any;
  showAbstract = false;
  showResult: any = "";
  confidence: number = 0;

  constructor(private courseService: CourseService,
    private renderer: Renderer2,
    private element: ElementRef,
    private activatedRoute: ActivatedRoute) {
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.contentType = params.content;
    });

    this.courseService.getContentJson().subscribe(data => {
      this.contentData = data;
      this.moduleData = this.contentData[this.contentType].modules
      Object.keys(this.moduleData).forEach((key, index) => {
        console.log(key);
        console.log(this.moduleData[key]);
        let moduleName = {
          'key': key,
          'name': this.moduleData[key]['name']
        };
        this.moduleNames.push(moduleName);
      });
    })
  }

  ngAfterViewInit() {
    const submit = this.element.nativeElement.querySelector('#submit');
    this.renderer.listen(submit, 'click', (event) => {
      let validateAnswerContent = {
        "user_answer": this.selectedModule.answers[0],
        "actual_answer": this.selectedModule.inputAnswers[0]
      }
      this.courseService.validateAnswer(validateAnswerContent).subscribe(data => {
        if (data["is_true"]) {
          this.showResult = "correct"
        } else {
          this.showResult = "incorrect"
        }
        this.confidence = data["similarity_score"];
      })
      console.log(this.selectedModule);
    });
  }

  _keyUp(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.key);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  searchWeb(event) {
    console.log(event);
    this.courseService.getWebSearch(event).subscribe(result => {
      if (result !== null && typeof result !== 'undefined') {
        this.webLinks = result;
        this.showWebResult = true;
      }
    });
  }

  searchVideo(query) {
    this.showVideo = true;
    this.courseService.getWebvideo(query).subscribe(video => {
      if (video !== null && typeof video !== 'undefined') {
        this.webVideoLinks = video;
      }
    });
  }

  sendContent(content) {
    if (content !== null && typeof content !== 'undefined') {
      this.courseService.postAbstarct({ 'content': content }).subscribe(result => {
        console.log(result);
        this.abstract = result;
        this.showAbstract = true;
      });
    }

  }

  removeWebResults(closediv) {
    if (closediv === 'link') {
      this.showWebResult = false;
    } else if (closediv === 'video') {
      this.showVideo = false;
    } else {
      this.showAbstract = false;
    }

  }

  openModule(moduleKey) {
    this.selectedModule = this.moduleData[moduleKey];
    console.log(this.selectedModule)
  }

}
