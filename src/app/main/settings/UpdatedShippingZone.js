import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import {
  deleteShippingZone,
  getShippingZone,
  selectShippingZone,
} from "app/store/settingSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditShippingZone } from "./EditShippingZone";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon/FuseSvgIcon";

const UpdatedShippingZone = () => {
  const [open, setOpen] = useState(false);
  const [dataObject, setDataObject] = useState({});
  const dispatch = useDispatch();
  const shippingZone = useSelector(selectShippingZone);
  console.log(
    "🚀 ~ file: UpdatedShippingZone.js:9 ~ UpdatedShippingZone ~ shippingZone:",
    shippingZone
  );

  useEffect(() => {
    dispatch(getShippingZone());
  }, []);
  return (
    <div className="mt-[20vh] px-16 ">
      <Typography
        fontFamily={"serif"}
        className="text-20 mb-12 uppercase font-bold"
      >
        Shipping Zone
      </Typography>
      <Typography className="text-15 text-gray-600">
        A shipping zone is a geographic region where a certain set of shipping
        methods are offered. WooCommerce will match a costumer to a single zone
        using their shopping address and present the shopping methods within
        that zone to them
      </Typography>
      <div className="mt-44">
        <div className="flex mb-12 items-center px-32 justify-between">
          <Typography className="text-16 font-medium">Action(s)</Typography>
          <Typography className="text-16 font-medium">Zone</Typography>
          <Typography className="text-16 font-medium">Region (S)</Typography>
          <Typography className="text-16 font-medium">
            Shopping Method
          </Typography>
        </div>
        <Divider
          variant="fullWidth"
          sx={{
            borderBottomWidth: 1,
            borderColor: "black",
          }}
        />
        {shippingZone?.map((item, index) => {
          return (
            <ShippingRow
              setOpen={setOpen}
              zone={"Pakistan"}
              region={"Pakistan"}
              key={index}
              row={item}
              setDataObject={setDataObject}
              shippingMethod={item?.methodTitle}
            />
          );
        })}
      </div>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        maxWidth={"lg"}
        fullWidth={true}
      >
        <DialogTitle className="bg-[#f9f9f9] ">
          <Typography className="text-20 py-8 w-full justify-center flex font-medium">
            Edit Shipping Zone
          </Typography>
        </DialogTitle>
        <DialogContent>
          <EditShippingZone setOpen={setOpen} dataObject={dataObject} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

function ShippingRow({
  zone,
  region,
  shippingMethod,
  setOpen,
  row,
  setDataObject,
}) {
  const dispatch = useDispatch();
  return (
    <>
      <div
        onClick={() => {
          setDataObject(row);
          setOpen(true);
        }}
        className="flex py-32 cursor-pointer items-center px-16 justify-between"
      >
        <Typography className="text-16 ">
          <FuseSvgIcon
            className="text-48"
            size={24}
            color="error"
            onClick={(ev) => {
              ev.stopPropagation();
              dispatch(deleteShippingZone(row._id)).then(() =>
                dispatch(getShippingZone())
              );
            }}
          >
            material-outline:delete
          </FuseSvgIcon>
        </Typography>

        <Typography className="text-16 text-green">{zone}</Typography>
        <Typography className="text-16 font-medium">{region}</Typography>
        <Typography className="text-16 font-medium">
          {shippingMethod}
        </Typography>
      </div>
      <Divider
        variant="fullWidth"
        sx={{
          borderBottomWidth: 1,
          borderColor: "black",
        }}
      />
    </>
  );
}

export default UpdatedShippingZone;
