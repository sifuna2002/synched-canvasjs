import { Component, OnInit } from '@angular/core';
import * as JQuery from "jquery";
import * as CanvasJS from './canvasjs.min';
const $ = JQuery.default;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit{
  ngOnInit() {
    let chart1 = new CanvasJS.Chart("chartContainer1",{
			title: {
				text: "Chart 1"
			},
			axisX: {
				crosshair: {
					enabled: true
				}
			},
      axisY: {
        includeZero: false
      },
			data: [{
			type: "line",
			dataPoints: [
			  { x: 10, y: 31 },
        { x: 20, y: 35 },
        { x: 30, y: 30 },
        { x: 40, y: 35 },
        { x: 50, y: 35 },
        { x: 60, y: 38 },
        { x: 70, y: 38 },
        { x: 80, y: 34 },
        { x: 90, y: 44 }
			]
			}]
		});
		
		let chart2 = new CanvasJS.Chart("chartContainer2",{
			title: {
				text: "Chart 2"
			},
			axisX: {
				crosshair: {
					enabled: true
				}
			},
			data: [{
			type: "line",
			dataPoints: [
				{ x: 10, y: 71 },
				{ x: 20, y: 55 },
				{ x: 30, y: 50 },
				{ x: 40, y: 65 },
				{ x: 50, y: 95 },
				{ x: 60, y: 68 },
				{ x: 70, y: 28 },
				{ x: 80, y: 34 },
				{ x: 90, y: 14 }
			]
			}]
		});
		
		chart1.render();
		chart2.render();
		
		var otherChartCanvas = $("#chartContainer1").find(".canvasjs-chart-canvas").get(1);
		$("#chartContainer2").on("mousemove mouseup mousedown mouseout", function(e){
			otherChartCanvas.dispatchEvent(createEvent(
				e.type,
				e.screenX,
				e.screenY - chart2.get("height"), chart1.axisX[0].convertValueToPixel(chart2.axisX[0].convertPixelToValue(e.clientX)),
				e.clientY - chart2.get("height")
			));
		});

		var otherChartCanvas1 = $("#chartContainer2").find(".canvasjs-chart-canvas").get(1);

		$("#chartContainer1").on("mousemove mouseup mousedown mouseout", function(e){
			otherChartCanvas1.dispatchEvent(createEvent(
				e.type,
				e.screenX,
				e.screenY + chart1.get("height"), chart2.axisX[0].convertValueToPixel(chart1.axisX[0].convertPixelToValue(e.clientX)),
				e.clientY + chart1.get("height")
			));
		});
		
		function createEvent(type, screenX, screenY, clientX, clientY){
			var event = new MouseEvent(type, {
				view: window,
				bubbles: false,
				cancelable: true,
				screenX: screenX,
				screenY: screenY,
				clientX: clientX,
				clientY: clientY
			});
			return event;
		}
  }
}
