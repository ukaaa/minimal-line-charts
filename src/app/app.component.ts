import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: Array<any> = [];
  dataPoints = 7;

  ngOnInit() {
    this.addChart()
    Observable.interval(1000).subscribe(() => {
      this.items.forEach((item) => item.refresh())
    })
  }

  addChart() {
    const item = this.getItem(this.dataPoints)
    this.items.push(item)
    item.init()
  }

  private getItem (n) {
    return {
      data: [],
      getRandomData: () => Array.from({ length: n }, Math.random),
      refresh: function() { this.data = this.getRandomData() },
      init: function() { this.refresh() }
    }
  }
}
