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
import { useDispatch } from "react-redux";
import { addBrand, getBrands } from "app/store/brandSlice";
import { useState } from "react";
import { uploadImage } from "app/store/categorySlice";

const defaultValues = {
  title: "",
  description: "",
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required("You must enter a value"),
  // description: yup.string().min(20, "Must be atleat 20 characters"),
});

function AddBrand() {
  const dispatch = useDispatch();
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const [brandImage, setBrandImage] = useState();

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const data = watch();

  return (
    <div className="flex w-full">
      <form
        className="w-full"
        onSubmit={handleSubmit((_data) =>
          dispatch(addBrand({ ..._data, image: brandImage }))
            .then(() => dispatch(getBrands()))
            .then(() => reset(defaultValues))
        )}
      >
        <div className="md:flex w-full justify-between mb-16">
          <div className="w-full flex mr-16">
            <Controller
              render={({ field }) => (
                <FormControl required fullWidth>
                  <FormLabel className="font-medium text-14" component="legend">
                    Brand Name
                  </FormLabel>
                  <TextField
                    {...field}
                    // label='Brand Name'
                    variant="outlined"
                    error={!!errors.title}
                    helperText={errors?.title?.message}
                    required
                    fullWidth
                    size={"small"}
                  />
                </FormControl>
              )}
              name="title"
              control={control}
            />
          </div>
        </div>
        <div className="md:flex w-full justify-between items-center">
          <div className="w-full flex mr-16">
            <Controller
              render={({ field }) => (
                <FormControl fullWidth required>
                  <FormLabel className="font-medium text-14" component="legend">
                    Description
                  </FormLabel>
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors?.description?.message}
                    size={"small"}
                  />
                </FormControl>
              )}
              name="description"
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
                      size={"small"}
                      fullWidth
                      type={"file"}
                      accept="image/*"
                      onChange={(e) =>
                        dispatch(uploadImage(e.target.files[0])).then((resp) =>
                          setBrandImage(resp.payload.data)
                        )
                      }
                    />
                  </FormControl>
                )}
                name="image"
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
            Add Brand
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddBrand;
