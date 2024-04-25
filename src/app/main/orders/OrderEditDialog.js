import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEditDialog,
  editOrder,
  getOrders,
  openEditDialog,
  selectEditDialogState,
} from "app/store/orderSlice";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Avatar,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import moment from "moment";
import { selectCustomers } from "app/store/customerSlice";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

const defaultValues = {
  billing: "",
  tracking: "",
};

export default function OrderEditDialog({ dataObject }) {
  const dispatch = useDispatch();
  const open = useSelector(selectEditDialogState);
  const customers = useSelector(selectCustomers);
  const [showRefund, setShowRefund] = React.useState(false);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: dataObject,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit(data) {
    dispatch(editOrder({ ...data, id: dataObject._id }))
      .then(() => dispatch(getOrders()))
      .then(() => handleClose());
  }

  const handleClickOpen = () => {
    dispatch(openEditDialog());
  };

  const handleClose = () => {
    dispatch(closeEditDialog());
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        fullWidth
      >
        <div className="flex w-full justify-between p-24">
          <div className="flex flex-col w-full">
            <Typography
              id="alert-dialog-title"
              variant="h5"
              className="font-semibold"
            >
              {`Order #${dataObject?.orderId}`}{" "}
            </Typography>
            <Typography className="w-full">
              {moment(dataObject?.createdAt).format("MMM DD, YYYY, hh:mm:ss A")}
            </Typography>
          </div>
          <div className="flex w-full justify-end items-end items-center">
            <Button
              variant="contained"
              color="secondary"
              aria-label="Register"
              style={{ borderRadius: "5px" }}
            >
              {dataObject?.checkout?.method}
            </Button>
            <FuseSvgIcon
              className="text-48 cursor-pointer ml-8"
              size={24}
              color="action"
              onClick={handleClose}
            >
              material-twotone:close
            </FuseSvgIcon>
          </div>
        </div>

        <DialogContent className="w-full">
          <div className="w-full flex justify-between">
            <div className="user relative flex flex-row items-center justify-start  pb-14 shadow-0  ">
              <div className="flex items-center justify-start ">
                <Avatar
                  sx={{
                    color: "text.primary",
                  }}
                  className="avatar text-32 font-bold w-56 h-56"
                  alt={"user"}
                ></Avatar>
              </div>
              <div className="ml-8">
                <Typography className="username text-14 whitespace-nowrap font-medium">
                  {dataObject?.checkout?.fname +
                    " " +
                    dataObject?.checkout?.lname}
                </Typography>
                <Typography
                  className="email text-13 whitespace-nowrap font-medium"
                  color="text.secondary"
                >
                  {dataObject?.checkout?.email}
                </Typography>
              </div>
            </div>
            <div>
              <Button
                variant="contained"
                color="info"
                aria-label="Refund"
                style={{ borderRadius: "5px" }}
                onClick={() => setShowRefund(!showRefund)}
              >
                Refund
              </Button>
            </div>
          </div>

          {showRefund && <div className="my-16">this is refund</div>}

          <DialogContentText id="alert-dialog-description" color="text.primary">
            <form
              name="registerForm"
              noValidate
              className="flex flex-col w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="md:flex w-full">
                <div className="md:w-2/3 md:mr-48">
                  <Typography
                    id="alert-dialog-title"
                    variant="h5"
                    className="font-semibold mb-16"
                  >
                    {"Info"}{" "}
                  </Typography>
                  <div className="md:flex w-full justify-between mb-8">
                    <Controller
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          className="md:mr-16"
                          size="small"
                        >
                          <FormLabel
                            className="font-medium text-14"
                            component="legend"
                          >
                            Customer
                          </FormLabel>
                          <Select {...field} variant="outlined" fullWidth>
                            {customers?.results?.map((customer) => (
                              <MenuItem value={customer._id}>
                                {customer.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                      name="customer"
                      control={control}
                    />
                    <Controller
                      render={({ field }) => (
                        <FormControl fullWidth className="" size="small">
                          <FormLabel
                            className="font-medium text-14"
                            component="legend"
                          >
                            Status
                          </FormLabel>
                          <Select {...field} variant="outlined" fullWidth>
                            <MenuItem value="Proccessing"> Processing</MenuItem>
                            <MenuItem value="Delivered"> Delivered</MenuItem>
                            <MenuItem value="Handed Over to Courier">
                              {" "}
                              Handed Over to Courier
                            </MenuItem>
                            <MenuItem value="Cancelled"> Cancelled</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                      name="orderStatus"
                      control={control}
                    />
                  </div>
                  <Typography
                    id="alert-dialog-title"
                    variant="h6"
                    className="font-semibold mt-16"
                  >
                    Summary
                  </Typography>
                  <div className="flex w-full my-16 pt-16 px-16 align-center justify-center ">
                    <Typography className="w-full font-semibold uppercase">
                      Item
                    </Typography>
                    <Typography className="w-full font-semibold uppercase">
                      Quantity
                    </Typography>
                    <Typography className="w-full font-semibold uppercase">
                      Cost
                    </Typography>
                    <Typography className="w-full font-semibold uppercase">
                      Sell Price
                    </Typography>
                    <Typography className="w-full font-semibold uppercase">
                      Total
                    </Typography>
                  </div>

                  {dataObject?.checkout?.products.map((item) => (
                    <div className="flex w-full p-16 align-center justify-center">
                      <Typography className="w-full">
                        {item.product?.title}
                      </Typography>
                      <Typography className="w-full flex text-center justify-center">
                        {item.quantity}
                        {showRefund && (
                          <TextField
                            className=""
                            autoFocus
                            type="number"
                            variant="outlined"
                            fullWidth
                            size={"small"}
                          />
                        )}
                      </Typography>
                      <Typography className="w-full">
                        {item.product?.price} PKR
                      </Typography>
                      <Typography className="w-full">
                        {item.sellPrice ? item.sellPrice : "---"}
                      </Typography>
                      <Typography className="w-full">
                        {item.product?.price * item.quantity} PKR
                      </Typography>
                    </div>
                  ))}

                  <Divider />

                  <div className="my-16 px-16 ">
                    <div className="flex w-full justify-between ">
                      <Typography>Subtotal</Typography>
                      <Typography className="font-semibold">
                        {dataObject?.checkout?.totalPrice}
                      </Typography>
                    </div>
                    <div className="flex py-8 w-full justify-between ">
                      <Typography>Discount</Typography>
                      <Typography className="font-semibold">
                        {dataObject?.checkout?.discount
                          ? dataObject?.checkout?.discount
                          : "--"}
                      </Typography>
                    </div>
                    <div className="flex w-full justify-between ">
                      <Typography>Tax @ 12.5%</Typography>
                      <Typography className="font-semibold">
                        {" "}
                        {dataObject?.checkout?.tax
                          ? dataObject?.checkout?.tax
                          : "--"}
                      </Typography>
                    </div>
                    <div className="flex py-8 w-full justify-between ">
                      <Typography>Shipping</Typography>
                      <Typography className="font-semibold">
                        {" "}
                        {dataObject?.checkout?.shipping
                          ? dataObject?.checkout?.shipping
                          : "--"}
                      </Typography>
                    </div>
                    <div className="flex mt-24 w-full justify-between ">
                      <Typography variant="h6">Total</Typography>
                      <Typography variant="h6" className="font-semibold">
                        {dataObject?.checkout?.totalPrice} PKR
                      </Typography>
                    </div>
                  </div>

                  <Typography
                    id="alert-dialog-title"
                    variant="h6"
                    className="font-semibold mt-16"
                  >
                    Delivery Information
                  </Typography>

                  <div className="md:flex w-full pt-16">
                    <div className="w-full border-l-2">
                      <div className="pl-16">
                        <Typography className="font-semibold">
                          Contact
                        </Typography>
                        <Typography className="">
                          {dataObject?.checkout?.fname +
                            " " +
                            dataObject?.checkout?.lname}
                        </Typography>
                        <Typography className="">
                          {dataObject?.checkout?.email}
                        </Typography>
                        <Typography className="">
                          {dataObject?.checkout?.phone}
                        </Typography>
                      </div>
                    </div>
                    <div className="w-full border-l-2">
                      <div className="pl-16">
                        <Typography className="font-semibold">
                          Shipping Address
                        </Typography>
                        <Typography className="">
                          {dataObject?.checkout?.street}
                        </Typography>
                        <Typography className="">
                          {dataObject?.checkout?.province}
                        </Typography>
                        <Typography className=""> Pakistan</Typography>
                      </div>
                    </div>
                    <div className="w-full border-l-2">
                      <div className="pl-16">
                        <Typography className="font-semibold">
                          Billing Address
                        </Typography>
                        <Typography className="">
                          {dataObject?.checkout?.street}
                        </Typography>
                        <Typography className="">
                          {dataObject?.checkout?.province}
                        </Typography>
                        <Typography className=""> Pakistan</Typography>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <div className="flex w-full justify-between">
                    <Typography
                      id="alert-dialog-title"
                      variant="h5"
                      className="font-semibold"
                    >
                      {"Track Shipment"}{" "}
                    </Typography>
                    {/* <FuseSvgIcon
                      className="text-48 cursor-pointer ml-8 items-end flex"
                      size={24}
                      color="action"
                      onClick={handleClose}
                    >
                      material-twotone:close
                    </FuseSvgIcon> */}
                  </div>
                  <div className="my-16">
                    <Controller
                      name="trackingNo"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth className="">
                          <FormLabel
                            className="font-medium text-14"
                            component="legend"
                          >
                            Tracking No
                          </FormLabel>
                          <TextField
                            {...field}
                            className=""
                            autoFocus
                            type="text"
                            error={!!errors.tracking}
                            helperText={errors?.tracking?.message}
                            variant="outlined"
                            fullWidth
                            size={"small"}
                          />
                        </FormControl>
                      )}
                    />
                    <Controller
                      render={({ field }) => (
                        <FormControl fullWidth className="my-8" size="small">
                          <FormLabel
                            className="font-medium text-14"
                            component="legend"
                          >
                            Shipping Provider
                          </FormLabel>
                          <Select {...field} variant="outlined" fullWidth>
                            <MenuItem value="TCS">TCS</MenuItem>
                            <MenuItem value="Leopard">Leopard</MenuItem>
                            <MenuItem value="Pak Courier">Pak Courier</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                      name="shippingProvider"
                      control={control}
                    />
                    <Controller
                      render={({ field }) => (
                        <FormControl fullWidth className="" size="small">
                          <FormLabel
                            className="font-medium text-14"
                            component="legend"
                          >
                            Shipped On
                          </FormLabel>
                          <Select {...field} variant="outlined" fullWidth>
                            <MenuItem value="10">Ten (10)</MenuItem>
                            <MenuItem value="20">Twenty (20)</MenuItem>
                            <MenuItem value="30">Thirty (30)</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                      name="shippedOn"
                      control={control}
                    />
                    <Controller
                      render={({ field }) => (
                        <FormControl fullWidth className="my-16" size="small">
                          <FormLabel
                            className="font-medium text-14"
                            component="legend"
                          >
                            Shipping Status
                          </FormLabel>
                          <Select {...field} variant="outlined" fullWidth>
                            <MenuItem value="Ready to Ship">
                              Ready to Ship
                            </MenuItem>
                            <MenuItem value="Shipped">Shipped</MenuItem>
                            <MenuItem value="in Transit">in Transit</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                      name="shippingStatus"
                      control={control}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      className="w-full mt-24"
                      aria-label="Register"
                      disabled={_.isEmpty(dirtyFields) || !isValid}
                      type="submit"
                      size="large"
                      style={{ borderRadius: "10px" }}
                    >
                      Save
                    </Button>
                  </div>
                  <Typography
                    id="alert-dialog-title"
                    variant="h5"
                    className="font-semibold"
                  >
                    {"Print/Download"}{" "}
                  </Typography>

                  <div className="flex flex-col w-full items-start justify-start">
                    <Controller
                      name="invoice"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          className="items-center"
                          error={!!errors.invoice}
                        >
                          <FormControlLabel
                            label="Invoice"
                            control={<Checkbox size="large" {...field} />}
                          />
                          <FormHelperText>
                            {errors?.invoice?.message}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                    <Controller
                      name="packing"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          className="items-center"
                          error={!!errors.packing}
                        >
                          <FormControlLabel
                            label="Packing Slip"
                            control={<Checkbox size="large" {...field} />}
                          />
                          <FormHelperText>
                            {errors?.packing?.message}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      className="w-full mt-24"
                      aria-label="Register"
                      disabled={_.isEmpty(dirtyFields) || !isValid}
                      type="submit"
                      size="large"
                      style={{ borderRadius: "10px" }}
                    >
                      Download and Print
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
