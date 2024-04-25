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
import {
  addShippingZoneSettings,
  editShippingZone,
  getShippingZone,
} from "app/store/settingSlice";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  methodTitle: yup.string().required("You must enter methodTitle"),
  methodDescription: yup
    .string()
    .required("You must enter methodDescription")
    .min(20, "Length must be atleast 20 characters"),
  freeShippingLabel: yup.string().required("You must enter freeShippingLabel"),
  rulesCalculation: yup.string().required("You must enter rulesCalculation"),
  cartCalculation: yup.string().required("You must enter cartCalculation"),
  unableShippingCalculatorCart: yup
    .string()
    .required("You must enter unableShippingCalculatorCart"),
  // shippingDesignation: yup
  //   .string()
  //   .required('You must enter shippingDesignation'),
});

const defaultValues = {
  hideShippingCost: false,
  freeShipping: false,
  unableShipmentMethod: false,
};

export const EditShippingZone = ({ dataObject, setOpen }) => {
  const dispatch = useDispatch();
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: { ...defaultValues, ...dataObject },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(getShippingZone());
  }, []);

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit(data) {
    dispatch(editShippingZone(data)).then(() => {
      dispatch(getShippingZone());
      setOpen(false);
    });
  }
  return (
    <div className="p-32">
      <Typography className=" title ">{`Settings -> Shipping Zone -> ${dataObject?.methodTitle}`}</Typography>
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
          <Typography className="mr-24 font-semibold">
            Enable/Disable
          </Typography>
          <Controller
            name="unableShipmentMethod"
            control={control}
            render={({ field }) => (
              <FormControl className="" error={!!errors.stock} required>
                <FormControlLabel
                  label="Enable this shipment method"
                  control={<Checkbox size="small" {...field} />}
                />
              </FormControl>
            )}
          />
        </div>

        <div className="flex mt-16 items-center">
          <Typography className="mr-40 font-semibold">Method Title</Typography>
          <Controller
            name="methodTitle"
            control={control}
            render={({ field }) => (
              <FormControl className="" required>
                <TextField
                  {...field}
                  className=""
                  autoFocus
                  error={!!errors.methodTitle}
                  helperText={errors?.methodTitle?.message}
                  variant="outlined"
                  fullWidth
                  placeholder="Cash on Delivery"
                  required
                  size="small"
                />
              </FormControl>
            )}
          />
        </div>

        <div className="flex mt-16 items-center">
          <Typography className="mr-40 font-semibold">
            Method Description
          </Typography>
          <Controller
            name="methodDescription"
            control={control}
            render={({ field }) => (
              <FormControl className="" required>
                <TextField
                  {...field}
                  className=""
                  autoFocus
                  error={!!errors.methodDescription}
                  helperText={errors?.methodDescription?.message}
                  variant="outlined"
                  fullWidth
                  placeholder="All Pakistan"
                  required
                  size="small"
                />
              </FormControl>
            )}
          />
        </div>

        <Typography className="font-semibold text-24 mt-16">
          Free Shipping
        </Typography>

        <div className="flex mt-16 items-center">
          <Typography className="mr-40 font-semibold">Free Shipping</Typography>
          <Controller
            name="freeShipping"
            control={control}
            render={({ field }) => (
              <FormControl className="" error={!!errors.freeShipping}>
                <FormControlLabel
                  label="Show only for logged in users"
                  control={<Checkbox size="small" {...field} />}
                />
              </FormControl>
            )}
          />
        </div>

        <div className="flex mt-16 items-center">
          <Typography className="mr-40 font-semibold">
            Free Shipping Label
          </Typography>
          <Controller
            name="freeShippingLabel"
            control={control}
            render={({ field }) => (
              <FormControl className="" required>
                <TextField
                  {...field}
                  autoFocus
                  error={!!errors.freeShippingLabel}
                  helperText={errors?.freeShippingLabel?.message}
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                />
              </FormControl>
            )}
          />
        </div>

        <Typography className="font-semibold text-24 mt-16">
          Cost Calculation
        </Typography>

        <div className="flex mt-16 items-center">
          <Typography className="mr-40 font-semibold">
            Rules Calculation
          </Typography>
          <Controller
            name="rulesCalculation"
            control={control}
            render={({ field }) => (
              <FormControl className="" required>
                <TextField
                  {...field}
                  autoFocus
                  error={!!errors.rulesCalculation}
                  helperText={errors?.rulesCalculation?.message}
                  variant="outlined"
                  fullWidth
                  placeholder="Sum"
                  required
                  size="small"
                />
              </FormControl>
            )}
          />
        </div>

        <div className="flex mt-16 items-center">
          <Typography className="mr-40 font-semibold">
            Cart Calculation
          </Typography>
          <Controller
            name="cartCalculation"
            control={control}
            render={({ field }) => (
              <FormControl className="" required>
                <TextField
                  {...field}
                  autoFocus
                  error={!!errors.cartCalculation}
                  helperText={errors?.cartCalculation?.message}
                  variant="outlined"
                  fullWidth
                  placeholder="Cart Value"
                  required
                  size="small"
                />
              </FormControl>
            )}
          />
        </div>

        <Typography className="font-semibold text-24 mt-16">
          Shipping Zone
        </Typography>

        <div className="flex mt-16">
          <Typography className="mr-40 mt-8 font-semibold">
            Calculations
          </Typography>
          <div className="flex flex-col">
            <Controller
              name="unableShippingCalculatorCart"
              control={control}
              render={({ field }) => (
                <FormControl
                  className=""
                  error={!!errors.unableShippingCalculatorCart}
                >
                  <FormControlLabel
                    label="Enable the shipping calculator on the cart value"
                    control={<Checkbox size="small" {...field} />}
                  />
                </FormControl>
              )}
            />{" "}
            <Controller
              name="hideShippingCost"
              control={control}
              render={({ field }) => (
                <FormControl
                  className=""
                  error={!!errors.hideShippingCost}
                  required
                >
                  <FormControlLabel
                    label="Hide shipping costs until an address is entered"
                    control={<Checkbox size="small" {...field} />}
                  />
                </FormControl>
              )}
            />{" "}
          </div>
        </div>

        <div className="flex mt-16">
          <Typography className="mr-40 mt-8 font-semibold">
            Shipping Destination
          </Typography>
          <Controller
            render={({ field }) => (
              <FormControl>
                <RadioGroup
                  {...field}
                  aria-label="shippingDesignation"
                  name="shippingDesignation"
                >
                  <FormControlLabel
                    value="defaultShippingAddress"
                    control={<Radio />}
                    label="Default to customer shipping address"
                  />
                  <FormControlLabel
                    value="defaultBillingAddress"
                    control={<Radio />}
                    label="Default to customer biling address"
                  />
                  <FormControlLabel
                    value="forceShippingBillingAddress"
                    control={<Radio />}
                    label="Force shipping to the customer biling address"
                  />
                </RadioGroup>
              </FormControl>
            )}
            name="shippingDesignation"
            control={control}
          />
        </div>

        <Typography className="font-semibold text-24 mt-16">
          Advanced Options
        </Typography>

        <div className="flex mt-16">
          <Typography className="mr-40 mt-8 font-semibold">
            Visibility
          </Typography>
          <div className="flex flex-col">
            <Controller
              name="visibility"
              control={control}
              render={({ field }) => (
                <FormControl className="" error={!!errors.stock}>
                  <FormControlLabel
                    label="Show only for logged in users"
                    control={<Checkbox size="small" {...field} />}
                  />
                </FormControl>
              )}
            />
          </div>
        </div>

        <Button
          variant="contained"
          color="secondary"
          className="w-full mt-24"
          aria-label="Register"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          type="submit"
          size="large"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};
