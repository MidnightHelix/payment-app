import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { handlePostWithdrawal } from "../../../assets/api";

const schema = yup
  .object({
    user_id: yup.string().required("User ID is required"),
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .min(10000, "Minimum transaction is Rp10.000")
      .max(2000000, "Maximum transaction is Rp2.000.000")
      .integer()
      .required("Amount is required"),
  })
  .required();

const WithdrawalForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      amount: 0,
      timestamp: new Date(),
      order_id: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const payload = {
      amount: data.amount,
      timestamp: data?.timestamp,
      order_id: data.order_id,
    };

    const response = await handlePostWithdrawal(payload);
    if (response) {
      reset();
    }
  };

  return (
    <div className="w-full card">
      <div className="p-0 mb-4 text-left">
        <h1 className="text-2xl font-bold">Withdraw</h1>
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
                <span className="label-text">Order ID</span>
              </label>
              <input
                placeholder="Enter your order ID"
                className="input input-bordered"
                {...field}
                onChange={field.onChange}
                required
              />
              {errors?.order_id && (
                <label className="label">
                  <p className="label-text-alt text-error">
                    {errors?.order_id?.message}
                  </p>
                </label>
              )}
            </div>
          )}
          name="order_id"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Timestamp</span>
              </label>
              <input
                type="datetime-local"
                placeholder="Enter your timestamp"
                className="input input-bordered"
                {...field}
                onChange={field.onChange}
                required
              />
              {errors?.timestamp && (
                <label className="label">
                  <p className="label-text-alt text-error">
                    {errors?.timestamp?.message}
                  </p>
                </label>
              )}
            </div>
          )}
          name="timestamp"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Amount</span>
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                className="input input-bordered"
                {...field}
                onChange={field.onChange}
                required
              />
              {errors?.amount && (
                <label className="label">
                  <p className="label-text-alt text-error">
                    {errors?.amount?.message}
                  </p>
                </label>
              )}
            </div>
          )}
          name="amount"
        />
        <div className="mt-6 form-control">
          <button disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting ? "Processing" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WithdrawalForm;
