import { useState } from "react";
import { IUser } from "@/interfaces/models";
import { useMoveBack } from "@/hooks";
import optionsRole from "./UserContant";
import { useForm } from "react-hook-form";
import Select, { SingleValue } from "react-select";
import UseUser from "../../../apis-use/UseAdminApi";
import IOptionSelect from "@/interfaces/shared/ISelectOption.interface";
import { IUserCreate } from "@/interfaces/models/user.interface";
import { Button, Form, FormRow, Input, Heading } from "@/components/shared";

// Type of handler Submit

export function UserForm() {
  const moveBack = useMoveBack();
  const [selectRole, setSelectRole] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(null);
  const { createUser, isCreatingUser } = UseUser.createUser();

  const { handleSubmit, register, formState, reset, getValues } =
    useForm<IUserCreate>();

  const { errors: errorsForm } = formState;

  const onSubmit = (
    dataFormUser: Omit<IUserCreate, "_id" | "user_isBlocking">
  ) => {
    const dataCreate: Partial<IUserCreate> = {
      user_firstName: dataFormUser.user_firstName + "",
      user_lastName: dataFormUser.user_lastName + "",
      user_userName: dataFormUser.user_userName + "",
      user_email: dataFormUser.user_email + "",
      user_password: dataFormUser.user_password + "",
      reconfirmPassword: dataFormUser.reconfirmPassword + "",
      user_phoneNumber: dataFormUser.user_phoneNumber + "",
      user_role: String(selectRole?.value),
    };
    createUser(dataCreate, {
      onSuccess: (userCreated) => {
        console.log("UserUpdated::", userCreated);
        moveBack();
      },
    });
  };

  const handlerSelectRole = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectRole(option?.value);
  };

  return (
    <>
      <Heading $as="h1">Create new employees</Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="First name" error={errorsForm.user_firstName}>
          <Input
            type="text"
            id="userFirstName"
            {...register("user_firstName", {
              required: "Please provide User name",
            })}
          />
        </FormRow>
        <FormRow label="Last name" error={errorsForm.user_lastName}>
          <Input
            type="text"
            id="userLastName"
            {...register("user_lastName", {
              required: "Please provide user last name",
            })}
          />
        </FormRow>
        <FormRow label="User name" error={errorsForm.user_userName}>
          <Input
            type="text"
            id="userName"
            {...register("user_userName", {
              required: "Please provide user last name",
            })}
          />
        </FormRow>
        <FormRow label="Email" error={errorsForm.user_email}>
          <Input
            type="email"
            id="userEmail"
            {...register("user_email", {
              required: "Please provide user email",
            })}
          />
        </FormRow>
        <FormRow label="Phone Number" error={errorsForm.user_phoneNumber}>
          <Input
            type="tel"
            id="userPhoneNumber"
            {...register("user_phoneNumber", {
              required: "Please provide phone number",
              validate: (value) => {
                const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
                if (!value?.match(regexPhoneNumber))
                  return "Phone number isn't correct, please enter again";
              },
            })}
          />
        </FormRow>
        <FormRow label="Password" error={errorsForm.user_password}>
          <Input
            type="password"
            id="userPassword"
            {...register("user_password", {
              required: "Please provide user password",
            })}
          />
        </FormRow>
        <FormRow label="Confirm Password" error={errorsForm.reconfirmPassword}>
          <Input
            type="password"
            id="confirmPassword"
            {...register("reconfirmPassword", {
              required: "Please provide confirm password",
              validate: (value) => {
                if (getValues().user_password !== value)
                  return "Confirm password not correct";
              },
            })}
          />
        </FormRow>
        <FormRow label="User Role">
          <Select
            id="selectRole"
            placeholder={"Chose Role"}
            value={selectRole}
            onChange={handlerSelectRole}
            options={optionsRole}
            className="font-medium"
          />
        </FormRow>
        <FormRow>
          <Button
            $variation="secondary"
            type="reset"
            onClick={() => moveBack()}
          >
            Cancel
          </Button>
          <Button disabled={isCreatingUser}>
            {isCreatingUser ? "Creating ...." : "Create User"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}
