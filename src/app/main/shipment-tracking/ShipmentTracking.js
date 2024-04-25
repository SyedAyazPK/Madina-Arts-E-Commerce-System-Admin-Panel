import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { addShipmentCSV, uploadCSV } from "app/store/shipmentSlice";
import { useDispatch } from "react-redux";
import moment from "moment";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

const defaultValues = {
  file: "",
  replaceTrackingInfo: false,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function ShipmentTracking() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [shipmentCSV, setShipmentCSV] = useState("");

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit(data) {
    const updatedData = {
      file: shipmentCSV,
      shippingDate: moment(new Date()).format(data.format),
      replaceTrackingInfo: data.replaceTrackingInfo,
    };
    dispatch(addShipmentCSV(updatedData));
  }

  return (
    <div className="p-16 px-32">
      <Typography className=" title ">Shipment Tracking</Typography>
      <Typography className="mb-24">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Download CSV File" {...a11yProps(0)} />
          <Tab label="Upload CSV" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <a
            href={"/assets/docs/sample.csv"}
            download="Sample CSV"
            target="_blank"
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              style={{ borderRadius: "10px" }}
            >
              Download Sample CSV
            </Button>
          </a>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography className=" text-24 fonr-semibold ">
            Fill in this Information
          </Typography>
          <Typography className="mb-24">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod.
          </Typography>
          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth required className="">
                  <FormLabel className="font-medium text-14" component="legend">
                    Upload CSV file from your Computer
                  </FormLabel>
                  <TextField
                    {...field}
                    className="  md:mr-16"
                    size={"small"}
                    type="file"
                    error={!!errors.file}
                    helperText={errors?.file?.message}
                    variant="outlined"
                    fullWidth
                    inputProps={{
                      accept:
                        ".xls,.xlsx,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    }}
                    onChange={(e) =>
                      dispatch(uploadCSV(e.target.files[0])).then((resp) =>
                        setShipmentCSV(resp.payload.data)
                      )
                    }
                  />
                </FormControl>
              )}
            />

            <Typography className="mt-8">
              Choose the Shipped Date Format
            </Typography>

            <Controller
              render={({ field }) => (
                <FormControl error={!!errors.RadioGroup}>
                  <RadioGroup {...field} aria-label="format" name="format" row>
                    <FormControlLabel
                      value="DD/MM/YYYY"
                      control={<Radio />}
                      label="dd/mm/yyyy"
                    />
                    <FormControlLabel
                      value="MM/DD/YYYY"
                      control={<Radio />}
                      label="mm/dd/yyyy"
                    />
                    <FormControlLabel
                      value="MM/DD/YY"
                      control={<Radio />}
                      label="mm/dd/yy"
                    />
                  </RadioGroup>
                </FormControl>
              )}
              name="format"
              control={control}
            />
            <Typography>Replace tracking information?</Typography>
            <Controller
              name="replaceTrackingInfo"
              control={control}
              render={({ field }) => (
                <FormControl className="" error={!!errors.replace}>
                  <FormControlLabel
                    label="Replace"
                    control={<Checkbox size="large" {...field} />}
                  />
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
              Upload
            </Button>
          </form>
        </TabPanel>
      </Box>
    </div>
  );
}
