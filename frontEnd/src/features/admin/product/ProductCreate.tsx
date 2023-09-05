import {
  Form,
  Input,
  Button,
  FormRow,
  Heading,
  FormBox,
  InputFile,
  FromHeading,
  FormRowContent,
  ProductFilterOptionSelect,
  ProductOptions,
  SelectMulti,
  SelectMultiV2,
} from "@/components";
import JoditEditor from "jodit-react";
import UseProductApi from "./UseProductApi";
import FormHeading from "@/components/FormHeading";
import Select, { SingleValue } from "react-select";
import UseProductCategoryApi from "../productCategory/UseProductCategoryApi";
import IOptionSelect from "@/helpers/ISelectOption";
import { useMoveBack } from "@/hooks";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { IBrand, IDemand, IProduct } from "@/interfaces";
import { IFilterOption, IProductOption } from "@/helpers";
import { randomKey } from "@/utils";
import { DefaultOptionType } from "antd/es/select";

const initializeProductOption: Array<IProductOption> = [
  {
    id: randomKey(),
    product_optionName: "",
    product_serials: [
      {
        id: randomKey(),
        product_serialName: "",
        product_serialImage: "",
        product_priceDifference: 0,
      },
    ],
    product_description: "",
    product_priceDifference: 0,
    product_specification: "",
  },
];

interface IProps {
  productEdit: Partial<IProduct>;
}

