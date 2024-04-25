import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormHelperText from "@mui/material/FormHelperText";
import jwtService from "../../auth/services/jwtService";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useDispatch } from "react-redux";
import { addCustomer, getCustomers } from "app/store/customerSlice";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required("You must enter display name"),
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(3, "Password is too short - should be 3 chars minimum."),
  phone: yup.string().min(11, "Phone length should be atleat 11"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
};

export default function AddCustomer() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit(data) {
    dispatch(addCustomer(data)).then(() => {
      dispatch(getCustomers());
      handleClose();
      reset(defaultValues);
    });
  }

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        className="flex justify-end"
        style={{ borderRadius: "5px" }}
      >
        + Add Cutomer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="h-full">
              <div className=" flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-center    flex-1 min-w-0 p-32">
                <Paper className=" sm:h-auto md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full py-8 px-16 sm:p-32 md:p-32 sm:rounded-2xl md:rounded-2xl sm:shadow md:shadow ltr:border-r-1 rtl:border-l-1">
                  <div className="w-full sm:w-320 mx-auto sm:mx-0">
                    <div className="flex justify-center mb-24">
                      <img src="assets/images/ecom/flag-05.png" />
                    </div>

                    <Typography
                      className=" text-xl text-center font-bold tracking-tight leading-tight"
                      color="secondary"
                    >
                      Add New Customer
                    </Typography>

                    <form
                      name="registerForm"
                      noValidate
                      className="flex flex-col justify-center w-full mt-32"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="mb-24"
                            label="Display name"
                            type="name"
                            error={!!errors.name}
                            helperText={errors?.name?.message}
                            variant="outlined"
                            required
                            fullWidth
                            size={"small"}
                          />
                        )}
                      />

                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="mb-24"
                            label="Email"
                            type="email"
                            error={!!errors.email}
                            helperText={errors?.email?.message}
                            variant="outlined"
                            required
                            fullWidth
                            size={"small"}
                          />
                        )}
                      />

                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="mb-24"
                            label="Password"
                            type="password"
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                            variant="outlined"
                            required
                            fullWidth
                            size={"small"}
                          />
                        )}
                      />

                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="mb-24"
                            label="Phone"
                            type="text"
                            error={!!errors.phone}
                            helperText={errors?.phone?.message}
                            variant="outlined"
                            fullWidth
                            size={"small"}
                          />
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
                      >
                        Add Customer
                      </Button>
                    </form>
                  </div>
                </Paper>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
