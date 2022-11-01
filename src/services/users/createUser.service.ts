import AppDataSource from "../../database/data-source";
import { Address } from "../../entities/address.entity";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUser, IUserNoPassword } from "../../interfaces";

export const createUserService = async ({
  user_name,
  user_image,
  email,
  password,
  address,
  contact,
}: IUser) => {
  const { cep, city, district, number, state } = address;
  const { phone, description, secondary_email, whatsapp } = contact;
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);
  const contactRepository = AppDataSource.getRepository(Contact);
  const emailAlreadyExists = await userRepository.findOne({
    where: {
      email,
    },
  });

  if (emailAlreadyExists) {
    throw new AppError(400, "Email already exists");
  }

  const newAddress = new Address();
  newAddress.cep = cep;
  newAddress.city = city;
  newAddress.district = district;
  newAddress.number = number;
  newAddress.state = state;

  addressRepository.create(newAddress);
  await addressRepository.save(newAddress);

  const newContact = new Contact();
  newContact.description = description ? description : "";
  newContact.phone = phone;
  newContact.secondary_email = secondary_email ? secondary_email : "";
  newContact.whatsapp = whatsapp ? whatsapp : "";

  contactRepository.create(newContact);
  await contactRepository.save(newContact);

  const user = new User();
  user.email = email;
  user.is_active = true;
  user.password = password;
  user.user_image = user_image ? user_image : "";
  user.user_name = user_name;
  user.address = newAddress;
  user.contact = newContact;

  userRepository.create(user);
  await userRepository.save(user);

  const userNoPassword: IUserNoPassword = { ...user };
  delete userNoPassword.password;

  return userNoPassword;
};
