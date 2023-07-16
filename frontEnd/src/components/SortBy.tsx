/* eslint-disable react/prop-types */
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

interface Props {
  options: Array<{ value: string; label: string }>;
}

export default function SortBy(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortBy: string = searchParams.get("sort") || "ctime";
  const handlerChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      onChange={handlerChangeOption}
      options={props.options}
      value={currentSortBy}
    />
  );
}
