import { Component } from '@angular/core';
import { Device } from '../models/Device';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public devices: Device[];

  constructor(private deviceService: DeviceService) {
    this.devices = deviceService.getDevices();
  }
}
