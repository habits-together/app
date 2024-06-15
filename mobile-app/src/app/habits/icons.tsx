import {
  IconBarbell,
  IconBook,
  IconBottle,
  IconBrain,
  IconBrush,
  IconBuildingBank,
  IconBuildingChurch,
  IconBulb,
  IconCalendar,
  IconCamera,
  IconChartLine,
  IconClock,
  IconDeviceLaptop,
  IconFlower,
  IconHeart,
  IconHome,
  IconLadder,
  IconLeaf,
  IconMusic,
  IconPeace,
  IconPhotoScan,
  IconUsersGroup,
  IconWallet,
  IconYoga,
  Icon as TablerIcon,
} from "@tabler/icons-react-native";

export function iconStrNameToTablerIcon(iconStrName: string): TablerIcon {
  switch (iconStrName) {
    case "barbell":
      return IconBarbell;
    case "book":
      return IconBook;
    case "bottle":
      return IconBottle;
    case "brain":
      return IconBrain;
    case "brush":
      return IconBrush;
    case "buildingBank":
      return IconBuildingBank;
    case "buildingChurch":
      return IconBuildingChurch;
    case "bulb":
      return IconBulb;
    case "calendar":
      return IconCalendar;
    case "camera":
      return IconCamera;
    case "chartLine":
      return IconChartLine;
    case "clock":
      return IconClock;
    case "deviceLaptop":
      return IconDeviceLaptop;
    case "flower":
      return IconFlower;
    case "heart":
      return IconHeart;
    case "home":
      return IconHome;
    case "ladder":
      return IconLadder;
    case "leaf":
      return IconLeaf;
    case "music":
      return IconMusic;
    case "peace":
      return IconPeace;
    case "photoScan":
      return IconPhotoScan;
    case "usersGroup":
      return IconUsersGroup;
    case "wallet":
      return IconWallet;
    case "yoga":
      return IconYoga;
    default:
      return IconPhotoScan;
  }
}

export function tablerIconToStr(tablerIcon: TablerIcon): string {
  switch (tablerIcon) {
    case IconBarbell:
      return "barbell";
    case IconBook:
      return "book";
    case IconBottle:
      return "bottle";
    case IconBrain:
      return "brain";
    case IconBrush:
      return "brush";
    case IconBuildingBank:
      return "buildingBank";
    case IconBuildingChurch:
      return "buildingChurch";
    case IconBulb:
      return "bulb";
    case IconCalendar:
      return "calendar";
    case IconCamera:
      return "camera";
    case IconChartLine:
      return "chartLine";
    case IconClock:
      return "clock";
    case IconDeviceLaptop:
      return "deviceLaptop";
    case IconFlower:
      return "flower";
    case IconHeart:
      return "heart";
    case IconHome:
      return "home";
    case IconLadder:
      return "ladder";
    case IconLeaf:
      return "leaf";
    case IconMusic:
      return "music";
    case IconPeace:
      return "peace";
    case IconPhotoScan:
      return "photoScan";
    case IconUsersGroup:
      return "usersGroup";
    case IconWallet:
      return "wallet";
    case IconYoga:
      return "yoga";
    case IconPhotoScan:
      return "default";
    default:
      return "default";
  }
}
