import { S3 } from "aws-sdk";
import { env } from "~/env.mjs";

const s3 = new S3({
  endpoint: "https://kr.object.ncloudstorage.com",
  region: "kr-standard",
  credentials: {
    accessKeyId: env.NAVER_CLOUD_ACCESS_KEY_ID,
    secretAccessKey: env.NAVER_CLOUD_SECRET_KEY,
  },
});
