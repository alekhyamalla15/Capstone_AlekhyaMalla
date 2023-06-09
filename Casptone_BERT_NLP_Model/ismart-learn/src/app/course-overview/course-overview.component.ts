
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.css']
})
export class CourseOverviewComponent implements OnInit {

  contentObj: any;
  data: string;
  moduleNames: any[] = [];
  contentData: any;

  constructor(private courseService: CourseService) {
  }

  buttonName = 'enable'
  disable = true


  ngOnInit() {
    this.courseService.getContentJson().subscribe(data => {
      this.contentData = data;
      console.log(this.contentData);
      Object.keys(this.contentData).forEach(key => {
        let mapValue = {
          'key': key,
          'desc': this.contentData[key].notes,
          'name': this.contentData[key].name
        };
        this.moduleNames.push(mapValue);

      })
    });

  }

}
