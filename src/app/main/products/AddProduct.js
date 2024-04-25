import * as React from "react";
import Button from "@mui/material/Button";
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

import FormHelperText from "@mui/material/FormHelperText";

import { Autocomplete, FormLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getProducts,
  pushImage,
  selectImages,
  setImagesAction,
} from "app/store/productSlice";
import {
  getCategories,
  selectCategories,
  uploadImage,
} from "app/store/categorySlice";
import { getBrands, selectBrands } from "app/store/brandSlice";
import { useEffect } from "react";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { Add, CancelOutlined } from "@mui/icons-material";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  productSku: yup.string().required("You must enter productSku"),
  title: yup.string().required("You must enter product title"),
  weight: yup.string().required("You must enter product weight"),
  description: yup.string().min(20, "Must be atleat 20 characters"),
  shortDescription: yup
    .string()
    .required("You must enter short description")
    .min(20, "Must be atleat 20 characters"),
  price: yup
    .number()
    .required("You must enter price")
    .positive("Price cannot be less than 0"),
  stock: yup
    .number("Should be a number")
    .positive("Stock cannot be less than 0"),
  discountedPrice: yup
    .number("Should be a number")
    .nullable(true)
    .lessThan(
      yup.ref("price"),
      "Discounted price cannot be more than regular price"
    )
    .positive("Price cannot be less than 0")
    .transform((v, o) => (o === "" ? null : v)),
});

const defaultValues = {
  productSku: "",
  title: "",
  stock: "",
  description: "",
  shortDescription: "",
  inventory: false,
  price: "",
  category: "",
  price: "",
  type: "Simple",
  weight: "",
};

