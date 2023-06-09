import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { ModuleOverviewComponent } from './module-overview/module-overview.component';


const routes: Routes = [
  { path: '', redirectTo: 'course-overview',  pathMatch: 'full' },
  {
    path: 'course-overview',
    component: CourseOverviewComponent
  },
  {
    path: 'module-overview',
    component: ModuleOverviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
