export interface IBackpack {
  id?: number;
  mark?: string;
}

export class Backpack implements IBackpack {
  constructor(public id?: number, public mark?: string) {}
}
