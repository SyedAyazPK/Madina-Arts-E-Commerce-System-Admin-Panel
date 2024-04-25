import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
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

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  displayName: yup.string().required("You must enter display name"),
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  acceptTermsConditions: yup
    .boolean()
    .oneOf([true], "The terms and conditions must be accepted."),
});

const defaultValues = {
  displayName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  acceptTermsConditions: false,
};

function SignUpPage() {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit({ displayName, password, email }) {
    jwtService
      .createUser({
        displayName,
        password,
        email,
      })
      .then((user) => {
        // No need to do anything, registered user data will be set at app/auth/AuthContext
      })
      .catch((_errors) => {
        _errors.forEach((error) => {
          setError(error.type, {
            type: "manual",
            message: error.message,
          });
        });
      });
  }

  return (
    <>
      <div className="h-full">
        <div>
          <img
            className="w-1/2 md:w-1/5 p-8"
            src="assets/images/logo/logo.png"
            alt="logo"
          />
        </div>
        <div className=" flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-center    flex-1 min-w-0 p-32">
          <Paper className=" sm:h-auto md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-32 md:p-32 sm:rounded-2xl md:rounded-2xl sm:shadow md:shadow ltr:border-r-1 rtl:border-l-1">
            <div className="w-full sm:w-320 mx-auto sm:mx-0">
              <div className="flex justify-center mb-24">
                <img src="assets/images/ecom/flag-05.png" />
              </div>

              <Typography
                className=" text-xl text-center font-bold tracking-tight leading-tight"
                color="secondary"
              >
                Sign Up
              </Typography>
              <div className="flex items-baseline mt-2 font-medium justify-center">
                <Typography color="secondary">
                  Register with us for free!
                </Typography>
              </div>

              <form
                name="registerForm"
                noValidate
                className="flex flex-col justify-center w-full mt-32"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="displayName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Display name"
                      autoFocus
                      type="name"
                      error={!!errors.displayName}
                      helperText={errors?.displayName?.message}
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
                  name="passwordConfirm"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Password (Confirm)"
                      type="password"
                      error={!!errors.passwordConfirm}
                      helperText={errors?.passwordConfirm?.message}
                      variant="outlined"
                      required
                      fullWidth
                      size={"small"}
                    />
                  )}
                />

                <Controller
                  name="acceptTermsConditions"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      className="items-center"
                      error={!!errors.acceptTermsConditions}
                    >
                      <FormControlLabel
                        label="I agree to the Terms of Service and Privacy Policy"
                        control={<Checkbox size="small" {...field} />}
                      />
                      <FormHelperText>
                        {errors?.acceptTermsConditions?.message}
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
                >
                  Create your free account
                </Button>
              </form>
              <Typography className="flex justify-end mt-4">
                Already have an account?
                <span className="ml-2">
                  <Link to={"/sign-in"} style={{ textDecoration: "none" }}>
                    Login here
                  </Link>
                </span>
              </Typography>
              <div className="flex items-center mt-32">
                <div className="flex-auto mt-px border-t" />
                <Typography className="mx-8" color="text.secondary">
                  OR Continue with
                </Typography>
                <div className="flex-auto mt-px border-t" />
              </div>
              <div className="flex flex-col items-center mt-32 space-y-16">
                <Button
                  variant="outlined"
                  className="flex-auto px-48 social-register-border w-full"
                >
                  <img src="/assets/images/ecom/google.png" />
                  <Typography className="social-register hidden md:flex ml-8">
                    Sign Up with Google
                  </Typography>
                </Button>
                <Button
                  variant="outlined"
                  className="flex-auto px-48 social-register-border w-full"
                >
                  <img src="/assets/images/ecom/fb.png" />
                  <Typography className="social-register ml-8 hidden md:flex">
                    Sign Up with Facebook
                  </Typography>
                </Button>
                <Button
                  variant="outlined"
                  className="flex-auto px-48 social-register-border w-full"
                >
                  <img src="/assets/images/ecom/apple.png" />
                  <Typography className="social-register ml-8 hidden md:flex">
                    Sign Up with Apple
                  </Typography>
                </Button>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
