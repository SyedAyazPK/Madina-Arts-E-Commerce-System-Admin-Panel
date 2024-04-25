import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  closeViewDialog,
  editOrder,
  getOrders,
  openViewDialog,
  selectViewDialogState,
} from "app/store/orderSlice";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Divider,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import InvoicePage from "./Invoice";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

const defaultValues = {
  billing: "",
};

export default function OrderViewDialog({ dataObject }) {
  const dispatch = useDispatch();
  const open = useSelector(selectViewDialogState);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: dataObject.checkout,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit(data) {
    console.log("data", data);
    dispatch(editOrder({ ...data, id: dataObject._id }))
      .then(() => dispatch(getOrders()))
      .then(() => handleClose());
  }

  const handleClickOpen = () => {
    dispatch(openViewDialog());
  };

  const handleClose = () => {
    dispatch(closeViewDialog());
  };

  const dummy = ["a", "b", "c"];

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <div className="flex w-full justify-end items-end p-24">
          <FuseSvgIcon
            className="text-48 cursor-pointer mr-8 noprint"
            size={24}
            color="action"
            onClick={() => window.print()}
          >
            material-twotone:print
          </FuseSvgIcon>
          <FuseSvgIcon
            className="text-48 cursor-pointer noprint"
            size={24}
            color="action"
            onClick={handleClose}
          >
            material-twotone:close
          </FuseSvgIcon>
        </div>

        <DialogTitle
          id="alert-dialovg-title"
          className="text-center items-center flex justify-center noprint"
        >
          {`Order #${dataObject.orderId}`}
        </DialogTitle>
        <DialogContent className="w-full noprint">
          <DialogContentText id="alert-dialog-description" color="text.primary">
            <form
              name="registerForm"
              noValidate
              className="flex flex-col w-full mt-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="border-1 rounded p-16">
                {/* <Controller
                  name="street"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth className="">
                      <FormLabel
                        className="font-medium text-14"
                        component="legend"
                      >
                        Billing Address
                      </FormLabel>
                      <TextField
                        {...field}
                        className=" mb-8  "
                        type="text"
                        error={!!errors.billing}
                        helperText={errors?.billing?.message}
                        variant="outlined"
                        fullWidth
                        size={"small"}
                      />
                    </FormControl>
                  )}
                /> */}
                <Controller
                  name="street"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth className="">
                      <FormLabel
                        className="font-medium text-14"
                        component="legend"
                      >
                        Shipping Address
                      </FormLabel>
                      <TextField
                        {...field}
                        className=""
                        type="text"
                        error={!!errors.shipping}
                        helperText={errors?.shipping?.message}
                        variant="outlined"
                        fullWidth
                        size={"small"}
                        disabled
                      />
                    </FormControl>
                  )}
                />
                <Divider className="my-16" />

                <div className="md:flex w-full justify-between ">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth className="md:mr-16">
                        <FormLabel
                          className="font-medium text-14"
                          component="legend"
                        >
                          Email
                        </FormLabel>
                        <TextField
                          {...field}
                          className=" mb-8  "
                          type="text"
                          error={!!errors.email}
                          helperText={errors?.email?.message}
                          variant="outlined"
                          fullWidth
                          size={"small"}
                          disabled
                        />
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth className="">
                        <FormLabel
                          className="font-medium text-14"
                          component="legend"
                        >
                          Phone
                        </FormLabel>
                        <TextField
                          {...field}
                          className=""
                          type="text"
                          error={!!errors.phone}
                          helperText={errors?.phone?.message}
                          variant="outlined"
                          fullWidth
                          size={"small"}
                          disabled
                        />
                      </FormControl>
                    )}
                  />
                </div>
                <div className="md:flex w-full justify-between mb-8">
                  {/* <Controller
                    name='customer'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth className='md:mr-16'>
                        <FormLabel
                          className='font-medium text-14'
                          component='legend'
                        >
                          Customer
                        </FormLabel>
                        <TextField
                          {...field}
                          className=' mb-8  '
                          autoFocus
                          type='text'
                          error={!!errors.customer}
                          helperText={errors?.customer?.message}
                          variant='outlined'
                          fullWidth
                        />
                      </FormControl>
                    )}
                  /> */}
                  {/* <Controller
                    render={({ field }) => (
                      <FormControl fullWidth className=''>
                        <FormLabel
                          className='font-medium text-14'
                          component='legend'
                        >
                          Status
                        </FormLabel>
                        <Select {...field} variant='outlined' fullWidth>
                          <MenuItem value='Proccessing'> Pending</MenuItem>
                          <MenuItem value='Delivered'> Delivered</MenuItem>
                          <MenuItem value='In Process'> In Process</MenuItem>
                          <MenuItem value='Cancelled'> Cancelled</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                    name='orderStatus'
                    control={control}
                  /> */}
                </div>
              </div>

              <div className="flex w-full my-16 pt-16 px-16 align-center justify-center ">
                <Typography className="w-full font-semibold uppercase">
                  Item
                </Typography>
                <Typography className="w-full font-semibold uppercase">
                  Quantity
                </Typography>
                <Typography className="w-full font-semibold uppercase printOnly">
                  Subtotal
                </Typography>
                <Typography className="w-full font-semibold uppercase noprint">
                  Cost
                </Typography>
                {dataObject?.userId?.role === "DropShipper" && (
                  <Typography className="w-full font-semibold uppercase noprint">
                    Sell Price
                  </Typography>
                )}

                <Typography className="w-full font-semibold uppercase">
                  Total
                </Typography>
              </div>

              {dataObject?.checkout?.products?.map((item) => (
                <div className="flex w-full p-16 align-center justify-center">
                  <Typography className="w-full">
                    {item?.product?.title}
                  </Typography>
                  <Typography className="w-full">{item.quantity}</Typography>
                  <Typography className="w-full printOnly">
                    {item.sellPrice} PKR
                  </Typography>
                  <Typography className="w-full noprint">
                    {dataObject?.userId?.role === "DropShipper"
                      ? item.product?.price
                      : item.sellPrice}{" "}
                    PKR
                  </Typography>
                  {dataObject?.userId?.role === "DropShipper" && (
                    <Typography className="w-full noprint">
                      {item.sellPrice ? item.sellPrice : "---"}
                    </Typography>
                  )}

                  <Typography className="w-full">
                    {item.quantity * item.sellPrice} PKR
                  </Typography>
                </div>
              ))}

              <div className="border-1 rounded p-16 flex flex-col justify-end items-end">
                <div className="flex">
                  <Typography>Items Subtotal:</Typography>
                  <Typography className="font-semibold ml-4">
                    {dataObject?.checkout?.totalPrice}
                  </Typography>
                </div>
                <div className="flex">
                  <Typography>Shipping:</Typography>
                  <Typography className="font-semibold ml-4">
                    {" "}
                    {dataObject?.checkout?.shipping
                      ? dataObject?.checkout?.shipping
                      : "--"}
                  </Typography>
                </div>
                <div className="flex">
                  <Typography>Total:</Typography>
                  <Typography className="font-semibold ml-4">
                    {dataObject?.checkout?.totalPrice}
                  </Typography>
                </div>
              </div>

              <Button
                variant="contained"
                color="secondary"
                className="w-full mt-24 noprint"
                aria-label="Register"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
              >
                Save
              </Button>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
