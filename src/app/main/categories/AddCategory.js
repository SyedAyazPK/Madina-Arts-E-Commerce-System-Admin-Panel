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
  addCategory,
  getCategories,
  selectCategories,
  uploadImage,
} from "app/store/categorySlice";
import { useState } from "react";

const defaultValues = {
  categoryName: "",
  categoryDescription: "",
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  categoryName: yup.string().required("You must enter a value"),
  // categoryDescription: yup.string().min(20, "Must be atleat 20 characters"),
});

function AddCategory() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(schema),
  });
  const [catImage, setCatImage] = useState();

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const data = watch();

  return (
    <div className="flex w-full">
      <form
        className="w-full"
        onSubmit={handleSubmit((_data) =>
          dispatch(addCategory({ ..._data, image: catImage }))
            .then(() => dispatch(getCategories()))
            .then(() => {
              reset(defaultValues);
              setCatImage();
            })
        )}
      >
        <div className="md:flex w-full justify-between mb-16">
          <div className="w-full flex mr-16">
            <Controller
              render={({ field }) => (
                <FormControl required fullWidth>
                  <FormLabel className="font-medium text-14" component="legend">
                    Category Name
                  </FormLabel>
                  <TextField
                    {...field}
                    // label='Category Name'
                    variant="outlined"
                    error={!!errors.categoryName}
                    helperText={errors?.categoryName?.message}
                    required
                    fullWidth
                    size={"small"}
                  />
                </FormControl>
              )}
              name="categoryName"
              control={control}
            />
          </div>
          <div className="flex w-full">
            <Controller
              render={({ field }) => (
                <FormControl fullWidth>
                  <FormLabel className="font-medium text-14" component="legend">
                    Parent
                  </FormLabel>

                  <Select
                    {...field}
                    variant="outlined"
                    fullWidth
                    size={"small"}
                  >
                    {categories?.result?.map((category) => (
                      <MenuItem value={category._id}>{category.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              name="parentId"
              control={control}
            />
          </div>
        </div>
        <div className="md:flex w-full justify-between items-center">
          <div className="w-full flex mr-16">
            <Controller
              render={({ field }) => (
                <FormControl fullWidth>
                  <FormLabel className="font-medium text-14" component="legend">
                    Description
                  </FormLabel>
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    error={!!errors.categoryDescription}
                    helperText={errors?.categoryDescription?.message}
                    size={"small"}
                  />
                </FormControl>
              )}
              name="categoryDescription"
              control={control}
            />
          </div>
          <div className="flex flex-col w-full  ">
            <div className="">
              <Controller
                render={({ field }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      className="font-medium text-14"
                      component="legend"
                    >
                      Upload Image
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      type={"file"}
                      size={"small"}
                      accept="image/*"
                      onChange={(e) =>
                        dispatch(uploadImage(e.target.files[0])).then(
                          (response) => setCatImage(response.payload.data)
                        )
                      }
                    />
                  </FormControl>
                )}
                name="categoryImage"
                control={control}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full my-16 items-center">
          <Button
            className="mx-8 my-16"
            variant="contained"
            color="secondary"
            type="submit"
            disabled={_.isEmpty(dirtyFields) || !isValid}
            size="large"
            style={{ borderRadius: "5px" }}
          >
            Add Category
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddCategory;
