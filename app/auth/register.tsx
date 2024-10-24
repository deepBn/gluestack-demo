import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { FormControl } from "@/components/ui/form-control";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Link, LinkText } from "@/components/ui/link";
import { router } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import FormField from "@/components/FormField";

type FormValues = {
  email: string;
  password: string;
};

const Register = () => {
  const methods = useForm<FormValues>();
  const handleFormSubmit = (formValues: FormValues) => {
    console.log(formValues);
  };

  return (
    <FormProvider {...methods}>
      <Box className="justify-center items-center h-full w-full p-6">
        <Heading className="text-typography-900" size="xl">
          Register
        </Heading>
        <FormControl
          isInvalid={!!Object.keys(methods.formState.errors).length}
          size="lg"
          isDisabled={false}
          isReadOnly={false}
          isRequired={false}
          className="w-full"
        >
          <VStack className="w-full rounded-md mt-2">
            <FormField name="email" label="Email" />
            <FormField
              name="password"
              label="Password"
              fieldType="password"
              helperText="Atleast 6 characters are required."
            />

            <Button
              className="w-full mt-4"
              size="md"
              onPress={methods.handleSubmit(handleFormSubmit)}
            >
              <ButtonSpinner className="mr-2" />
              <ButtonText>Submit</ButtonText>
            </Button>
            <Link onPress={() => router.replace("/auth/signin")}>
              <LinkText className="text-center mt-4 text-md">
                Go to login
              </LinkText>
            </Link>
          </VStack>
        </FormControl>
      </Box>
    </FormProvider>
  );
};

export default Register;
