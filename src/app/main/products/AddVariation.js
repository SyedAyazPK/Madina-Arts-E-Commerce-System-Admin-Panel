import * as React from "react";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import _ from "@lodash";
import {
  Autocomplete,
  FormLabel,
  MenuItem,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, selectCategories } from "app/store/categorySlice";
import { getBrands, selectBrands } from "app/store/brandSlice";
import { useEffect } from "react";
import { useState } from "react";
import { showMessage } from "app/store/fuse/messageSlice";
import {
  addAttribute,
  getAttributes,
  getVariations,
  selectAttributeVariations,
  selectAttributes,
  selectProductVariation,
  updateAttribute,
} from "app/store/productSlice";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required("You must enter variation title"),
  variations: yup.array().min(1, "Select at least one."),
});

const defaultValues = {
  title: "",
  variations: [],
};

const options = [];

export default function AddVariation() {
  const dispatch = useDispatch();
  const variationArrays = useSelector(selectProductVariation);
  const attributes = useSelector(selectAttributes);
  const attributeVariations = useSelector(selectAttributeVariations);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit(data) {
    console.log(data, "data");
    dispatch(addAttribute(data)).then(() => dispatch(getVariations()));

    reset(defaultValues);
  }

  useEffect(() => {
    dispatch(getAttributes());
    dispatch(getVariations());
  }, []);

  return (
    <div className="w-full p-24">
      <Typography className=" title ">Add Product Attributes</Typography>
      <Typography className="mb-24">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Typography>

      <form
        name="registerForm"
        noValidate
        className="flex flex-col justify-center w-full mt-32"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full   my-24">
          <Typography className="mb-8 font-medium text-14">Title</Typography>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  className=" md:w-1/3 md:mr-16 mb-16 md:mb-0"
                  type="text"
                  error={!!errors.title}
                  helperText={errors?.title?.message}
                  variant="outlined"
                  required
                  fullWidth
                  size={"small"}
                />
              </>
            )}
          />
        </div>

        <div className=" mb-16">
          <Typography className="mb-8 font-medium text-14">
            Variations
          </Typography>
          <Controller
            name="variations"
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
                    error={!!errors.variations}
                    helperText={errors?.variations?.message}
                    onBlur={onBlur}
                    inputRef={ref}
                    size={"small"}
                  />
                )}
              />
            )}
          />
        </div>

        <Button
          variant="contained"
          color="secondary"
          className="w-full mt-24"
          aria-label="add"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          type="submit"
          size="large"
        >
          Add Attribute
        </Button>
      </form>
      <div className="my-32">
        <Typography className=" title "> Attributes List</Typography>

        <Table className="simple">
          <TableHead>
            <TableRow>
              <TableCell align="left text-16 font-semibold">Title</TableCell>
              <TableCell align="left text-16 font-semibold">
                Variations
              </TableCell>
              <TableCell align="left text-16 font-semibold">
                Enable/Disable
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attributeVariations?.map((attribute) => (
              <TableRow key={attribute.attribute?._id}>
                <TableCell>
                  <Typography variant="subtitle1">
                    {attribute.attribute?.title}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1">
                    {" "}
                    {attribute?.variations}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <Switch
                    label="Enabled"
                    defaultChecked={attribute.attribute?.enabled}
                    onChange={(e) =>
                      dispatch(
                        updateAttribute({
                          id: attribute.attribute?._id,
                          enabled: e.target.checked,
                        })
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
