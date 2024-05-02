import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { handlePostLogin } from "../../../assets/api";

import propTypes from 'prop-types';

const schema = yup
  .object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  })

const Login = ({ setIsLogin }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    const response = await handlePostLogin(payload);
    console.log(response)
    reset()
    // if login was successful
    setIsLogin(true); // this is for test only
    // if (response) {
    //   reset();
    // }
  };

  return (
    <div className="w-full card">
      <div className="p-0 mb-4 text-left">
        <h1 className="text-2xl font-bold">Login</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-0 card-body">
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                {...field}
                onChange={field.onChange}
                required
              />
              {errors?.email && (
                <label className="label">
                  <p className="label-text-alt text-error">
                    {errors?.email?.message}
                  </p>
                </label>
              )}
            </div>
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                {...field}
                onChange={field.onChange}
                required
              />
              {errors?.password && (
                <label className="label">
                  <p className="label-text-alt text-error">
                    {errors?.password?.message}
                  </p>
                </label>
              )}
            </div>
          )}
          name="password"
        />
        <div className="mt-6 form-control">
          <button disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting ? "Processing" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  setIsLogin: propTypes.func.isRequired,
};

export default Login;
