import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { FormControl } from "@/components/ui/form-control";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Link, LinkText } from "@/components/ui/link";
import { router } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import FormField from "@/components/FormField";
import { accountAtom } from "@/atoms/appwrite";
import { useAtomValue } from "jotai";
import { ID } from "react-native-appwrite";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";
import CommonToast from "@/components/CommonToast";

type FormValues = {
  email: string;
  password: string;
  name: string;
};

const Register = () => {
  const account = useAtomValue(accountAtom);
  const toast = useToast();
  const methods = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (formValues: FormValues) => {
    setLoading(true);
    try {
      await account.create(
        ID.unique(),
        formValues.email,
        formValues.password,
        formValues.name
      );
      router.replace("/auth/signin");
      // @ts-ignore
      toast.show({
        placement: "bottom",
        duration: 3000,
        render: ({ id }) => (
          // @ts-ignore
          <CommonToast
            id={id}
            description="Account created successfully. Please login to continue."
            action="success"
          />
        ),
      });
    } catch (error) {
      // @ts-ignore
      toast.show({
        placement: "bottom",
        duration: 3000,
        render: ({ id }) => (
          // @ts-ignore
          <CommonToast id={id} description={error.message} action="error" />
        ),
      });
    }
    setLoading(false);
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
          isDisabled={loading}
          isReadOnly={false}
          isRequired={false}
          className="w-full"
        >
          <VStack className="w-full rounded-md mt-2">
            <FormField name="name" label="Name" />
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
              {loading && <ButtonSpinner className="mr-2" />}
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
