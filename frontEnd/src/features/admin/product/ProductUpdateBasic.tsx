import UseProductApi from "./UseProductApi";
import Select, { GroupBase, SingleValue } from "react-select";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { CONSTANT } from "../../../utils";
import { useMoveBack } from "../../../hooks";
import IProductType, {
  IProductUpdateBasicType,
} from "featureTypes/IProductType";
import {
  Button,
  Form,
  FormRow,
  Heading,
  Image,
  ImagesGroup,
  Input,
  InputFile,
} from "../../../components";
import { UseBrandApi } from "../brand";
import UseProductCategoryApi from "../productCategory/UseProductCategoryApi";
import { toast } from "react-hot-toast";

interface IProps {
  product: IProductType;
}

type OptionSelectType = {
  value: string;
  label: string;
};

export default function ProductUpdateBasic(props: IProps) {
  const moveBack = useMoveBack();

  const { isUpdatingProduct, updateProductBasic } =
    UseProductApi.updateProductBasic();

  const brandId: Pick<OptionSelectType, "value"> = {
    value: props.product.product_brand?.["_id"],
  };
  const categoryId: Pick<OptionSelectType, "value"> = {
    value: props.product.product_category?.["_id"],
  };

  const [selectBrandId, setSelectBrandId] =
    useState<Pick<OptionSelectType, "value">>(brandId);
  const [selectProductCategoryId, setSelectProductCategoryId] =
    useState<Pick<OptionSelectType, "value">>(categoryId);

  const [imagesProduct, setImagesProduct] = useState<Array<string>>(
    props?.product.product_images || []
  );

  const { metadata: brandInfo } = UseBrandApi.getAllBrand();
  const optionsBrands: Array<OptionSelectType> = brandInfo?.brands.map(
    (brand) => {
      return {
        value: brand._id,
        label: brand.brand_name,
      };
    }
  );
  const { metadata: categoryInfo } = UseProductCategoryApi.useGetAllCategory();
  const optionsCategory: Array<OptionSelectType> =
    categoryInfo?.productCategories.map((cate) => {
      return {
        value: cate._id,
        label: cate.productCategory_name,
      };
    });

  const { register, handleSubmit, formState } = useForm({
    defaultValues: props.product || {},
  });

  const { errors: errorsForm } = formState;

  const originalNumberImage = useMemo<number>(() => imagesProduct.length, []);

  const handlerAddImagesDelete = (imgDelete: string) => {
    if (imagesProduct.length > 1)
      setImagesProduct((imgs) =>
        imgs.filter((img: string) => img !== imgDelete)
      );
    else toast.error("Images not empty");
  };

  const onSubmit = (dataFormUpdate: any) => {
    // console.log(dataImages["product_images"]);
    const isImgsProductDelete =
      originalNumberImage !== imagesProduct.length ? true : false;
    const productUpdate: IProductUpdateBasicType = {
      _id: props.product?._id,
      product_name: dataFormUpdate["product_name"],
      product_brand: selectBrandId.value, // Brand Id
      product_category: selectProductCategoryId.value, // Category Id
      product_thumb: dataFormUpdate["product_thumb"],
      product_images: isImgsProductDelete
        ? imagesProduct
        : dataFormUpdate["product_images"],
    };
    console.log("productUpdateL:::", productUpdate);
    updateProductBasic(productUpdate, { onSuccess: () => moveBack() });
  };

  const handleChangeBrand = (
    option: SingleValue<Pick<OptionSelectType, "value">>
  ) => {
    setSelectBrandId(option);
  };

  const handlerChangeCategory = (
    option: SingleValue<Pick<OptionSelectType, "value">>
  ) => {
    setSelectProductCategoryId(option);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading $as="h2">Product Name: {props.product?.product_name}</Heading>

      <FormRow label="Product name" error={errorsForm.product_name}>
        <Input
          type="text"
          {...register("product_name", {
            required: "Please provide product name",
          })}
        />
      </FormRow>
      <FormRow label="Product brand">
        <Select
          id="productBrand"
          placeholder={"Select an RAM"}
          value={selectBrandId}
          onChange={handleChangeBrand}
          options={optionsBrands}
        />
      </FormRow>
      <FormRow label="Product category">
        <Select
          id="productCategory"
          placeholder={"Select an option"}
          value={selectProductCategoryId}
          onChange={handlerChangeCategory}
          options={optionsCategory}
        />
      </FormRow>
      <FormRow
        label="Product thumb"
        images={
          <Image
            image={props.product?.product_thumb}
            altTitle="Product thumb"
          />
        }
      >
        <InputFile
          id="productThumb"
          accept="image/*"
          name="product_thumb"
          {...register("product_thumb")}
        />
      </FormRow>
      <FormRow
        label="Chose add images"
        images={
          <ImagesGroup
            onClick={handlerAddImagesDelete}
            images={imagesProduct}
            altTitle={`Product ${props.product?.product_name}`}
          />
        }
      >
        <InputFile
          disabled={originalNumberImage !== imagesProduct.length}
          multiple
          maxLength={CONSTANT.MAX_UPLOAD_IMAGE}
          accept="image/*"
          name="product_images"
          id="productImages"
          {...register("product_images")}
        />
      </FormRow>

      <FormRow>
        <Button type="reset" $variation="secondary" onClick={moveBack}>
          Back
        </Button>
        <Button disabled={isUpdatingProduct}>
          {isUpdatingProduct ? "Updating...." : "Update"}
        </Button>
      </FormRow>
    </Form>
  );
}
