export interface IUser {
  user_name: string;
  user_image?: string;
  email: string;
  password: string;
  address: IAddress;
  contact: IContact;
}

export interface IUserNoPassword {
  user_name: string;
  user_image?: string;
  email: string;
  password?: string;
  address: IAddress;
  contact: IContact;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IAddress {
  cep: string;
  city: string;
  state: string;
  district: string;
  number: string;
}

export interface IContact {
  phone: string;
  secondary_email?: string;
  whatsapp?: string;
  description?: string;
}
