import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IrrigationLog } from '../models/IrrigationLog';

@Component({
  selector: 'app-irrigation-log-list',
  templateUrl: './irrigation-log-list.page.html',
  styleUrls: ['./irrigation-log-list.page.scss'],
})
export class IrrigationLogListPage implements OnInit {
  @Input() logs: Array<IrrigationLog>;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss();
  }
}
