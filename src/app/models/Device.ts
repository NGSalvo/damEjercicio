/* eslint-disable no-underscore-dangle */
export class Device {
  private _id: string;
  private _name: string;
  private _location: string;
  private _solenoidValveId: string;

  constructor(
    id: string,
    name: string,
    location: string,
    solenoidValveId: string
  ) {
    this._id = id;
    this._name = name;
    this._location = location;
    this._solenoidValveId = solenoidValveId;
  }

  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get location(): string {
    return this._location;
  }
  set location(value: string) {
    this._location = value;
  }
  get solenoidValveId(): string {
    return this._solenoidValveId;
  }
  set solenoidValveId(value: string) {
    this._solenoidValveId = value;
  }
}
