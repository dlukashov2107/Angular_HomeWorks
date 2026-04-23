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

export interface IPostOrderResponse {
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
  date?: string;
  locationId: number;
  country?: ICountriesResponseItem;
  code?: string;
  inBasket?: boolean;
}

export interface IToursResponse {
  //tours: Array<ITour>;
  tours: Omit<ITour, 'country' | 'inBasket'>[];
}
export interface ITourResponse {
  tour: Omit<ITour, 'country' | 'inBasket'>;
}

export interface IFilterTypeLogic {
  key: ITourTypes;
  label?: string;
}

// export interface ITourServerRes{
//   tours: Omit<ITour, 'country' | 'inBasket'>[];
// }

export interface ICountriesResponseItem {
  iso_code2: string;
  iso_code3: string;
  name_ru: string;
  flag_url: string;
}

export type ITourTypes = 'all' | 'single' | 'group';

export interface ILocation {
  lat: number;
  lng: number;
}

export type Coords = {
  latlng: [number, number];
};

export interface IWeatherData {
  isDay: number;
  snowfall: number;
  rain: number;
  currentWeather: number;
}

export interface ICountryWeather {
  countrieData: Coords;
  weatherData: IWeatherData;
}