export default function ProductCreate({ productEdit }: IProps) {
  const moveBack = useMoveBack();
  const [productOptions, setProductOptions] = useState<Array<IProductOption>>(
    initializeProductOption
  );
  let demandIds: Array<string> | undefined;
  let demandNames: Array<string> | undefined;
  if (productEdit) {
    demandIds = (productEdit?.product_demands as Array<IDemand>)?.map(
      (demand) => demand._id
    );
    demandNames = (productEdit?.product_demands as Array<IDemand>)?.map(
      (demand) => demand.demand_name
    );
  }
  const [selectDemands, setSelectDemands] = useState<Array<string>>(
    demandIds || []
  );
  const [productPromotion, setProductPromotion] = useState<string>("");
  const [selectBrand, setSelectBrand] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(null);
  const [selectCategory, setSelectCategory] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(null);
  const { isCreatingProduct, createProduct } = UseProductApi.createProduct();
  const { handleSubmit, formState, register, getValues } = useForm<IProduct>();
  const { errors: errorsForm } = formState;
  const { metadata: categories, isGettingProductCategories } =
    UseProductCategoryApi.getAllCategories(10e9);
  const { metadata: category, isGettingProductCategory } =
    UseProductCategoryApi.getCategoryById(selectCategory?.value || "");

  const [choseFilterOptions, setChoseFilterOptions] = useState<
    Array<IFilterOption>
  >([]);
  const [filtersOptions, setFiltersOptions] = useState<Array<IFilterOption>>(
    []
  );

  const optionsCategory: Array<IOptionSelect> | undefined = useMemo(() => {
    return categories?.productCategories?.map((cate) => {
      return {
        value: cate._id,
        label: cate.productCategory_name,
      };
    });
  }, [isGettingProductCategories]);

  const optionsBrands: Array<IOptionSelect> | undefined = useMemo(() => {
    const filtersOption =
      category?.productCategory_filtersOptions &&
      JSON.parse(category?.productCategory_filtersOptions);
    setFiltersOptions(filtersOption);
    if (isGettingProductCategory) return;
    return (category?.productCategory_brands as Array<IBrand>)?.map((brand) => {
      return {
        value: brand._id,
        label: brand.brand_name,
      };
    });
  }, [selectCategory, isGettingProductCategory]);

  const optionsDemands: Array<DefaultOptionType> | undefined = useMemo(() => {
    if (isGettingProductCategory) return;
    return (category?.productCategory_demands as Array<IDemand>)?.map(
      (demand) => {
        return {
          label: demand.demand_name,
          value: demand.demand_name,
          image: demand.demand_image,
        };
      }
    );
  }, [selectCategory, isGettingProductCategory]);

  const handlerSelectCategory = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectCategory(option);
  };
  const handlerSelectBrand = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectBrand(option);
  };
  const handlerSelectMultiDemands = (demands: Array<string>) => {
    const demandsSelected = (
      category?.productCategory_demands as Array<IDemand>
    )
      .filter((demand) => demands.includes(demand.demand_name))
      .map((demand) => demand._id);
    setSelectDemands(demandsSelected);
  };

  const onSubmit = (dataForm: Partial<IProduct>) => {
    if (!selectBrand?.value) return toast.error("Please provide brand");
    if (!selectCategory?.value) return toast.error("Please provide category");
    const dataCreate: Partial<IProduct> = {
      product_name: dataForm["product_name"],
      product_brand: selectBrand?.value || "",
      product_category: selectCategory?.value || "",
      product_thumb: dataForm["product_thumb"],
      product_demands: selectDemands,
      product_imagesProduct: dataForm["product_imagesProduct"],
      product_imagesHighlights: dataForm["product_imagesHighlights"],
      product_price: dataForm["product_price"],
      product_options: productOptions,
      product_optionFilters: choseFilterOptions,
    };
    console.log(dataCreate);

    // createProduct(dataCreate, { onSuccess: () => moveBack() });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FromHeading>
        <Heading $as="h2">Product Form</Heading>
      </FromHeading>
      <FormBox>
        <FormRow label="Product Name" error={errorsForm["product_name"]}>
          <Input
            type="text"
            id="productName"
            {...register("product_name", {
              required: "Please provide product name",
            })}
          />
        </FormRow>
        <FormRow
          label="Product Category"
          error={!selectCategory && "Please provide product category"}
        >
          <Select
            id="productCategory"
            placeholder={"Select an category"}
            value={selectCategory}
            onChange={handlerSelectCategory}
            options={optionsCategory}
          />
        </FormRow>
        <FormRow
          label="Product Brand"
          error={!selectBrand && "Please provide product brand"}
        >
          <Select
            id="productBrand"
            placeholder={"Select an brand"}
            value={selectBrand}
            onChange={handlerSelectBrand}
            options={optionsBrands}
          />
        </FormRow>
        <FormRow label="Product Demand">
          <SelectMultiV2
            id="productDemands"
            placeholder="Select demands"
            options={optionsDemands}
            onChange={handlerSelectMultiDemands}
            defaultValues={demandNames}
          />
        </FormRow>
        <FormRow label="Product Price" error={errorsForm["product_price"]}>
          <Input
            type="number"
            id="productPrice"
            placeholder={"Enter product price"}
            {...register("product_price", {
              required: "Please provide product price",
              min: {
                message: "Please enter price getter than equal 10000",
                value: 10000,
              },
            })}
          />
        </FormRow>
        <FormRow label="Product Thumb" error={errorsForm.product_thumb}>
          <InputFile
            accept="image/*"
            id="productThumb"
            {...register("product_thumb", {
              required: "Please provide product thumb",
            })}
          />
        </FormRow>
        <FormRow
          label="Product Images"
          error={errorsForm.product_imagesProduct}
        >
          <InputFile
            multiple
            accept="image/*"
            id="productImages"
            {...register("product_imagesProduct", {
              required: "Please provide product images",
            })}
          />
        </FormRow>
        <FormRow
          label="Product ImagesHighLights"
          error={errorsForm.product_imagesHighlights}
        >
          <InputFile
            multiple
            accept="image/*"
            id="productImagesInfo"
            {...register("product_imagesHighlights", {
              required: "Please provide product images information",
            })}
          />
        </FormRow>
        <FormRowContent label="Product Promotion">
          <JoditEditor
            value={productPromotion}
            onChange={(promotion) => setProductPromotion(promotion)}
          />
        </FormRowContent>
        <div className="mb-5">
          <FormHeading>
            <Heading $as="h4">Filters Options (Using for filter)</Heading>
          </FormHeading>
          <FormBox>
            <ProductFilterOptionSelect
              filtersOptions={filtersOptions}
              choseFilterOptions={choseFilterOptions}
              setChoseFilterOptions={setChoseFilterOptions}
            />
          </FormBox>
        </div>
        <>
          <FormHeading>
            <Heading $as="h4">Product Options</Heading>
          </FormHeading>
          <FormBox>
            <ProductOptions
              productOptions={productOptions}
              setProductOptions={setProductOptions}
            />
          </FormBox>
        </>
        <FormRow>
          <Button type="reset" $variation="secondary" onClick={moveBack}>
            Back
          </Button>
          <Button disabled={isCreatingProduct} type="submit">
            {isCreatingProduct ? "Creating...." : "Create New Product"}
          </Button>
        </FormRow>
      </FormBox>
    </Form>
  );
}
