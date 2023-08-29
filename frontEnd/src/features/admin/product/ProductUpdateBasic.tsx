import UseProductApi from "./UseProductApi";
import Select, { GroupBase, SingleValue } from "react-select";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useMoveBack } from "@/hooks";
import {
  Button,
  Form,
  FormRow,
  Heading,
  Image,
  ImagesGroup,
  Input,
  InputFile,
} from "@/components";
import UseProductCategoryApi from "../productCategory/UseProductCategoryApi";
import { toast } from "react-hot-toast";
import IOptionSelect from "@/helpers/ISelectOption";
import IProduct from "@/interfaces/product/product.interface";
import CONSTANT from "@/constant/value-constant";
import UseBrandApi from "../brand/UseBrandApi";

interface IProps {
  product?: IProduct;
}

export default function ProductUpdateBasic(props: IProps) {
  const moveBack = useMoveBack();

  const { isUpdatingProduct, updateProductBasic } =
    UseProductApi.updateProductBasic();

  const brandId: Pick<IOptionSelect, "value"> = {
    value: props.product?.product_brand["_id"],
  };
  const categoryId: Pick<IOptionSelect, "value"> = {
    value: props.product?.product_category["_id"],
  };

  const [selectBrandId, setSelectBrandId] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(brandId);
  const [selectProductCategoryId, setSelectProductCategoryId] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(categoryId);

  const [imagesProduct, setImagesProduct] = useState<Array<string>>(
    props?.product?.product_imagesProduct || []
  );
  const originalNumberImage = useMemo<number>(() => imagesProduct.length, []);

  const [imagesInfoProduct, setImagesInfoProduct] = useState<Array<string>>(
    props?.product?.product_imagesAttribute || []
  );
  const originalNumberImageInfo = useMemo<number>(
    () => imagesInfoProduct.length,
    []
  );

  const { metadata: brandInfo } = UseBrandApi.getAllBrand();
  const optionsBrands: Array<IOptionSelect> | undefined = brandInfo?.brands.map(
    (brand) => {
      return {
        value: brand._id,
        label: brand.brand_name,
      };
    }
  );
  const { metadata: categoryInfo } = UseProductCategoryApi.getAllCategories();
  const optionsCategory: Array<IOptionSelect> | undefined =
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

  const handlerAddImagesDelete = (imgDelete: string) => {
    if (imagesProduct.length > 1)
      setImagesProduct((imgs) =>
        imgs.filter((img: string) => img !== imgDelete)
      );
    else toast.error("Images not empty");
  };

  const handlerAddImagesInfoDelete = (imgDelete: string) => {
    if (imagesInfoProduct.length > 1)
      setImagesInfoProduct((imgs) =>
        imgs.filter((img: string) => img !== imgDelete)
      );
    else toast.error("Images not empty");
  };

  const onSubmit = (dataFormUpdate: any) => {
    // console.log(dataImages["product_images"]);
    const isImgsDelete =
      originalNumberImage !== imagesProduct.length ? true : false;
    const isImgsInfoDelete =
      originalNumberImageInfo !== imagesInfoProduct.length ? true : false;
    const productUpdate: Partial<IProduct> = {
      _id: props.product?._id,
      product_name: dataFormUpdate["product_name"],
      product_brand: selectBrandId?.value || "", // Brand Id
      product_category: selectProductCategoryId?.value || "", // Category Id
      product_thumb: dataFormUpdate["product_thumb"],
      product_imagesProduct: isImgsDelete
        ? imagesProduct
        : dataFormUpdate["product_images"],
      product_imagesAttribute: isImgsInfoDelete
        ? imagesInfoProduct
        : dataFormUpdate["product_imagesInfo"],
    };
    updateProductBasic(productUpdate, { onSuccess: () => moveBack() });
  };

  const handleChangeBrand = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectBrandId(option);
  };

  const handlerChangeCategory = (
    option: SingleValue<Pick<IOptionSelect, "value">>
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
          id="productImages"
          {...register("product_imagesProduct")}
        />
      </FormRow>
      <FormRow
        label="Chose add images info"
        images={
          <ImagesGroup
            onClick={handlerAddImagesInfoDelete}
            images={imagesInfoProduct}
            altTitle={`Product ${props.product?.product_name}`}
          />
        }
      >
        <InputFile
          disabled={originalNumberImageInfo !== imagesInfoProduct.length}
          multiple
          maxLength={CONSTANT.MAX_UPLOAD_IMAGE}
          accept="image/*"
          id="productImagesInfo"
          {...register("product_imagesAttribute")}
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
