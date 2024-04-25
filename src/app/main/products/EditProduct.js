import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import clsx from "clsx";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEditProductDialog,
  getProducts,
  selectEditProductDialogState,
  updateProduct,
} from "app/store/productSlice";
import {
  Autocomplete,
  Avatar,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControlLabel,
} from "@mui/material";
import {
  selectCategories,
  uploadImage,
  getCategories,
} from "app/store/categorySlice";
import { getBrands, selectBrands } from "app/store/brandSlice";
import { useState, useEffect } from "react";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  productSku: yup.string().required("You must enter productSku"),
  title: yup.string().required("You must enter product title"),
  description: yup.string().min(20, "Must be atleat 20 characters"),
  shortDescription: yup
    .string()
    .required("You must enter short description")
    .min(20, "Must be atleat 20 characters"),
  price: yup.number().required("You must enter price"),
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

function EditProduct({ dataObject }) {
  const dispatch = useDispatch();
  //   const dataObject = useSelector(selectEditProductDialogData);
  const open = useSelector(selectEditProductDialogState);
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues: {
      ...dataObject,
      brand: dataObject?.brand?.[0]?._id,
      category: dataObject?.category?.[0]?._id,
    },
    mode: "all",
    resolver: yupResolver(schema),
  });
  const [productImage, setProductImage] = useState(
    dataObject?.images ? dataObject?.images[0] : null
  );

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const data = watch();

  const handleClose = () => {
    dispatch(closeEditProductDialog());
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, []);

  return (
    <div className="flex w-full">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogContent className="w-full">
          <DialogContentText id="alert-dialog-description" color="text.primary">
            <form
              className="w-full"
              onSubmit={handleSubmit((_data) =>
                dispatch(updateProduct({ ..._data, images: [productImage] }))
                  .then(() => dispatch(getProducts()))
                  .then(() => handleClose())
              )}
            >
              <Controller
                name="productSku"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      className=" md:w-1/3"
                      label="productSku"
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
                        size={"small"}
                        type="text"
                        error={!!errors.title}
                        helperText={errors?.title?.message}
                        variant="outlined"
                        required
                        fullWidth
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
                        size={"small"}
                        type="text"
                        error={!!errors.description}
                        helperText={errors?.description?.message}
                        variant="outlined"
                        fullWidth
                      />
                    </>
                  )}
                />
              </div>
              <div className="w-full md:flex mb-24">
                <Controller
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <FormLabel
                        className="font-medium text-14"
                        component="legend"
                      >
                        Upload Image
                      </FormLabel>
                      <Avatar src={productImage} />
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        type={"file"}
                        size={"small"}
                        accept="image/*"
                        onChange={(e) =>
                          dispatch(uploadImage(e.target.files[0])).then(
                            (resp) => setProductImage(resp.payload.data)
                          )
                        }
                      />
                    </FormControl>
                  )}
                  name="img"
                  control={control}
                />
              </div>
              <Controller
                name="shortDescription"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth className="md:mb-16">
                    <FormLabel
                      className="font-medium text-14"
                      component="legend"
                    >
                      Short Description
                    </FormLabel>
                    <TextField
                      {...field}
                      className="  "
                      size={"small"}
                      type="text"
                      error={!!errors.description}
                      helperText={errors?.description?.message}
                      variant="outlined"
                      fullWidth
                    />
                  </FormControl>
                )}
              />
              <div className="md:flex w-full justify-between mb-16">
                <Controller
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      required
                      className="md:w-1/2 md:mr-8"
                    >
                      <FormLabel
                        className="font-medium text-14"
                        component="legend"
                      >
                        Brand
                      </FormLabel>
                      <Select
                        {...field}
                        variant="outlined"
                        fullWidth
                        size={"small"}
                      >
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
                    <FormControl fullWidth required className="md:w-1/2">
                      <FormLabel
                        className="font-medium text-14"
                        component="legend"
                      >
                        Category
                      </FormLabel>
                      <Select
                        {...field}
                        variant="outlined"
                        fullWidth
                        size={"small"}
                      >
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
              <div className="w-full md:flex mb-24">
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      required
                      className="md:w-1/3 md:mr-16"
                    >
                      <FormLabel
                        className="font-medium text-14"
                        component="legend"
                      >
                        Regular Price
                      </FormLabel>
                      <TextField
                        {...field}
                        className="   md:mr-16"
                        size={"small"}
                        type="text"
                        error={!!errors.price}
                        helperText={errors?.price?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    </FormControl>
                  )}
                />
                <Controller
                  name="discountedPrice"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth className="md:w-1/3 md:mx-16">
                      <FormLabel
                        className="font-medium text-14"
                        component="legend"
                      >
                        Discounted Price
                      </FormLabel>
                      <TextField
                        {...field}
                        className="  md:mr-16"
                        size={"small"}
                        type="text"
                        error={!!errors.discountedPrice}
                        helperText={errors?.discountedPrice?.message}
                        variant="outlined"
                        fullWidth
                      />
                    </FormControl>
                  )}
                />
              </div>

              <div className="md:flex w-full">
                <Controller
                  name="stock"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        className=" md:w-1/3 md:mr-16 mb-16 md:mb-0"
                        label="Stock Quantity"
                        size={"small"}
                        type="text"
                        error={!!errors.stock}
                        helperText={errors?.stock?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    </>
                  )}
                />
              </div>

              <Button
                variant="contained"
                color="secondary"
                className="w-full mt-24"
                aria-label="add"
                disabled={!isValid}
                type="submit"
                size="large"
              >
                Save Product
              </Button>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditProduct;
