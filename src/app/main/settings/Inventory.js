import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { showMessage } from "app/store/fuse/messageSlice";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  holdStock: yup.string().required("Hold Stock is required"),
  notificationReciept: yup
    .string()
    .required("Notification Reciept is required"),
  manageStock: yup.boolean().required("Manage Stock is required"),
  enableNotifications: yup
    .boolean()
    .required("Enable Notifications is required"),
  lowStockThreshold: yup.number().required("Low Stock Threshold is required"),
  outOfStockThreshold: yup
    .number()
    .required("Out of Stock Threshold is required"),
});

const defaultValues = {};

export const Inventory = () => {
  const dispatch = useDispatch();
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [notification, setNotification] = useState("lowStock");

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit(data) {
    const params = {
      ...data,
      notification,
    };
    updateInventory(params);
    console.log(params);
  }
  const updateInventory = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v2/inventory`,
        data
      );
      if (response.data.status === 201)
        dispatch(
          showMessage({
            type: "success",
            message: "Inventory Updated Successfully",
          })
        );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-32">
      <Typography className=" title ">{`Settings -> Inventory`}</Typography>
      <Typography className="mb-24">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Typography>
      <form
        name="registerForm"
        noValidate
        className="flex flex-col justify-center w-full md:w-1/2 mt-32"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center">
          <Typography className="mr-24 md:mr-88 font-semibold">
            Manage Stock
          </Typography>
          <Controller
            name="manageStock"
            control={control}
            render={({ field }) => (
              <FormControl className="" error={!!errors.stock}>
                <FormControlLabel
                  label="Enable Stock Management"
                  control={<Checkbox size="small" {...field} />}
                />
              </FormControl>
            )}
          />
        </div>
        <div className="flex mt-16">
          <Typography
            className=" mt-8 font-semibold"
            style={{ marginRight: "94px" }}
          >
            Notification
          </Typography>
          <div className="flex flex-col">
            <FormControl className="">
              <FormControlLabel
                onClick={() => {
                  setNotification("lowStock");
                }}
                label="Enable low Stock Notification"
                control={
                  <Checkbox
                    size="small"
                    checked={notification === "lowStock"}
                    value={"lowStock"}
                  />
                }
              />
            </FormControl>

            <FormControl className="">
              <FormControlLabel
                onClick={() => {
                  setNotification("outStock");
                }}
                label="Enable out of Stock Notification"
                control={
                  <Checkbox
                    checked={notification === "outStock"}
                    size="small"
                    value={"outStock"}
                  />
                }
              />
            </FormControl>
          </div>
        </div>

        <div className="flex items-center">
          <Typography
            className="mr-24 font-semibold"
            style={{ marginRight: "36px" }}
          >
            Out of Stock Visibility
          </Typography>
          <Controller
            name="hideProducts"
            control={control}
            render={({ field }) => (
              <FormControl className="" error={!!errors.stock}>
                <FormControlLabel
                  label="Hide out of stock item from catalog"
                  control={<Checkbox size="small" {...field} />}
                />
              </FormControl>
            )}
          />
        </div>

        <div className="flex mt-16 items-center">
          <Typography className="mr-40 font-semibold">
            Notification recepient
          </Typography>
          <Controller
            name="notificationReciept"
            control={control}
            render={({ field }) => (
              <FormControl className="">
                <TextField
                  {...field}
                  className=""
                  autoFocus
                  error={!!errors.hold}
                  helperText={errors?.hold?.message}
                  variant="outlined"
                  fullWidth
                  placeholder="a@b.com"
                  size="small"
                />
              </FormControl>
            )}
          />
        </div>

        <div className="flex mt-16 items-center">
          <Typography className="mr-44 font-semibold">
            Low Stock Threshold
          </Typography>
          <Controller
            name="lowStockThreshold"
            control={control}
            render={({ field }) => (
              <FormControl className="">
                <TextField
                  {...field}
                  className=""
                  autoFocus
                  error={!!errors.hold}
                  helperText={errors?.hold?.message}
                  variant="outlined"
                  fullWidth
                  type={"number"}
                  size="small"
                />
              </FormControl>
            )}
          />
        </div>

        <div className="flex mt-16 items-center">
          <Typography className="mr-32 font-semibold">
            Out of Stock Threshold
          </Typography>
          <Controller
            name="outOfStockThreshold"
            control={control}
            render={({ field }) => (
              <FormControl className="">
                <TextField
                  {...field}
                  className=""
                  autoFocus
                  error={!!errors.hold}
                  helperText={errors?.hold?.message}
                  variant="outlined"
                  fullWidth
                  type={"number"}
                  size="small"
                />
              </FormControl>
            )}
          />
        </div>

        <div className="flex mt-16">
          <Typography
            className="mr-40 font-semibold "
            style={{ marginRight: "102px" }}
          >
            Hold Stock (minutes)
          </Typography>
          <Controller
            name="holdStock"
            control={control}
            render={({ field }) => (
              <FormControl className="">
                <TextField
                  {...field}
                  className=""
                  autoFocus
                  error={!!errors.hold}
                  helperText={errors?.hold?.message}
                  variant="outlined"
                  fullWidth
                  size="small"
                />
                <FormHelperText>
                  Hold stock (for unpair orders) for x minutes. When this limit
                  is reached, the pending order will be cancelled. Leave blank
                  to disable
                </FormHelperText>
              </FormControl>
            )}
          />
        </div>

        <Button
          variant="contained"
          color="secondary"
          className="w-full mt-24"
          aria-label="Register"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          type="submit"
          size="large"
          style={{ borderRadius: "5px" }}
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};
