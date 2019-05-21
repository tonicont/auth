export class FirebaseUserModel {
  id: string;
  image: string;
  name: string;
  surname: string;
  provider: string;
  workgroups: [];

  constructor() {
    this.id = '';
    this.image = '';
    this.name = '';
    this.surname = '';
    this.provider = '';
    this.workgroups = [];
  }
}
