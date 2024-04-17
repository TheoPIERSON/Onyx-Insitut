import { Component } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;

  event: CalendarEvent[] = [];

  constructor() {
    const event1 = {
      title: 'cours de tennis',
      start: new Date('2024-04-05T11:00:00'),
      end: new Date('2024-04-05T15:00:00'),
    };
    this.event.push(event1);
  }

  setView(view: CalendarView) {
    this.view = view;
  }
}