export default function AddProduct() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const productImages = useSelector(selectImages);

  const [productImage, setProductImage] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const uploadedImages = Array.from(event.target.files);
    setImages(uploadedImages);
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
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
    };
    const updatedImages = productImages?.map((item) => item.url);
    console.log(updatedImages);
    dispatch(
      addProduct({
        ...updatedData,
        images: updatedImages,
        inventory: data.categories,
      })
    )
      .then(() => dispatch(getProducts()))
      .then(() => {
        setImages([]);
        dispatch(setImagesAction([]));
        reset(defaultValues);
      });
  }
  const handleChangeProductImage = (url) => {
    dispatch(pushImage({ id: nanoid(), url }));
  };

  return (
    <div className="w-full p-24">
      <Typography className=" title ">Products</Typography>
      <Typography className="mb-24">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Typography>

      <form
        name="registerForm"
        noValidate
        className="flex flex-col justify-center w-full mt-32"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex">
          <div className="w-full md:mr-16">
            <Controller
              name="productSku"
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    className="  "
                    label="SKU"
                    type="text"
                    error={!!errors.productSku}
                    helperText={errors?.productSku?.message}
                    variant="outlined"
                    required
                    fullWidth
                    size={"small"}
                  />
                  <FormHelperText>
                    This needs to be unique for each product
                  </FormHelperText>
                </>
              )}
            />
          </div>

          <div className="w-full md:mr-16">
            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    className="  "
                    label="Weight in kg"
                    type="text"
                    error={!!errors.weight}
                    helperText={errors?.weight?.message}
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
            name="stock"
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  className="     mb-16 md:mb-0"
                  label="Stock Quantity"
                  type="text"
                  error={!!errors.stock}
                  helperText={errors?.stock?.message}
                  variant="outlined"
                  required
                  fullWidth
                  size={"small"}
                />
              </>
            )}
          />
        </div>

        <div className="w-full md:flex my-24">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  className=" md:w-1/3 md:mr-16 mb-16 md:mb-0"
                  label="Name"
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
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  className=" md:w-2/3"
                  label="Description"
                  autoFocus
                  type="text"
                  error={!!errors.description}
                  helperText={errors?.description?.message}
                  variant="outlined"
                  fullWidth
                  required
                  size={"small"}
                />
              </>
            )}
          />
        </div>
        <div
          className={`w-full flex space-x-0 sm:flex-row flex-col space-y-6 sm:space-y-0 sm:space-x-12 items-center mb-24 ${
            productImages.length > 2 && "!flex-col !space-y-6 !space-x-0"
          }`}>
          <label htmlFor="idLogo" className="w-1/3">
            <input
              className="hidden w-full text-center"
              id="idLogo"
              type={"file"}
              accept="image/*"
              onChange={(e) =>
                dispatch(uploadImage(e.target.files[0])).then((resp) => {
                  console.log(resp.payload.data);
                  handleChangeProductImage(resp.payload.data);
                })
              }
            />
            <div className="flex  bg-[#e0dcdc] flex-col justify-center min-h-[5rem] rounded-xl w-full items-center cursor-pointer">
              <Add className="text-white bg-black rounded-full shadow-lg" />
              <Typography>Add Image</Typography>
            </div>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-8">
            {productImages?.map((image) => {
              return (
                <div className="relative h-[16rem]">
                  <img
                    key={image.id}
                    src={image.url}
                    className="w-full h-full rounded-lg"
                    alt=""
                  />
                  <CancelOutlined
                    className="absolute top-2 right-2 cursor-pointer text-red"
                    onClick={() => {
                      const filterImages = productImages.filter(
                        (item) => item.id !== image.id
                      );
                      dispatch(setImagesAction(filterImages));
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full md:flex mb-24">
          <Controller
            name="shortDescription"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth className="md:mr-16" required>
                <FormLabel className="font-medium text-14" component="legend">
                  Short Description
                </FormLabel>
                <TextField
                  {...field}
                  className=""
                  type="text"
                  error={!!errors.shortDescription}
                  helperText={errors?.shortDescription?.message}
                  variant="outlined"
                  fullWidth
                  size={"small"}
                />
              </FormControl>
            )}
          />
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
        </div>
        <div className="w-full md:flex mb-24">
          <Controller
            render={({ field }) => (
              <FormControl fullWidth required className="md:w-1/3">
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
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth required className="md:w-1/3 md:mx-16">
                <FormLabel className="font-medium text-14" component="legend">
                  Regular Price
                </FormLabel>
                <TextField
                  {...field}
                  className="   md:mr-16"
                  type="text"
                  error={!!errors.price}
                  helperText={errors?.price?.message}
                  variant="outlined"
                  required
                  size={"small"}
                  fullWidth
                />
              </FormControl>
            )}
          />
          <Controller
            name="discountedPrice"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth className="md:w-1/3 ">
                <FormLabel className="font-medium text-14" component="legend">
                  Discounted Price
                </FormLabel>
                <TextField
                  {...field}
                  className="  md:mr-16"
                  type="text"
                  error={!!errors.discountedPrice}
                  helperText={errors?.discountedPrice?.message}
                  variant="outlined"
                  fullWidth
                  size={"small"}
                />
              </FormControl>
            )}
          />
        </div>

        {/* <div className='md:flex w-full'>
          <Controller
            name='manageStock'
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.manageStock}>
                <FormControlLabel
                  label='Manage Stocks'
                  control={<Checkbox size='small' {...field} />}
                />
                <FormHelperText>{errors?.manageStock?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name='stock'
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  className=' md:w-1/3 md:mr-16 mb-16 md:mb-0'
                  label='Stock Quantity'
                  type='text'
                  error={!!errors.stock}
                  helperText={errors?.stock?.message}
                  variant='outlined'
                  required
                  fullWidth
                />
              </>
            )}
          />
        </div> */}

        {/* <Typography className='text-16 font-semibold'>Others</Typography>
        <div className='w-full md:flex my-24'>
          <Controller
            name='othersTitle'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth className='md:mr-16'>
                <FormLabel className='font-medium text-14' component='legend'>
                  Title
                </FormLabel>
                <TextField
                  {...field}
                  className=''
                  label='E.g Weight'
                  type='text'
                  error={!!errors.othersTitle}
                  helperText={errors?.othersTitle?.message}
                  variant='outlined'
                  fullWidth
                />
              </FormControl>
            )}
          />
          <Controller
            name='othersDescription'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth className='md:mr-16'>
                <FormLabel className='font-medium text-14' component='legend'>
                  Description
                </FormLabel>
                <TextField
                  {...field}
                  className=''
                  label='E.g 5kg'
                  type='text'
                  error={!!errors.othersDescription}
                  helperText={errors?.othersDescription?.message}
                  variant='outlined'
                  fullWidth
                />
              </FormControl>
            )}
          />
        </div> */}

        <Button
          variant="contained"
          color="secondary"
          className="w-full mt-24"
          aria-label="add"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          type="submit"
          size="large">
          Add Product
        </Button>
      </form>
    </div>
  );
}
