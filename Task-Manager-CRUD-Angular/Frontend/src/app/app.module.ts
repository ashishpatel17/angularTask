import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './page/task-list/task-list.component';
import { InfocardComponent } from './components/infocard/infocard.component';
import { TaskServiceService } from './services/task-service.service';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormatDatePipe } from './services/format-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    InfocardComponent,
    TaskFormComponent,
    FormatDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [TaskServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
