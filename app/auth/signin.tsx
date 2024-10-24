import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Button, ButtonText } from "@/components/ui/button";
import { InputField, Input } from "@/components/ui/input";
import { useState } from "react";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Heading } from "@/components/ui/heading";
import { Link, LinkText } from "@/components/ui/link";
import { router } from "expo-router";

const Signin = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [inputValue, setInputValue] = useState("12345");
  const handleSubmit = () => {
    if (inputValue.length < 6) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  };

  return (
    <Box className="justify-center items-center h-full w-full p-6">
      <Heading className="text-typography-900" size="xl">
        Login
      </Heading>
      <VStack className="w-full rounded-md mt-2">
        <FormControl
          isInvalid={isInvalid}
          size="lg"
          isDisabled={false}
          isReadOnly={false}
          isRequired={false}
        >
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input className="mt-1 mb-2">
            <InputField
              type="text"
              placeholder="email"
              value={inputValue}
              onChangeText={(val) => setInputValue(val)}
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              Atleast 6 characters are required.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl
          isInvalid={isInvalid}
          size="lg"
          isDisabled={false}
          isReadOnly={false}
          isRequired={false}
        >
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1">
            <InputField
              type="password"
              placeholder="password"
              value={inputValue}
              onChangeText={(val) => setInputValue(val)}
            />
          </Input>
          <FormControlHelper>
            <FormControlHelperText>
              Must be atleast 6 characters.
            </FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              Atleast 6 characters are required.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Button className="w-full mt-4" size="md" onPress={handleSubmit}>
          <ButtonText>Submit</ButtonText>
        </Button>
        <Link onPress={() => router.replace("/auth/register")}>
          <LinkText className="text-center mt-4 text-md">
            Go to registration
          </LinkText>
        </Link>
      </VStack>
    </Box>
  );
};

export default Signin;
