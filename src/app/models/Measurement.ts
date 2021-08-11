/* eslint-disable no-underscore-dangle */
export class Measurement {
  private _id: string;
  private _date: Date;
  private _value: number;
  private _deviceId: string;

  constructor(id: string, date: Date, value: number, deviceId: string) {
    this._id = id;
    this._date = date;
    this._value = value;
    this._deviceId = deviceId;
  }

  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get date(): Date {
    return this._date;
  }
  set date(value: Date | string) {
    if (typeof value === 'string') {
      this._date = new Date(value);
    } else {
      this._date = value;
    }
  }
  get value(): number {
    return this._value;
  }
  set value(value: number | string) {
    if (typeof value === 'number') {
      this._value = value;
    } else {
      this._value = +value;
    }
  }
  get deviceId(): string {
    return this._deviceId;
  }
  set deviceId(value: string) {
    this._deviceId = value;
  }
}
