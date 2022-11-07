export interface IPet {
  name: string;
  is_adoptable: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  info_pet: IInfoPet;
}

export interface IInfoPet {
  pet_image: string;
  size: string;
  color: string;
  species: string;
  description: string;
  vaccine: string;
}

export interface IPetRequest {
  name: string;
  is_adoptable: boolean;
  is_active: boolean;
  info_pet: IInfoPet;
}

export interface IUpdatePet {
  name?: string;
  size?: string;
  pet_image?: string;
  color?: string;
  especie?: string;
  descripition?: string;
  vaccine?: string;
  species?: string;
}
