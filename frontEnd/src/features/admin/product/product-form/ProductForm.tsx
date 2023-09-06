import {
  Form,
  Input,
  Button,
  FormRow,
  Heading,
  FormBox,
  InputFile,
  FromHeading,
  SelectMultiV2,
} from "@/components";
import UseProductApi from "../UseProductApi";
import FormHeading from "@/components/FormHeading";
import Select, { SingleValue } from "react-select";
import UseProductCategoryApi from "../../productCategory/UseProductCategoryApi";
import IOptionSelect from "@/helpers/ISelectOption";
import { useMoveBack } from "@/hooks";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { randomKey } from "@/utils";
import { DefaultOptionType } from "antd/es/select";
import { useMemo, useState, useEffect } from "react";
import { IBrand, IDemand, IProduct } from "@/interfaces";
import { IFilterOption, IProductOption } from "@/helpers";
import {
  ProductOptions,
  ProductFilterOptionSelect,
} from "./element-product-form";

const initializeProductOption: Array<IProductOption> = [
  {
    id: randomKey(),
    product_optionName: "",
    product_description: "",
    product_priceDifference: 0,
    product_serials: [],
    product_specificationMain: "",
    product_specificationDetail: "",
  },
];

interface IProps {
  productEdit?: Partial<IProduct>;
}

export default function ProductForm({ productEdit }: IProps) {
  const moveBack = useMoveBack();
  const [errorEnter, setErrorEnter] = useState<boolean>(true);
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
  const { handleSubmit, formState, register, getValues, watch } =
    useForm<IProduct>();
  const { errors: errorsForm } = formState;
  const { metadata: categories, isGettingProductCategories } =
    UseProductCategoryApi.getAllCategories(10e9);
  const { metadata: category, isGettingProductCategory } =
    UseProductCategoryApi.getCategoryById(selectCategory?.value || "");

  const [choseFilterOptions, setChoseFilterOptions] = useState<Array<any>>([]);
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
    setChoseFilterOptions([]);
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
  // useEffect(() => {}, [watch("product_price")]);

  const onSubmit = (dataForm: Partial<IProduct>) => {
    if (
      !selectBrand?.value ||
      !selectCategory?.value ||
      productOptions.some((option) => !option.product_optionName) ||
      productOptions.some(
        (option) =>
          option.product_serials?.some((serial) => !serial.product_serialName)
      )
    )
      return toast.error("Vui lòng điền đầy đủ thông tin khi tạo sản phẩm");

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
        <Heading $as="h2">Nhập thông tin sản phẩm</Heading>
      </FromHeading>
      <FormBox>
        <FormRow label="Tên sản phẩm" error={errorsForm["product_name"]}>
          <Input
            placeholder={"Nhập tên sản phẩm"}
            type="text"
            id="productName"
            {...register("product_name", {
              required: "Vui lòng bổ sung tên sản phẩm",
            })}
          />
        </FormRow>
        <FormRow
          label="Danh mục sản phẩm"
          error={!selectCategory && "Vui lòng bổ sung danh mục sản phẩm"}
        >
          <Select
            id="productCategory"
            placeholder={"Vui lòng chọn danh mục"}
            value={selectCategory}
            onChange={handlerSelectCategory}
            options={optionsCategory}
          />
        </FormRow>
        <FormRow
          label="Thương hiệu"
          error={!selectBrand && "Vui lòng bổ sung thương hiệu sản phẩm"}
        >
          <Select
            id="productBrand"
            placeholder={"Vui lòng chọn thương hiệu"}
            value={selectBrand}
            onChange={handlerSelectBrand}
            options={optionsBrands}
          />
        </FormRow>
        <FormRow label="Nhu cầu sử dụng">
          <SelectMultiV2
            id="productDemands"
            placeholder="Chọn nhu cầu sử dụng"
            options={optionsDemands}
            onChange={handlerSelectMultiDemands}
            defaultValues={demandNames}
          />
        </FormRow>
        <FormRow label="Giá" error={errorsForm["product_price"]}>
          <Input
            type="number"
            id="productPrice"
            placeholder={"Vui lòng nhập giá sản phẩm"}
            {...register("product_price", {
              required: "Vui lòng giá danh mục sản phẩm",
              min: {
                message: "Vui lòng nhập giá lớn hơn 10000vnđ",
                value: 10000,
              },
            })}
          />
        </FormRow>
        <FormRow label="Hình ảnh đại diện" error={errorsForm.product_thumb}>
          <InputFile
            accept="image/*"
            id="productThumb"
            {...register("product_thumb", {
              required: "Vui lòng bổ sung hình ảnh đại diện sản phẩm",
            })}
          />
        </FormRow>
        <FormRow
          label="Hình ảnh sản phẩm"
          error={errorsForm.product_imagesProduct}
        >
          <InputFile
            multiple
            accept="image/*"
            id="productImages"
            {...register("product_imagesProduct", {
              required: "Vui lòng bổ sung hình ảnh về sản phẩm",
            })}
          />
        </FormRow>
        <FormRow
          label="Hình ảnh nổi bật"
          error={errorsForm.product_imagesHighlights}
        >
          <InputFile
            multiple
            accept="image/*"
            id="productImagesInfo"
            {...register("product_imagesHighlights", {
              required: "Vui lòng bổ sung hình ảnh nổi bật về sản phẩm",
            })}
          />
        </FormRow>
        {/* <FormRowContent label="Product Promotion">
          <JoditEditor
            value={productPromotion}
            onChange={(promotion) => setProductPromotion(promotion)}
          />
        </FormRowContent> */}
        {filtersOptions?.length && (
          <div className="mb-5">
            <FormHeading>
              <Heading $as="h4">
                Bộ lọc tùy chọn (Sử dụng cho việc lọc sản phẩm)
              </Heading>
            </FormHeading>
            <FormBox>
              <ProductFilterOptionSelect
                filtersOptions={filtersOptions}
                choseFilterOptions={choseFilterOptions}
                setChoseFilterOptions={setChoseFilterOptions}
              />
            </FormBox>
          </div>
        )}
        <>
          <FormHeading>
            <Heading $as="h4">All options of product</Heading>
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
