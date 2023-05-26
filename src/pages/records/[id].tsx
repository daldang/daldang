import { useRouter } from "next/router";
import { api } from "~/utils/api";

const RecordPage = () => {
  const router = useRouter();
  const record = api.desertLog.getDesertLogById.useQuery({
    id: router.query.id as string,
  }).data;
  if (!record) {
    return <div>record not found on id {router.query.id}</div>;
  }
  return <p>Post: {record.content}</p>;
};

export default RecordPage;
