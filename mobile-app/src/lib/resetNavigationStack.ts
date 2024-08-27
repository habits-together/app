import { router } from "expo-router";

export function resetNavigationStack(
  newPath: (typeof router.replace.arguments)[0],
) {
  while (router.canGoBack()) {
    router.back();
  }
  router.replace(newPath);
}
