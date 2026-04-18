export interface IRegistrationUser extends IAuthorizationUser {
  email: string;
}

export interface IAuthorizationUser {
  login: string;
  password: string;
}

export interface IRegUserResponse {
  status: string;
}
export interface IAuthUserResponse extends IRegUserResponse {}

export interface ITour {
  id: number;
  name: string;
  description: string;
  tourOperator: string;
  price: string;
  img: string;
  type?: string;
  locationId: number;
  date?: string;
}

export interface IToursResponse {
  tours: Array<ITour>;
}
export interface ITourResponse extends ITour {}
