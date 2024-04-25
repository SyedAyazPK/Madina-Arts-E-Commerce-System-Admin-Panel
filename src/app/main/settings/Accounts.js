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
  addAccountSettings,
  getAccountSettings,
  selectAccountSettings,
} from "app/store/settingSlice";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

export const Accounts = () => {
  const dispatch = useDispatch();
  const accountPrivacy = useSelector(selectAccountSettings);

  const { control, formState, handleSubmit, reset, watch } = useForm({
    mode: "onChange",
    defaultValues: accountPrivacy,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(getAccountSettings());
  }, []);

  const { isValid, dirtyFields, errors, setError } = formState;

  const data = watch("guestCheckout");
  function onSubmit(data) {
    // const updatedData = {
    //   guestCheckout: data.guestCheckout,
    //   accountCreation: {
    //     createAccountDuringCheckout: data.createAccountDuringCheckout,
    //     createAccountOnHomePage: data.createAccountOnHomePage,
    //     generateUsername: data.generateUsername,
    //     setPassword: data.setPassword,
    //   },
    //   accountErasure: data.accountErasure,
    //   personalDataRemoval: data.personalDataRemoval,
    // };

    dispatch(addAccountSettings(data));
  }
  return (
    <div className="p-32">
      <Typography className=" title ">{`Settings -> Accounts & Privacy`}</Typography>
      <Typography className="mb-24">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Typography>
      <form
        name="registerForm"
        noValidate
        className="flex flex-col justify-center w-full md:w-1/2 mt-32"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex mt-16">
          <Typography className="mr-40 mt-8 font-semibold">
            Guest Checkout
          </Typography>
          <div className="flex flex-col">
            <Controller
              name="guestCheckout"
              control={control}
              render={({ field: { onChange, value, onBlur, ref } }) => (
                <FormControl className="" error={!!errors.stock}>
                  <FormControlLabel
                    label="Allow customers to place an order without an account"
                    control={
                      <Checkbox
                        checked={value}
                        onBlur={onBlur}
                        onChange={(ev) => onChange(ev.target.checked)}
                        inputRef={ref}
                      />
                    }
                  />
                </FormControl>
              )}
            />{" "}
            {/* <Controller
              name="guestCheckout"
              control={control}
              render={({ field: { onChange, value, onBlur, ref } }) => (
                <FormControl className="" error={!!errors.stock}>
                  <FormControlLabel
                    label="Allow customers to login an existing account during checkout"
                   control={
                      <Checkbox
                        checked={value}
                        onBlur={onBlur}
                        onChange={(ev) => onChange(ev.target.checked)}
                        inputRef={ref}
                      />
                    }
                  />
                </FormControl>
              )}
            />{" "} */}
          </div>
        </div>
        <div className="flex mt-16">
          <Typography className="mr-80 mt-8 font-semibold flex">
            Account Creation
          </Typography>
          <div className="flex flex-col">
            <Controller
              name="accountCreation.createAccountDuringCheckout"
              control={control}
              render={({ field: { onChange, value, onBlur, ref } }) => (
                <FormControl className="" error={!!errors.stock}>
                  <FormControlLabel
                    label="Allow customers to create an account during checkout"
                    control={
                      <Checkbox
                        checked={value}
                        onBlur={onBlur}
                        onChange={(ev) => onChange(ev.target.checked)}
                        inputRef={ref}
                      />
                    }
                  />
                </FormControl>
              )}
            />{" "}
            <Controller
              name="accountCreation.createAccountOnHomePage"
              control={control}
              render={({ field: { onChange, value, onBlur, ref } }) => (
                <FormControl className="" error={!!errors.stock}>
                  <FormControlLabel
                    label='Allow customers to create an account on "My Account" page'
                    control={
                      <Checkbox
                        checked={value}
                        onBlur={onBlur}
                        onChange={(ev) => onChange(ev.target.checked)}
                        inputRef={ref}
                      />
                    }
                  />
                </FormControl>
              )}
            />{" "}
            <Controller
              name="accountCreation.generateUsername"
              control={control}
              render={({ field: { onChange, value, onBlur, ref } }) => (
                <FormControl className="mb-8" error={!!errors.stock}>
                  <FormControlLabel
                    label="When creating an account, automatically generate an account username based on their name, surname"
                    control={
                      <Checkbox
                        checked={value}
                        onBlur={onBlur}
                        onChange={(ev) => onChange(ev.target.checked)}
                        inputRef={ref}
                      />
                    }
                  />
                </FormControl>
              )}
            />
            <Controller
              name="accountCreation.setPassword"
              control={control}
              render={({ field: { onChange, value, onBlur, ref } }) => (
                <FormControl className="" error={!!errors.stock}>
                  <FormControlLabel
                    label="When creating an account, send the new user a link to set their password"
                    control={
                      <Checkbox
                        checked={value}
                        onBlur={onBlur}
                        onChange={(ev) => onChange(ev.target.checked)}
                        inputRef={ref}
                      />
                    }
                  />
                </FormControl>
              )}
            />
          </div>
        </div>
        <div className="flex">
          <Typography className="mt-8 mr-32 font-semibold">
            Account erasure request
          </Typography>
          <Controller
            name="accountErasure"
            control={control}
            render={({ field: { onChange, value, onBlur, ref } }) => (
              <FormControl className="" error={!!errors.stock}>
                <FormControlLabel
                  label="Remove personal data from orders on request"
                  control={
                    <Checkbox
                      checked={value}
                      onBlur={onBlur}
                      onChange={(ev) => onChange(ev.target.checked)}
                      inputRef={ref}
                    />
                  }
                />
                <FormHelperText>
                  When handling an Account erasure request should personal data
                  within orders be reatained or removed?
                </FormHelperText>
              </FormControl>
            )}
          />
        </div>

        <div className="flex  ">
          <Typography className="mr-56 mt-8 font-semibold">
            Personal data remover
          </Typography>
          <Controller
            name="personalDataRemoval"
            control={control}
            render={({ field: { onChange, value, onBlur, ref } }) => (
              <FormControl className="" error={!!errors.stock}>
                <FormControlLabel
                  label="Remove access to downlaod on request"
                  control={
                    <Checkbox
                      checked={value}
                      onBlur={onBlur}
                      onChange={(ev) => onChange(ev.target.checked)}
                      inputRef={ref}
                    />
                  }
                />
                <FormHelperText>
                  When handling an Account erasure request should access to
                  downloadable files be revoked and download logs cleared?
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
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};
