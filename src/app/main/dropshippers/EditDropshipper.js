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
import {
  closeEditDropshipperDialog,
  getDropshippers,
  selectEditDropshipperDialogState,
  updateDropshipper,
} from "app/store/dropshipperSlice";
import { uploadImage } from "app/store/categorySlice";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup.string().required("You must enter display name"),
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  // password: yup
  //   .string()
  //   .required("Please enter your password.")
  //   .min(8, "Password is too short - should be 8 chars minimum."),
  phone: yup.string().min(11, "Phone length should be atleat 11"),

  info: yup.object({
    bankName: yup.string().required("Bank Name is required"),
    Iban: yup.string().required("Account/IBAN number is required"),
    accountOwner: yup.string().required("Account Owner name is required"),
    cnic: yup.string().required("CNIC is required"),
    strategy: yup.string().required("strategy is required"),
    // cnicBackImage: yup.mixed().required("CNIC Back Image is required"),
    // cnicFrontImage: yup.mixed().required("CNIC Front Image is required"),
    bankName: yup.string().required("Bank Name is required"),
    // bussinessName: yup.string().required("Business Name is required"),
    address: yup.string().required("You must enter address"),
  }),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
};

function EditDropshipper({ dataObject }) {
  const dispatch = useDispatch();
  const [frontCNIC, setFrontCNIC] = useState();
  const [backCNIC, setBackCNIC] = useState();
  //   const dataObject = useSelector(selectEditCustomerDialogData);
  const open = useSelector(selectEditDropshipperDialogState);
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues: dataObject,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const data = watch();

  const handleClose = () => {
    dispatch(closeEditDropshipperDialog());
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
              onSubmit={handleSubmit((_data) => {
                _data["info"]["cnicFrontImage"] = frontCNIC;
                _data["info"]["cnicBackImage"] = backCNIC;
                dispatch(updateDropshipper(_data))
                  .then(() => dispatch(getDropshippers()))
                  .then(() => handleClose());
              })}
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
                name="info.bussinessName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Business name"
                    type="name"
                    error={!!errors.info?.bussinessName}
                    helperText={errors?.info?.bussinessName?.message}
                    variant="outlined"
                    // required
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

              {/* <Controller
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
                  />
                )}
              /> */}

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

              <Controller
                name="info.address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Address"
                    type="text"
                    error={!!errors.info?.address}
                    helperText={errors?.info?.address?.message}
                    variant="outlined"
                    fullWidth
                    required
                    size={"small"}
                  />
                )}
              />

              <Controller
                name="info.strategy"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Explain your Selling/ Dropshipping Strategy"
                    type="text"
                    error={!!errors.info?.strategy}
                    helperText={errors?.info?.strategy?.message}
                    variant="outlined"
                    fullWidth
                    required
                    size={"small"}
                  />
                )}
              />

              <Controller
                name="info.cnic"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="CNIC #"
                    type="text"
                    error={!!errors.info?.cnic}
                    helperText={errors?.info?.cnic?.message}
                    variant="outlined"
                    fullWidth
                    required
                    size={"small"}
                  />
                )}
              />

              {/* <Typography>CNIC Front Image</Typography>
              <Controller
                name="info.cnicFrontImage"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    type="file"
                    size={"small"}
                    error={!!errors.info?.cnicFrontImage}
                    helperText={errors?.info?.cnicFrontImage?.message}
                    onChange={(e) =>
                      dispatch(uploadImage(e.target.files[0])).then(
                        (response) => setFrontCNIC(response.payload.data)
                      )
                    }
                    variant="outlined"
                    fullWidth
                    // required
                  />
                )}
              />
              <Typography>CNIC Back Image</Typography>

              <Controller
                name="info.cnicBackImage"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    type="file"
                    size={"small"}
                    error={!!errors.info?.cnicBackImage}
                    helperText={errors?.info?.cnicBackImage?.message}
                    variant="outlined"
                    fullWidth
                    // required
                    onChange={(e) =>
                      dispatch(uploadImage(e.target.files[0])).then(
                        (response) => setBackCNIC(response.payload.data)
                      )
                    }
                  />
                )}
              /> */}
              <Controller
                name="info.bankName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Bank Name"
                    type="text"
                    size={"small"}
                    error={!!errors.info?.bankName}
                    helperText={errors?.info?.bankName?.message}
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />

              <Controller
                name="info.accountOwner"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Account Owner Name"
                    type="text"
                    size={"small"}
                    error={!!errors.info?.accountOwner}
                    helperText={errors?.info?.accountOwner?.message}
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />

              <Controller
                name="info.Iban"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Account Number or IBAN"
                    type="text"
                    size={"small"}
                    error={!!errors.info?.Iban}
                    helperText={errors?.info?.Iban?.message}
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
              <Controller
                name="info.minimumWithdraw"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Minimum Withdraw Limit"
                    type="text"
                    size={"small"}
                    error={!!errors.info?.minimumWithdraw}
                    helperText={errors?.info?.minimumWithdraw?.message}
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
              <Controller
                render={({ field }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      className="font-medium text-14"
                      component="legend"
                    >
                      Status
                    </FormLabel>

                    <Select
                      {...field}
                      variant="outlined"
                      fullWidth
                      size={"small"}
                    >
                      <MenuItem value={"Pending"}>Pending</MenuItem>
                      <MenuItem value={"Unqualified"}>Unqualified</MenuItem>
                      <MenuItem value={"Verified"}>Verified</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="info.status"
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
              >
                Save Dropshipper
              </Button>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditDropshipper;
