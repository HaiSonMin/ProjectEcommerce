import { DatePicker } from "antd";
import { StringGradients } from "antd/es/progress/progress";
import { fi } from "date-fns/locale";
import dayjs from "dayjs";
import { Control, Controller } from "react-hook-form";

interface IProps {
  id: string;
  name: string;
  rules: string;
  control: Control<any>;
  placeholder: string;
  validate?: any;
}

export default function SelectDate(props: IProps) {
  return (
    <Controller
      rules={{ required: props.rules, validate: props.validate }}
      control={props.control}
      name={props.name}
      render={({ field, fieldState }) => {
        return (
          <DatePicker
            showTime={{ format: "dddd, MMMM D, YYYY h:mm A" }}
            id={props.id}
            // onBlur={field.onBlur}
            placeholder={props.placeholder}
            status={fieldState.error ? "error" : undefined}
            value={field.value ? dayjs(field.value) : undefined}
            onChange={(date) => {
              field.onChange(date?.valueOf() || null);
            }}
            className="py-3 border-gray-500 text-zinc-500 font-medium"
          />
        );
      }}
    />
  );
}
