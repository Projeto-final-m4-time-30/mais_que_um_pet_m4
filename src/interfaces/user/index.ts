import { IContact } from "../contact";
import { IAddress } from "../address";

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

  export interface IUserUpdate {
    user_name?: string
    user_image?: string
    email?: string
    password?: string
}