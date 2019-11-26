import { db } from "../backend/db";
import { config } from "../config";
import { getEntitiesList } from "../backend/misc/getEntitiesList";

for (const entity of getEntitiesList()) {
  db.use(`${config.db.prefix}_${entity}`)
}
