import {
  Icon,
  IconBarbell,
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
  IconTag,
  IconUsersGroup,
  IconWallet,
  IconYoga,
} from "@tabler/icons-react-native";

export const icons: { [key: string]: Icon } = {
  // Default
  default: IconTag,
  // Health & Fitness
  gym: IconBarbell,
  yoga: IconYoga,
  healthyEating: IconLeaf,
  // Productivity & Work
  work: IconDeviceLaptop,
  timeManagement: IconClock,
  scheduling: IconCalendar,
  // Personal Development
  learning: IconBrain,
  ideas: IconBulb,
  careerAdvancement: IconLadder,
  // Leisure & Recreation
  painting: IconBrush,
  music: IconMusic,
  photography: IconCamera,
  // Social & Family
  socializing: IconUsersGroup,
  love: IconHeart,
  familyTime: IconHome,
  // Mindfullness & Spirituality
  meditation: IconPeace,
  religion: IconBuildingChurch,
  spirituality: IconFlower,
  // Financial
  saving: IconBuildingBank,
  spending: IconWallet,
  investing: IconChartLine,
};
