import { useToast } from "@/components/ui/toast";
import CommonToast from "@/components/CommonToast";

const useCommonToast = () => {
  const toast = useToast();
  const showCommonToast = (
    description: string,
    action: "success" | "error" | "warning" | "info" = "info"
  ) => {
    toast.show({
      id: Date.now().toString(),
      placement: "bottom",
      duration: 3000,
      render: ({ id }) => (
        // @ts-ignore
        <CommonToast id={id} description={description} action={action} />
      ),
    });
  };
  return showCommonToast;
};

export default useCommonToast;
