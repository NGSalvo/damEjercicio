import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewDidEnter, ViewWillEnter, ModalController } from '@ionic/angular';
import { Device } from '../models/Device';
import { DeviceService } from '../services/device.service';
import { IrrigationLog } from '../models/IrrigationLog';

import * as Highcharts from 'highcharts';
import { IrrigationLogListPage } from '../irrigation-log-list/irrigation-log-list.page';
import { Measurement } from '../models/Measurement';
declare let require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
})
export class DevicePage implements OnInit, ViewWillEnter, ViewDidEnter {
  deviceId: string;
  device: Device;
  isOpen: boolean;
  irrigationLog: Array<IrrigationLog>;
  measurements: Array<Measurement>;

  public myChart;
  private valorObtenido = 0;
  private chartOptions;

  constructor(
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceService,
    private modalController: ModalController
  ) {
    setTimeout(() => {
      console.log('Cambio el valor del sensor');
      this.valorObtenido = this.getLastMeasureValue();
      //llamo al update del chart para refrescar y mostrar el nuevo valor
      this.myChart.update({
        series: [
          {
            name: 'kPA',
            data: [this.valorObtenido],
            tooltip: {
              valueSuffix: ' kPA',
            },
          },
        ],
      });
    }, 1500);
  }

  ionViewWillEnter(): void {
    console.log('ionViewWillEnter ' + this.device);
  }

  ionViewDidEnter() {
    this.generarChart();
  }

  ngOnInit() {
    this.deviceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.device = this.deviceService.getDeviceById(this.deviceId);
    this.getIrrigationLog();
    this.getOpenStatus();
    this.getDeviceMeasurements();
  }

  generarChart() {
    this.chartOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: {
        text: 'Sensor N° ' + this.deviceId,
      },

      credits: { enabled: false },

      pane: {
        startAngle: -150,
        endAngle: 150,
      },
      // the value axis
      yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto',
        },
        title: {
          text: 'kPA',
        },
        plotBands: [
          {
            from: 0,
            to: 10,
            color: '#55BF3B', // green
          },
          {
            from: 10,
            to: 30,
            color: '#DDDF0D', // yellow
          },
          {
            from: 30,
            to: 100,
            color: '#DF5353', // red
          },
        ],
      },
      series: [
        {
          name: 'kPA',
          data: [this.valorObtenido],
          tooltip: {
            valueSuffix: ' kPA',
          },
        },
      ],
    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions);
  }

  toggleValve() {
    this.isOpen = !this.isOpen;
    const newLog = this.createIrrigationLog(+this.isOpen);
    const openStatusDescription = this.getOpenStatusDescription();
    if (openStatusDescription === 'Abierta') {
      this.valorObtenido = Math.floor(Math.random() * 101);
      this.renderUpdateChart(this.valorObtenido);
    } else {
      const newMeasure = this.createMeasure(this.valorObtenido);
      this.deviceService.addNewMeasure(newMeasure);
      this.valorObtenido = 0;
      this.renderUpdateChart(this.valorObtenido);
    }
    this.deviceService.addNewIrrigationLog(newLog);
  }

  getIrrigationLog() {
    this.irrigationLog = this.deviceService.getDeviceIrrigationLog(
      this.deviceId
    );
  }

  async showIrrigationLog() {
    // this.getIrrigationLog();

    const modal = await this.modalController.create({
      component: IrrigationLogListPage,
      componentProps: {
        logs: this.irrigationLog,
      },
    });

    await modal.present();
  }

  createIrrigationLog(status: number): IrrigationLog {
    // const irrigationLogCount = this.deviceService
    //   .getDeviceIrrigationLogCount(this.device.solenoidValveId)
    //   .toString();

    const newLog = new IrrigationLog(
      this.irrigationLog.length.toString(),
      status,
      new Date(),
      this.device.solenoidValveId
    );

    this.irrigationLog = [...this.irrigationLog, newLog];

    return newLog;
  }

  createMeasure(value: number): Measurement {
    const newMeasure = new Measurement(
      this.measurements.length.toString(),
      new Date(),
      value,
      this.deviceId
    );

    this.measurements = [...this.measurements, newMeasure];

    return newMeasure;
  }

  getLastMeasureValue(): number {
    return this.measurements[this.measurements.length - 1].value;
  }

  getLastIrrigationLog(): IrrigationLog {
    const currentLog = this.irrigationLog.filter(
      (log) => log.solenoidValveId === this.device.solenoidValveId
    );
    return currentLog[currentLog.length - 1];
  }

  getOpenStatus() {
    const currentLog = this.getLastIrrigationLog();
    this.isOpen = !!currentLog.status;
  }

  getOpenStatusDescription() {
    const currentLog = this.getLastIrrigationLog();
    return currentLog.isOpened;
  }

  renderUpdateChart(value: number) {
    this.myChart.update({
      series: [
        {
          name: 'kPA',
          data: [value],
          tooltip: {
            valueSuffix: ' kPA',
          },
        },
      ],
    });
  }

  getDeviceMeasurements() {
    this.measurements = this.deviceService.getDeviceMeasurements(this.deviceId);
  }
}
