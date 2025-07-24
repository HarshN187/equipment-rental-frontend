import { Dropdown } from "../../../components/Form/DropDown";
import { addressSchema, type AddressData } from "../../../types/address.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormAction from "../../../components/Form/FormAction";
import { Input } from "../../../components/Form/Input";
import { customerApi } from "../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddAddressForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AddressData>({
    resolver: zodResolver(addressSchema),
  });

  const [userData, setUserData] = useState<
    {
      value: number | string;
      label: string;
    }[]
  >();

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await customerApi.getAll();
      const data = response.data.map((data) => {
        return {
          value: data.user_id,
          label: data.name,
        };
      });

      setUserData(data);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onsubmit = async (data: AddressData) => {
    console.log(data);
    try {
      const response = await customerApi.postAddress(data);
      console.log(response);
      navigate("/users");
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };

  return (
    <div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onsubmit)}>
        <div className="">
          <Dropdown
            labelText="User"
            labelFor="user"
            name="user"
            register={register}
            options={userData}
            placeholder="select user"
            error={undefined}
          ></Dropdown>
          <Input
            labelText="Address"
            labelFor="address"
            name="address"
            type="text"
            placeholder="409,silver radiance"
            register={register}
            error={errors["address"]}
          />
          <Dropdown
            labelText="City"
            labelFor="city"
            name="city"
            register={register}
            options={[{ label: "ahmedabad", value: "ahmedabad" }]}
            placeholder="select city"
            error={errors["city"]}
          ></Dropdown>
          <Dropdown
            labelText="State"
            labelFor="state"
            name="state"
            register={register}
            options={[{ label: "gujarat", value: "gujarat" }]}
            placeholder="select state"
            error={errors["state"]}
          ></Dropdown>
          <Dropdown
            labelText="Country"
            labelFor="country"
            name="country"
            register={register}
            options={[{ label: "india", value: "india" }]}
            placeholder="select country"
            error={errors["country"]}
          ></Dropdown>
          <Input
            labelText="Zipcode"
            labelFor="zipcode"
            name="zipcode"
            type="text"
            placeholder="809328"
            register={register}
            error={errors["zipcode"]}
          />
          <FormAction text="Add Address" />
        </div>
      </form>
    </div>
  );
}
