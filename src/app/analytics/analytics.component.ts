import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  columnChartOptions: any = getColumnChartOptions()
  pieChartOptions: any = getPieChartOptions()
  updateFlag: boolean = false; // optional boolean
  updatePieFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngularFlag: boolean = false; // optional boolean, defaults to false

  constructor(private as: AnalyticsService) { }

  ngOnInit(): void {
    this.getJourneyStats();
    this.getDestinationStats()
  }

  getJourneyStats() {
    this.as.getJourneyStats().subscribe(
      stats => {
        for (const stat of stats) {
          this.columnChartOptions.xAxis.categories.push(stat.date)
          this.columnChartOptions.series[0].data.push(parseInt(stat.busCapacity) - parseInt(stat.freeSeats+""))
          this.columnChartOptions.series[1].data.push(parseInt(stat.freeSeats+""))
        }
        this.updateFlag = true
      }
    )
  }

  getDestinationStats() {
      this.as.getDestinationStats().subscribe(
          stats => {
              for (const stat of stats) {
                  this.pieChartOptions.series[0].data.push({
                      name: `${stat.cityName}-${stat.provinceName}`,
                      y: parseFloat(stat.totalJourneys)
                  })
                  this.updatePieFlag = true
              }
          }
      )
  }

}

function getColumnChartOptions() {
    return {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Seats Booked Summary'
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of seats'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Booked Seats',
            data: []
        }, {
            name: 'Free Seats',
            data: []
        }]
    };
}

function getPieChartOptions() {
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Top Destinations'
        },
        series: [{
            name: 'Trips',
            colorByPoint: true,
            data: []
        }]
    };
}