/* eslint-disable no-underscore-dangle */

type OpenStatus = 'Abierta' | 'Cerrada';

enum IsOpenStatus {
  closed,
  opened,
}

export class IrrigationLog {
  constructor(
    private _id: string,
    private _status: number,
    private _date: Date,
    private _solenoidValveId: string
  ) {}

  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get status(): number {
    return this._status;
  }
  set status(value: number) {
    this._status = value;
  }
  get date(): Date {
    return this._date;
  }
  set date(value: Date | string) {
    this._date = typeof value === 'string' ? new Date(value) : value;
  }
  get solenoidValveId(): string {
    return this._solenoidValveId;
  }
  set solenoidValveId(value: string) {
    this._solenoidValveId = value;
  }

  get isOpened(): OpenStatus {
    return this._status === IsOpenStatus.opened ? 'Abierta' : 'Cerrada';
  }
}
