import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import clsx from "clsx";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEditCustomerDialog,
  getCustomers,
  selectEditCustomerDialogState,
  updateCustomer,
} from "app/store/customerSlice";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";

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

function EditCustomer({ dataObject }) {
  const dispatch = useDispatch();
  //   const dataObject = useSelector(selectEditCustomerDialogData);
  const open = useSelector(selectEditCustomerDialogState);
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues: dataObject,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const data = watch();

  const handleClose = () => {
    dispatch(closeEditCustomerDialog());
  };

  return (
    <div className="flex w-full">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogContent className="w-full">
          <DialogContentText id="alert-dialog-description" color="text.primary">
            <form
              className="w-full"
              onSubmit={handleSubmit((_data) =>
                dispatch(updateCustomer(_data))
                  .then(() => dispatch(getCustomers()))
                  .then(() => handleClose())
              )}
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
                    type="text"
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
                Save Customer
              </Button>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditCustomer;
