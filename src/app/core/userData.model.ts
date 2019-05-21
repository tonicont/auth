export class UserDataModel {
  id: string;
  image: string;
  name: string;
  surname: string;
  provider: string;

  constructor() {
    this.id = '';
    this.image = '';
    this.name = '';
    this.surname = '';
    this.provider = '';
  }
}
