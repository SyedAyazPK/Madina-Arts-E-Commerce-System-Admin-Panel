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
import { useDispatch } from "react-redux";
import { uploadImage } from "app/store/categorySlice";
import { addDropshipper, getDropshippers } from "app/store/dropshipperSlice";
import { FormLabel, MenuItem, Select } from "@mui/material";

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

  info: yup.object({
    bankName: yup.string().required("Bank Name is required"),
    Iban: yup.string().required("Account/IBAN number is required"),
    accountOwner: yup.string().required("Account Owner name is required"),
    cnic: yup.string().required("CNIC is required"),
    strategy: yup.string().required("strategy is required"),
    // cnicBackImage: yup.mixed().required("CNIC Back Image is required"),
    // cnicFrontImage: yup.mixed().required("CNIC Front Image is required"),
    bankName: yup.string().required("Bank Name is required"),
    bussinessName: yup.string().required("Business Name is required"),
    address: yup.string().required("You must enter address"),
  }),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
  role: "DropShipper",
  info: { status: "Pending" },
};

export default function AddDropshipper() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [frontCNIC, setFrontCNIC] = React.useState();
  const [backCNIC, setBackCNIC] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { control, formState, handleSubmit, reset, setValue } = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit(data) {
    data["info"]["cnicFrontImage"] = frontCNIC;
    data["info"]["cnicBackImage"] = backCNIC;
    delete data.phone;
    console.log(data, "data");
    dispatch(addDropshipper(data)).then(() => {
      dispatch(getDropshippers());
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
        + Add Dropshipper
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="h-full">
              <div className="  ">
                <div className="  ">
                  <div className="w-full  sm:mx-0">
                    <div className="flex justify-center mb-24">
                      <img src="assets/images/ecom/flag-05.png" />
                    </div>

                    <Typography
                      className=" text-xl text-center font-bold tracking-tight leading-tight"
                      color="secondary"
                    >
                      Add New Dropshipper
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

                      <Typography>CNIC Front Image</Typography>
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
                                (response) =>
                                  setFrontCNIC(response.payload.data)
                              )
                            }
                            variant="outlined"
                            fullWidth
                            required
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
                            size={"small"}
                            type="file"
                            error={!!errors.info?.cnicBackImage}
                            helperText={errors?.info?.cnicBackImage?.message}
                            variant="outlined"
                            fullWidth
                            required
                            onChange={(e) =>
                              dispatch(uploadImage(e.target.files[0])).then(
                                (response) => setBackCNIC(response.payload.data)
                              )
                            }
                          />
                        )}
                      />
                      <Controller
                        name="info.bankName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="mb-24"
                            size={"small"}
                            label="Bank Name"
                            type="text"
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
                            size={"small"}
                            label="Account Number or IBAN"
                            type="text"
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
                              <MenuItem value="Pending">Pending</MenuItem>
                              <MenuItem value="Unqualified">
                                Unqualified
                              </MenuItem>
                              <MenuItem value="Verified">Verified</MenuItem>
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
                        Add DropShipper
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
