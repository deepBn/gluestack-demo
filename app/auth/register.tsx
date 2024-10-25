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
import useCommonToast from "@/hooks/useCommonToast";

type FormValues = {
  email: string;
  password: string;
  name: string;
};

const Register = () => {
  const account = useAtomValue(accountAtom);
  const showCommonToast = useCommonToast();
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
      showCommonToast(
        "Account created successfully. Please login to continue.",
        "success"
      );
    } catch (error) {
      // @ts-ignore
      showCommonToast(error.message, "error");
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
            <FormField name="name" label="Name" placeholder="John Doe" />
            <FormField name="email" label="Email" placeholder="john@doe.com" />
            <FormField
              name="password"
              label="Password"
              fieldType="password"
              helperText="Atleast 6 characters are required."
              placeholder={"********"}
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
