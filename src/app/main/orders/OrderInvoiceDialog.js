import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  closeInvoiceDialog,
  getOrders,
  openInvoiceDialog,
  selectInvoiceDialogData,
  selectInvoiceDialogState,
} from "app/store/orderSlice";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import moment from "moment";

export default function OrderInvoiceDialog() {
  const dispatch = useDispatch();
  const open = useSelector(selectInvoiceDialogState);
  const dataObject = useSelector(selectInvoiceDialogData);

  console.log(dataObject, "hi data");

  const handleClickOpen = () => {
    dispatch(openInvoiceDialog());
  };

  const handleClose = () => {
    dispatch(closeInvoiceDialog());
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xl"
      >
        <div className="inline-block p-24 sm:p-40 text-left print:p-0 w-full overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ bounceDamping: 0 }}
          >
            <Card className="w-full p-64 mx-auto rounded-2xl shadow print:w-auto print:rounded-none print:shadow-none print:bg-transparent">
              <CardContent className="">
                <div className="flex items-start">
                  <div className="grid grid-rows-2 place-items-start gap-y-48">
                    <div className="grid auto-cols-max grid-flow-col gap-x-32">
                      <div className="place-self-center w-96">
                        <img
                          className="w-96"
                          src="assets/images/logo/logo.png"
                          alt="lozgo"
                        />
                      </div>
                      <div className="pl-40 border-l text-md">
                        <Typography className="font-medium">
                          Shipping Address
                        </Typography>
                        <Typography>
                          {dataObject?.checkout?.fname +
                            " " +
                            dataObject?.checkout?.lname}
                        </Typography>
                        <Typography>{dataObject?.checkout?.street}</Typography>
                        <Typography>
                          {" "}
                          {dataObject?.checkout?.province}, Pakistan
                        </Typography>
                        <Typography> {dataObject?.checkout?.email}</Typography>
                        <Typography>{dataObject?.checkout?.phone}</Typography>
                      </div>
                    </div>
                    <div className="grid auto-cols-max grid-flow-col gap-x-32">
                      <Typography
                        className="place-self-center w-96 text-center text-2xl"
                        color="text.secondary"
                      >
                        Bill To
                      </Typography>
                      <div className="pl-40 border-l text-md">
                        <Typography className="font-medium">
                          {dataObject?.checkout?.fname +
                            " " +
                            dataObject?.checkout?.lname}
                        </Typography>
                        <Typography>{dataObject?.checkout?.street}</Typography>
                        <Typography>
                          {" "}
                          {dataObject?.checkout?.province}, Pakistan
                        </Typography>
                        <Typography>{dataObject?.checkout?.email}</Typography>
                        <Typography>{dataObject?.checkout?.phone}</Typography>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-16 gap-y-4 ml-auto">
                    <Typography
                      className="justify-self-end text-4xl tracking-tight"
                      color="text.secondary"
                    >
                      ORDER ID
                    </Typography>
                    <Typography className="text-4xl">
                      #{dataObject.orderId}
                    </Typography>
                    <Typography
                      className="justify-self-end font-medium tracking-tight"
                      color="text.secondary"
                    >
                      INVOICE DATE
                    </Typography>
                    <Typography className="font-medium">
                      {moment(new Date()).format("DD-MM-YYYY")}
                    </Typography>
                    <Typography
                      className="justify-self-end font-medium tracking-tight"
                      color="text.secondary"
                    >
                      PHONE
                    </Typography>
                    <Typography className="font-medium">
                      {dataObject?.checkout?.phone}
                    </Typography>
                    <Typography
                      className="justify-self-end font-medium tracking-tight"
                      color="text.secondary"
                    >
                      EMAIL
                    </Typography>
                    <Typography className="font-medium">
                      {dataObject?.checkout?.email}
                    </Typography>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-x-4 mt-16">
                  <Typography
                    className="col-span-2 font-medium text-md"
                    color="text.secondary"
                  >
                    SKU
                  </Typography>
                  <Typography
                    className="col-span-4 font-medium text-md"
                    color="text.secondary"
                  >
                    SERVICE
                  </Typography>
                  <Typography
                    className="font-medium text-md text-right"
                    color="text.secondary"
                  >
                    RATE
                  </Typography>

                  {dataObject?.userId?.role === "DropShipper" && (
                    <Typography
                      className="font-medium text-md text-right"
                      color="text.secondary"
                    >
                      SELL PRICE
                    </Typography>
                  )}

                  <Typography
                    className="font-medium text-md text-right"
                    color="text.secondary"
                  >
                    QTY
                  </Typography>
                  <Typography
                    className="col-span-2 font-medium text-md text-right"
                    color="text.secondary"
                  >
                    TOTAL
                  </Typography>

                  {dataObject?.checkout?.products.map((item) => (
                    <>
                      <div className="col-span-12 my-16 border-b" />
                      <Typography className="col-span-2 self-center  ">
                        {item.product?.productSku}
                      </Typography>

                      <div className="col-span-4">
                        <Typography className="text-lg font-medium">
                          {item.product?.title}
                        </Typography>
                        <Typography
                          className="mt-8 text-md"
                          color="text.secondary"
                        >
                          {item.product?.shortDescription}
                        </Typography>
                      </div>
                      <Typography className="self-center text-right">
                        {item.product?.discountedPrice
                          ? item.product?.discountedPrice
                          : item.product?.price}{" "}
                        PKR
                      </Typography>
                      {dataObject?.userId?.role === "DropShipper" && (
                        <Typography className="self-center text-right">
                          {item.sellPrice ? item.sellPrice : ""} PKR
                        </Typography>
                      )}

                      <Typography className="self-center text-right">
                        {item.quantity}
                      </Typography>
                      <Typography className="col-span-2 self-center text-right">
                        {item.product?.discountedPrice
                          ? item.product?.discountedPrice * item.quantity
                          : item.product?.price * item.quantity}{" "}
                        PKR
                      </Typography>
                    </>
                  ))}

                  <div className="col-span-12 mt-64" />

                  <Typography
                    className="col-span-10 self-center font-medium tracking-tight"
                    color="text.secondary"
                  >
                    SUBTOTAL
                  </Typography>
                  <Typography className="col-span-2 text-right text-lg">
                    {dataObject?.checkout?.totalPrice}
                  </Typography>

                  <div className="col-span-12 my-12 border-b" />

                  <Typography
                    className="col-span-10 self-center font-medium tracking-tight"
                    color="text.secondary"
                  >
                    SHIPPING
                  </Typography>
                  <Typography className="col-span-2 text-right text-lg">
                    {dataObject?.checkout?.shipping
                      ? dataObject?.checkout?.shipping
                      : "--"}
                  </Typography>

                  <div className="col-span-12 my-12 border-b" />

                  <Typography
                    className="col-span-10 self-center font-medium tracking-tight"
                    color="text.secondary"
                  >
                    DISCOUNT
                  </Typography>
                  <Typography className="col-span-2 text-right text-lg">
                    ---
                  </Typography>

                  <div className="col-span-12 my-12 border-b" />

                  <Typography
                    className="col-span-10 self-center text-2xl font-medium tracking-tight"
                    color="text.secondary"
                  >
                    TOTAL
                  </Typography>
                  <Typography className="col-span-2 text-right text-2xl font-medium">
                    {dataObject?.checkout?.totalPrice}
                  </Typography>
                </div>

                {/* <div className="mt-64">
                  <Typography className="font-medium">
                    Please pay within 15 days. Thank you for your business.
                  </Typography>
                  <div className="flex items-start mt-16">
                    <img
                      className="flex-0 w-40 mt-8"
                      src="assets/images/logo/logo.svg"
                      alt="logo"
                    />
                    <Typography
                      className="ml-24 text-sm"
                      color="text.secondary"
                    >
                      In condimentum malesuada efficitur. Mauris volutpat
                      placerat auctor. Ut ac congue dolor. Quisque scelerisque
                      lacus sed feugiat fermentum. Cras aliquet facilisis
                      pellentesque. Nunc hendrerit quam at leo commodo, a
                      suscipit tellus dapibus. Etiam at felis volutpat est
                      mollis lacinia. Mauris placerat sem sit amet velit mollis,
                      in porttitor ex finibus. Proin eu nibh id libero tincidunt
                      lacinia et eget.
                    </Typography>
                  </div>
                </div> */}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Dialog>
    </div>
  );
}
