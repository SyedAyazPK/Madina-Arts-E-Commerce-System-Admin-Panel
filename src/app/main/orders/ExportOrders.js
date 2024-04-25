import { Grid, InputLabel, Typography } from "@mui/material";
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
import Autocomplete from "@mui/material/Autocomplete";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import clsx from "clsx";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch, useSelector } from "react-redux";
import { exportOrders, selectExportData } from "app/store/orderSlice";
import { useEffect } from "react";
import { getProducts, selectProducts } from "app/store/productSlice";
import { getCustomers, selectCustomers } from "app/store/customerSlice";
import moment from "moment";

const options = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "In Progress",
    label: "In Progress",
  },
  {
    value: "Delivered",
    label: "Delivered",
  },
  {
    value: "Cancelled",
    label: "Cancelled",
  },
];

const defaultValues = {};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

export const ExportOrders = () => {
  const dispatch = useDispatch();
  const exportData = useSelector(selectExportData);
  const customers = useSelector(selectCustomers);
  const products = useSelector(selectProducts);
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const data = watch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCustomers());
  }, []);

  return (
    <div className="my-24 p-32">
      <Typography variant="h5" className="font-semibold">
        Export Orders
      </Typography>
      <Typography className="mb-24">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Typography>
      <div className="flex w-full justify-start items-start">
        <form
          className=""
          onSubmit={handleSubmit((_data) => {
            const updatedData = {
              startDate: moment(_data.startDate, "DD-MM-YYYY").toISOString(),
              endDate: moment(_data.endDate, "DD-MM-YYYY").toISOString(),
            };
            console.info(updatedData);

            dispatch(exportOrders(updatedData)).then((resp) => {
              const blob = new Blob([resp.payload], { type: "text/csv" });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.setAttribute("hidden", "");
              a.setAttribute("href", url);
              a.setAttribute("download", "orders.csv");
              document.body.appendChild(a);
              a.click();
            });
          })}
        >
          <div className=" border-1 rounded p-16 mb-16">
            <Typography
              id="alert-dialog-title"
              variant="h6"
              className="font-semibold"
            >
              {"Filter Order By"}{" "}
            </Typography>

            <Controller
              render={({ field }) => (
                <FormControl error={!!errors.RadioGroup}>
                  <RadioGroup {...field} aria-label="gender" name="filter" row>
                    <FormControlLabel
                      value="order"
                      control={<Radio />}
                      label="Order Date"
                    />
                    <FormControlLabel
                      value="modification"
                      control={<Radio />}
                      label="Modification Date"
                    />
                    <FormControlLabel
                      value="Paid"
                      control={<Radio />}
                      label="Paid Date"
                    />
                    <FormControlLabel
                      value="Completed"
                      control={<Radio />}
                      label="Completed Date"
                    />
                  </RadioGroup>
                  <FormHelperText>{errors?.RadioGroup?.message}</FormHelperText>
                </FormControl>
              )}
              name="RadioGroup"
              control={control}
            />
          </div>

          <div className="border-1 rounded p-16 mb-16">
            <div className="flex items-center">
              <Typography
                id="alert-dialog-title"
                variant="h6"
                className="font-semibold w-full"
              >
                Date Range
              </Typography>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    error={!!errors.From_Date}
                    helperText={errors?.From_Date?.message}
                    className="w-full"
                    fullWidth
                    type="date"
                    size="small"
                  />
                )}
                name="startDate"
                control={control}
              />
              <Typography
                id="alert-dialog-title"
                variant="h6"
                className="font-semibold w-full pl-16"
              >
                To
              </Typography>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    error={!!errors.To_Date}
                    helperText={errors?.To_Date?.message}
                    className="w-full"
                    fullWidth
                    type="date"
                    size="small"
                  />
                )}
                name="endDate"
                control={control}
              />
            </div>
            {/* <div className="flex items-center mt-16">
              <Typography
                id="alert-dialog-title"
                variant="h6"
                className="font-semibold w-full"
              >
                Order Range
              </Typography>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    error={!!errors.From_Order}
                    helperText={errors?.From_Order?.message}
                    className="w-full"
                    fullWidth
                  />
                )}
                name="From_Order"
                control={control}
              />
              <Typography
                id="alert-dialog-title"
                variant="h6"
                className="font-semibold w-full pl-16"
              >
                To
              </Typography>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    error={!!errors.To_Order}
                    helperText={errors?.To_Order?.message}
                    className="w-full"
                    fullWidth
                  />
                )}
                name="To_Order"
                control={control}
              />
            </div> */}
            <Controller
              name="by_products"
              control={control}
              render={({ field }) => (
                <FormControl className="items-center" error={!!errors.invoice}>
                  <FormControlLabel
                    label="Summary report by products"
                    control={<Checkbox size="large" {...field} />}
                  />
                  <FormHelperText>{errors?.invoice?.message}</FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              name="by_customers"
              control={control}
              render={({ field }) => (
                <FormControl className="items-center" error={!!errors.invoice}>
                  <FormControlLabel
                    label="Summary report by customers"
                    control={<Checkbox size="large" {...field} />}
                  />
                  <FormHelperText>{errors?.invoice?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </div>

          <div className="mt-24 mb-16">
            <Typography variant="h6" className="mb-24   font-semibold">
              Order Status
            </Typography>
            <Controller
              name="Order Status"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value, onBlur, ref } }) => (
                <Autocomplete
                  className="mt-8 mb-16"
                  multiple
                  freeSolo
                  options={options}
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select multiple tags"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={!!errors.Autocomplete}
                      helperText={errors?.Autocomplete?.message}
                      onBlur={onBlur}
                      inputRef={ref}
                      size="small"
                    />
                  )}
                />
              )}
            />
          </div>

          <div className="mb-16">
            <Controller
              render={({ field }) => (
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-disabled-label">
                    Filter by Product
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-disabled-label"
                    id="demo-simple-select-disabled"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {products.result?.map((product, index) => (
                      <MenuItem value={product._id}>{product.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              name="filter_product"
              control={control}
            />
          </div>

          <div className="mb-16">
            <Controller
              render={({ field }) => (
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-disabled-label">
                    Filter by Customer
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-disabled-label"
                    id="demo-simple-select-disabled"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {customers.result?.map((customer, index) => (
                      <MenuItem value={customer._id}>{customer.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              name="filter_Customer"
              control={control}
            />
          </div>

          <div className="mb-16">
            <Controller
              render={({ field }) => (
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-disabled-label">
                    Filter by Billing
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-disabled-label"
                    id="demo-simple-select-disabled"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="cod">Cash on Delivery</MenuItem>
                    <MenuItem value="card">Debit Card</MenuItem>
                  </Select>
                </FormControl>
              )}
              name="filter_Billing"
              control={control}
            />
          </div>
          <div className="border-1 rounded p-16">
            <Typography
              id="alert-dialog-title"
              variant="h6"
              className="font-semibold w-full  "
            >
              Filter by Shipping
            </Typography>

            <Controller
              render={({ field }) => (
                <FormControl fullWidth className="my-16" size="small">
                  <InputLabel id="demo-simple-select-disabled-label">
                    Shipping Location City
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-disabled-label"
                    id="demo-simple-select-disabled"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Lahore">Lahore</MenuItem>
                    <MenuItem value="Karachi">Karachi</MenuItem>
                    <MenuItem value="Islamabad">Islamabad</MenuItem>
                  </Select>
                </FormControl>
              )}
              name="shipping_city"
              control={control}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  error={!!errors.shipping_location}
                  helperText={errors?.shipping_location?.message}
                  className="w-full"
                  fullWidth
                  size="small"
                />
              )}
              name="shipping_location"
              control={control}
            />
            <div className="mt-24 mb-16">
              <Typography className="mb-24 font-medium text-14">
                Shipping Method
              </Typography>
              <Controller
                name="Shipping Method"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value, onBlur, ref } }) => (
                  <Autocomplete
                    className="mt-8 mb-16"
                    multiple
                    freeSolo
                    options={options}
                    value={value}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select multiple tags"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={!!errors.Autocomplete}
                        helperText={errors?.Autocomplete?.message}
                        onBlur={onBlur}
                        inputRef={ref}
                        size="small"
                      />
                    )}
                  />
                )}
              />
            </div>
          </div>

          <div className=" border-1 rounded p-16 my-16">
            <Typography
              id="alert-dialog-title"
              variant="h6"
              className="font-semibold"
            >
              Format
            </Typography>

            <Controller
              render={({ field }) => (
                <FormControl error={!!errors.RadioGroup}>
                  <RadioGroup {...field} aria-label="format" name="format" row>
                    <FormControlLabel
                      value="csv"
                      control={<Radio />}
                      label="CSV"
                    />
                  </RadioGroup>
                </FormControl>
              )}
              name="format"
              control={control}
            />
          </div>

          <div className="flex my-48 items-center">
            <Button
              className="mx-8 w-full"
              variant="contained"
              color="secondary"
              type="submit"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              style={{ borderRadius: "10px" }}
            >
              Export
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
