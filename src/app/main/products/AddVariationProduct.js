import * as React from "react";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import _ from "@lodash";
import { FormLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getAttributes,
  getCombinations,
  getProducts,
  selectProductVariations,
} from "app/store/productSlice";
import { getCategories, selectCategories } from "app/store/categorySlice";
import { getBrands, selectBrands } from "app/store/brandSlice";
import { useEffect } from "react";
import VariationAccordian from "./VariationAccordian";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required("You must enter product title"),
});

const defaultValues = {
  title: "",
};

export default function AddVariationProduct() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const variations = useSelector(selectProductVariations);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
    dispatch(getAttributes());
    dispatch(getCombinations());
  }, []);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit(data) {
    const updatedData = {
      ...data,
      variations: variations,
      type: "Variable",
    };
    dispatch(addProduct(updatedData)).then(() => dispatch(getProducts()));
  }

  return (
    <div className="w-full p-24">
      <Typography className=" title ">Add Variation Product</Typography>
      <Typography className="mb-24">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Typography>

      <VariationAccordian />

      <form
        name="registerForm"
        noValidate
        className="flex flex-col justify-center w-full mt-32"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full md:flex my-24">
          <div className="w-full md:mr-16">
            <FormLabel className="font-medium text-14" component="legend">
              Title
            </FormLabel>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    className=" w-full  md:mr-16 mb-16 md:mb-0"
                    // label='Name'
                    autoFocus
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

          <Controller
            render={({ field }) => (
              <FormControl fullWidth required className="">
                <FormLabel className="font-medium text-14" component="legend">
                  Brand
                </FormLabel>
                <Select {...field} variant="outlined" fullWidth size={"small"}>
                  {brands?.result?.map((brand) => (
                    <MenuItem value={brand._id} key={brand._id}>
                      {brand.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            name="brand"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <FormControl fullWidth required className="md:ml-16">
                <FormLabel className="font-medium text-14" component="legend">
                  Category
                </FormLabel>
                <Select {...field} variant="outlined" fullWidth size={"small"}>
                  {categories?.result?.map((category) => (
                    <MenuItem value={category._id} key={category._id}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            name="category"
            control={control}
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
          Add Product
        </Button>
      </form>
    </div>
  );
}
