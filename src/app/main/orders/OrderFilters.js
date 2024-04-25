import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import clsx from "clsx";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { useSelector } from "react-redux";
import { selectCustomers } from "app/store/customerSlice";

const defaultValues = {
  customer: "",
  shipping: "",
  date: "",
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  //   Select: yup
  //     .string()
  //     .required('You must select a value')
  //     .oneOf(['20', '30'], 'Select 20 or 30.'),
});

function OrderFilters() {
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(schema),
  });
  const customers = useSelector(selectCustomers);

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const data = watch();

  return (
    <div className="flex w-full md:w-1/2  justify-end items-end">
      <form
        className="w-full"
        onSubmit={handleSubmit((_data) => console.info(_data))}
      >
        <div className="mt-16 mb-16 flex w-full">
          <Controller
            render={({ field }) => (
              <FormControl
                error={!!errors.Select}
                fullWidth
                className="w-full"
                size="small"
              >
                <FormLabel className="font-medium text-14" component="legend">
                  Customer Name
                </FormLabel>
                <Select {...field} variant="outlined" fullWidth>
                  {customers?.results?.map((customer) => (
                    <MenuItem value={customer._id} key={customer._id}>
                      {customer.name}
                    </MenuItem>
                  ))}
                  <MenuItem value="20">Twenty (20)</MenuItem>
                  <MenuItem value="30">Thirty (30)</MenuItem>
                </Select>
                <FormHelperText>{errors?.customer?.message}</FormHelperText>
              </FormControl>
            )}
            name="customer"
            control={control}
          />
          <div className="w-full mx-8">
            <Controller
              render={({ field }) => (
                <FormControl error={!!errors.Select} fullWidth size="small">
                  <FormLabel className="font-medium text-14" component="legend">
                    Shipping Provider
                  </FormLabel>
                  <Select {...field} variant="outlined" fullWidth>
                    <MenuItem value="TCS">TCS</MenuItem>
                    <MenuItem value="Leopard">Leopard</MenuItem>
                    <MenuItem value="Pak Courier">Pak Courier</MenuItem>
                  </Select>
                  <FormHelperText>{errors?.customer?.message}</FormHelperText>
                </FormControl>
              )}
              name="shipping"
              control={control}
            />
          </div>
          {/* <div className='w-full'>
            <Controller
              render={({ field }) => (
                <FormControl error={!!errors.Select} fullWidth>
                  <FormLabel className='font-medium text-14' component='legend'>
                    Date
                  </FormLabel>
                  <Select {...field} variant='outlined' fullWidth>
                    <MenuItem value='10'>Ten (10)</MenuItem>
                    <MenuItem value='20'>Twenty (20)</MenuItem>
                    <MenuItem value='30'>Thirty (30)</MenuItem>
                  </Select>
                  <FormHelperText>{errors?.customer?.message}</FormHelperText>
                </FormControl>
              )}
              name='date'
              control={control}
            />
          </div> */}
        </div>

        <div className="flex justify-end w-full items-center">
          <Button
            className="mx-8"
            variant="contained"
            color="secondary"
            type="submit"
            disabled={_.isEmpty(dirtyFields) || !isValid}
          >
            Apply filters
          </Button>

          <Button
            className="mx-8"
            type="button"
            onClick={() => {
              reset(defaultValues);
            }}
          >
            Clear Filters
          </Button>
        </div>
      </form>
    </div>
  );
}

export default OrderFilters;
