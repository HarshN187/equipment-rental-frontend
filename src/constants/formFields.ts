type fieldNames = "email" | "password" | "name" | "phone" | "confirmPassword";
type fieldNames2 = "email" | "password";

export interface LoginProps {
  labelText: string;
  labelFor: string;
  type: string;
  id?: number;
  name: fieldNames2;
  placeholder: string;
  customClass?: string;
  valueAsNumber?: boolean;
}

const loginFields: Array<LoginProps> = [
  {
    labelText: "Email address",
    labelFor: "email-address",
    name: "email",
    type: "email",
    placeholder: "Email address",
  },
  {
    labelText: "Password",
    labelFor: "password",
    name: "password",
    type: "password",
    placeholder: "Password",
  },
];

// used Omit<LoginProps, 'name'> to inherit all properties from LoginProps except for name.
interface SignupProps extends Omit<LoginProps, "name"> {
  name: fieldNames;
}

const signupFields: Array<SignupProps> = [
  {
    labelText: "Name",
    labelFor: "name",
    name: "name",
    type: "text",
    placeholder: "Name",
  },
  {
    labelText: "Email address",
    labelFor: "email-address",
    name: "email",
    type: "email",
    placeholder: "Email address",
  },
  {
    labelText: "Phone",
    labelFor: "Phone",
    name: "phone",
    type: "text",
    placeholder: "9879879879",
  },
  {
    labelText: "Password",
    labelFor: "password",
    name: "password",
    type: "password",
    placeholder: "Password",
  },
  {
    labelText: "Confirm Password",
    labelFor: "confirm-password",
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
  },
];

type addUserFieldNames = "name" | "email" | "phone";

export interface addUserFieldProps {
  labelText: string;
  labelFor: string;
  type: string;
  id?: number;
  name: addUserFieldNames;
  placeholder: string;
  customClass?: string;
  valueAsNumber?: boolean;
}

const addUserFields: Array<addUserFieldProps> = [
  {
    labelText: "Name",
    labelFor: "name",
    name: "name",
    type: "text",
    placeholder: "Name",
  },
  {
    labelText: "Email address",
    labelFor: "email-address",
    name: "email",
    type: "email",
    placeholder: "Email address",
  },
  {
    labelText: "Phone",
    labelFor: "Phone",
    name: "phone",
    type: "text",
    placeholder: "9879879879",
  },
];

type addEquipmentFieldNames =
  | "name"
  | "description"
  | "rent_per_day"
  | "total_quntity";

export interface addEquipmentFieldProps {
  labelText: string;
  labelFor: string;
  type: string;
  id?: number;
  name: addEquipmentFieldNames;
  placeholder: string;
  customClass?: string;
  valueAsNumber?: boolean;
}

const addEquipmentFields: Array<addEquipmentFieldProps> = [
  {
    labelText: "Equipment Name",
    labelFor: "equipment-name",
    name: "name",
    type: "text",
    placeholder: "Table",
  },
  {
    labelText: "Description",
    labelFor: "description",
    name: "description",
    type: "text",
    placeholder: "feiu djube djueb",
  },
  {
    labelText: "Rent per day",
    labelFor: "rent_per_day",
    name: "rent_per_day",
    type: "number",
    placeholder: "500",
    valueAsNumber: true,
  },
  {
    labelText: "Total Quntity",
    labelFor: "total_quntity",
    name: "total_quntity",
    type: "number",
    placeholder: "10",
    valueAsNumber: true,
  },
];

export interface addCategoryFieldProps {
  labelText: string;
  labelFor: string;
  type: string;
  id?: number;
  name: "name" | "description";
  placeholder: string;
  customClass?: string;
  valueAsNumber?: boolean;
}

const addCategoryFields: addCategoryFieldProps[] = [
  {
    labelText: "Name",
    labelFor: "name",
    name: "name",
    type: "text",
    placeholder: "Name",
  },
  {
    labelText: "Description (Optional)",
    labelFor: "description",
    name: "description",
    type: "text",
    placeholder: "description....",
  },
];

export {
  loginFields,
  signupFields,
  addUserFields,
  addEquipmentFields,
  addCategoryFields,
};
