export interface IPet {
    name: string
    is_adoptable: boolean
    is_active: boolean
    created_at: string
    updated_at: string
    info_pet: IInfoPet
}

export interface IInfoPet {
    pet_image: string
    size: string
    color: string
    species: string
    description: string
    vaccine: string
}