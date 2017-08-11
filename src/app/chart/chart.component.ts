import { Component, OnInit, OnChanges, Input, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() strokeWidth = 2;
  @Input() data: Array<number>;
  @Input() width: number;
  @Input() height: number;
  @Input() stroke: string;
  @Input() background: string;
  @Input() padding: number = this.strokeWidth;
  @ViewChild('svg') svg: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.draw(this.data)
  }

  draw (data: Array<number>) {
    const xExtent = [0, data.length - 1]
    const xRange = [this.padding, this.width - this.padding]
    const x = d3.scaleLinear()
      .domain(xExtent)
      .range(xRange)

    const yExtent = [0, 1]
    const yRange = [this.height - this.padding, this.padding]
    const y = d3.scaleLinear()
      .domain(yExtent)
      .range(yRange)

    var area = d3.area()
      .x((d, i) => x(i))
      .y0(this.height - this.padding)
      .y1(y);

    var valueLine = d3.line()
      .x((d, i) => x(i))
      .y(y);

    const areaEls = d3.select(this.svg.nativeElement)
      .selectAll('path.area')

    areaEls
      .data([data])
      .enter()
      .append('path')
      .attr('class', 'area')
      .attr('d', d3.area().x((d, i) => x(i)).y0(this.height - this.padding).y1(() => this.height - this.padding))
      .attr('fill', this.stroke)
      .attr('opacity', 0.2)
      .merge(areaEls)
      .transition()
      .ease(d3.easeCircle)
      .duration(500)
      .attr('d', area)

    const valueLineEls = d3.select(this.svg.nativeElement)
      .selectAll('path.valueLine')

    valueLineEls
      .data([data])
      .enter()
      .append('path')
      .attr('class', 'valueLine')
      .attr('d', d3.line().x((d, i) => x(i)).y(() => this.height - this.padding))
      .attr('fill', 'none')
      .attr('stroke', this.stroke)
      .attr('stroke-width', `${this.strokeWidth}px`)
      .attr('stroke-linecap', this.padding ? 'round' : 'square')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-miterlimit', 1)
      .merge(valueLineEls)
      .transition()
      .ease(d3.easeCircle)
      .duration(500)
      .attr('d', valueLine)
  }
}
