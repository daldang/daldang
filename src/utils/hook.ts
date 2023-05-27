import SuperJSON from "superjson";
import useSessionStorageState from "use-session-storage-state";
import { type RouterInputs } from "./api";

export type CreateDesertLogRequest = Omit<
  RouterInputs["desertLog"]["createDesertLog"],
  "authorId"
>;

export function useSessionStorageRequestState() {
  return useSessionStorageState<CreateDesertLogRequest>("request", {
    defaultValue: {
      date: new Date(),
      content: "",
      desertName: "",
      desertCharacter: "",
      score: 0,
      image: "",
      location: "",
    },
    serializer: SuperJSON,
  });
}
