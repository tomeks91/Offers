import { IBackpack } from 'app/shared/model/backpack.model';

export interface IStudent {
  id?: number;
  name?: string;
  surname?: string;
  backpack?: IBackpack;
}

export class Student implements IStudent {
  constructor(public id?: number, public name?: string, public surname?: string, public backpack?: IBackpack) {}
}
