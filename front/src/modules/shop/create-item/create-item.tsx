import { ChangeEvent, FC, useRef, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
// import Input from "src/ui-kit/input/input";
import { ICreateItemSchema } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { createItemSchema } from "./schema";
import { enGb } from "src/core/constants/constants";
import SubmitButton from "src/ui-kit/submit-button/submit-button";
import { TextField } from "@mui/material";
import classes from "./create-item.module.scss";

const CreateItem: FC = () => {
  const [fileNames, setFileNames] = useState<any[]>([]);
  let ref = useRef<HTMLInputElement>(null);
  console.log(fileNames);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateItemSchema>({
    resolver: yupResolver(createItemSchema),
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }
    const files = Object.entries(e.target.files).map((entry) => entry[1]);
    console.log(files);
    setFileNames((prev) => {
      if (!prev.length) {
        return [...files];
      }
      const res = [...prev];

      const names = prev.map((obj) => obj.name);
      files.forEach((file) => {
        if (!names.includes(file.name)) {
          res.push(file);
        }
      });

      return res;
    });
    e.target.value = null as unknown as any;
  };

  const onClickHandler = (fileName: string) => {
    setFileNames(fileNames.filter((file) => file.name !== fileName));
  };

  const submitHandler: SubmitHandler<ICreateItemSchema> = (data) => {
    // const formData = new FormData();
    // if (data.image?.length) {
    //   const entries = Object.entries(data.image);
    //   entries.forEach((entry) => formData.append(entry[1].name, entry[1]));
    // }
    // formData.forEach((item) => console.log(item));
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => <TextField label={enGb.TITLE} {...field} />}
          />
          {errors && errors.title?.message}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField {...field} label={enGb.DESCRIPTION} />
            )}
          />
          {errors && errors.description?.message}

          <Controller
            name="price"
            control={control}
            render={({ field }) => <TextField {...field} label={enGb.PRICE} />}
          />
          {errors && errors.price?.message}

          <input ref={ref} onChange={handleInputChange} multiple type="file" />
          <div>
            {fileNames.map((fileName, index) => (
              <p
                key={fileName.name}
                onClick={() => onClickHandler(fileName.name)}
              >
                {fileName.name}
              </p>
            ))}
          </div>
        </div>

        {/* <TextField label={enGb.TITLE} name="title" />
        <Input
          type="file"
          label={enGb.IMAGE}
          name="image"
          register={register}
        />
        <Input label={enGb.TITLE} name="title" register={register} />
        <Input
          label={enGb.DESCRIPTION}
          name="description"
          register={register}
        />
        <Input label={enGb.PRICE} name="price" register={register} /> */}
        <SubmitButton
          disabled={false}
          onClick={handleSubmit(submitHandler)}
          text={enGb.CREATE_ITEM}
        />
      </form>
    </div>
  );
};

export default CreateItem;
