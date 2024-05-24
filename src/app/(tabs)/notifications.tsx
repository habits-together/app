import { ScrollView } from "@/src/components/Themed";
import NotificationList from "@/src/components/NotificationList";

export default function NotificationTab() {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
    <NotificationList />
    </ScrollView>
  );
}
