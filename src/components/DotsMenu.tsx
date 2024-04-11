import colors from "@/src/constants/colors";
import { IconDots } from "@tabler/icons-react-native";
import { TouchableOpacity } from "react-native";
import Icon from "./Icon";

type Option = {
  label: string;
  color: string;
  action: () => void;
};

// TODO: implement the options with a native dropdown

export default function DotsMenu({ options }: { options: Option[] }) {
  return (
    <TouchableOpacity>
      <Icon icon={IconDots} />
    </TouchableOpacity>
  );
}
