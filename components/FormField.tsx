import React from "react";
import {
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { AlertCircleIcon } from "@/components/ui/icon";
import { useController, useFormContext } from "react-hook-form";

interface FormFieldProps {
  name: string;
  label: string;
  helperText?: string;
  fieldType?: "text" | "password";
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  helperText,
  fieldType = "text",
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <>
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input className="my-1">
        <InputField
          type={fieldType}
          placeholder="password"
          value={field.value}
          onChangeText={(val) => field.onChange(val)}
        />
      </Input>
      {helperText && (
        <FormControlHelper>
          <FormControlHelperText>{helperText}</FormControlHelperText>
        </FormControlHelper>
      )}
      {fieldState.error && (
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>
            {fieldState.error.message}
          </FormControlErrorText>
        </FormControlError>
      )}
    </>
  );
};

export default FormField;
