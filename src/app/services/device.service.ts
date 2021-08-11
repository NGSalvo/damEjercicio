import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '../models/Device';
import { IrrigationLog } from '../models/IrrigationLog';
import { Measurement } from '../models/Measurement';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  public deviceList: Device[] = [
    new Device('1', 'Sensor 1', 'Patio', '1'),
    new Device('2', 'Sensor 2', 'Cocina', '2'),
    new Device('3', 'Sensor 3', 'Jardin Delantero', '3'),
    new Device('4', 'Sensor 4', 'Living', '4'),
  ];

  public measurementList: Measurement[] = [
    new Measurement('1', new Date(), 60, '1'),
    new Measurement('2', new Date(), 40, '1'),
    new Measurement('3', new Date(), 35, '2'),
    new Measurement('4', new Date(), 57, '1'),
    new Measurement('5', new Date(), 43, '3'),
  ];

  public irrigationLog: Array<IrrigationLog> = [
    new IrrigationLog('1', 0, new Date(), '1'),
    new IrrigationLog('2', 1, new Date(), '1'),
    new IrrigationLog('3', 0, new Date(), '2'),
    new IrrigationLog('4', 0, new Date(), '3'),
    new IrrigationLog('5', 0, new Date(), '4'),
    new IrrigationLog('6', 1, new Date(), '4'),
  ];

  constructor(private http: HttpClient) {}

  // consulta al backend sobre el listado de dospositivos
  // devuelve una lista de dispositivos
  getDevices(): Device[] {
    return this.deviceList;
  }

  getDeviceById(deviceId: string): Device {
    return this.deviceList.filter((device) => device.id === deviceId)[0];
  }

  getDeviceMeasurements(deviceId: string): Measurement[] {
    return this.measurementList.filter(
      (measurement) => measurement.deviceId === deviceId
    );
  }

  getDeviceIrrigationLog(deviceId: string): IrrigationLog[] {
    const { solenoidValveId } = this.deviceList.find(
      (device) => device.id === deviceId
    );
    return this.irrigationLog.filter(
      (irrigationLog) => irrigationLog.solenoidValveId === solenoidValveId
    );
  }

  getDeviceIrrigationLogCount(deviceId: string): number {
    const { solenoidValveId } = this.deviceList.find(
      (device) => device.id === deviceId
    );
    return this.irrigationLog.filter(
      (irrigationLog) => irrigationLog.solenoidValveId === solenoidValveId
    ).length;
  }

  addNewIrrigationLog(log: IrrigationLog): void {
    this.irrigationLog = [...this.irrigationLog, log];
  }

  addNewMeasure(measure: Measurement): void {
    this.measurementList = [...this.measurementList, measure];
  }

  getDevicesHttp() {
    return this.http.get('endpoint');
  }

  postHttp() {
    return this.http.post('endpoint', {});
  }
}
