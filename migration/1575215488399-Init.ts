import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1575215488399 implements MigrationInterface {
    name = 'Init1575215488399'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "d_company" ("id" character varying(16) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "name" character varying(64) NOT NULL, "shortName" character varying(64) NOT NULL, "post" character varying(16) NOT NULL, "address" character varying(64) array NOT NULL, "members" character varying(16) array NOT NULL DEFAULT '{}'::varchar[], CONSTRAINT "PK_e0741e3816f93e13b984a824ec1" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "d_person" ("id" character varying(16) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "name" character varying(128) NOT NULL, "position" character varying(128) NOT NULL, "companyId" character varying(16), CONSTRAINT "PK_3b9d6e681e06567c013a18c29ed" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "d_bill" ("id" character varying(16) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "orderIds" character varying(16) array NOT NULL, "memo" character varying(8192) NOT NULL, "ordererCompanyId" character varying(16), "ordererPersonId" character varying(16), CONSTRAINT "PK_0d72e8f13ce3211f3d47d5d1933" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_200b155c8876ceab70c30e6460" ON "d_bill" ("createdAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_08506b81629935baffc6c63fd7" ON "d_bill" ("orderIds") `, undefined);
        await queryRunner.query(`CREATE TABLE "d_deliver_sheet" ("id" character varying(16) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "orderIds" character varying(16) array NOT NULL, "memo" character varying(8192) NOT NULL, "ordererCompanyId" character varying(16), "ordererPersonId" character varying(16), CONSTRAINT "PK_352f013ba09d907e58c7b092982" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1c758f108702e4395098dcb33e" ON "d_deliver_sheet" ("createdAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6bca2d43ac6d7e0b7b5f8186cf" ON "d_deliver_sheet" ("orderIds") `, undefined);
        await queryRunner.query(`CREATE TABLE "d_drive_file" ("id" character varying(16) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "name" character varying(256) NOT NULL, "type" character varying(24) NOT NULL, CONSTRAINT "PK_170f2893be7b47bcbf294301066" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "d_meta" ("id" character varying(16) NOT NULL, "companyName" character varying(128) NOT NULL, "bannerId" character varying(128) NOT NULL, CONSTRAINT "REL_90df46687b296a3cee0dced9f0" UNIQUE ("bannerId"), CONSTRAINT "PK_75de5d5417ec0210381b9d9ae77" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "d_work" ("id" character varying(16) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "lastOrderedAt" TIMESTAMP NOT NULL, "name" character varying(256) NOT NULL, "identifiers" character varying(128) array NOT NULL, "orderIds" character varying array NOT NULL, "fileIds" character varying array NOT NULL DEFAULT '{}'::varchar[], "memo" character varying(8192) NOT NULL, "ordererCompanyId" character varying(16), "ordererPersonId" character varying(16), CONSTRAINT "PK_b531138401b2c13aee27cd59a88" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_027dca69675d05f98f8c57faf8" ON "d_work" ("lastOrderedAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d3543ddc6069c2faa59b298db6" ON "d_work" ("orderIds") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_9f540d73d5f8204dc9e9604273" ON "d_work" ("fileIds") `, undefined);
        await queryRunner.query(`CREATE TABLE "d_order" ("id" character varying(16) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "orderedAt" TIMESTAMP, "deliveredAt" TIMESTAMP, "workId" character varying(16) NOT NULL, "quantity" integer NOT NULL DEFAULT 1, "unitPrice" integer NOT NULL, "salesTaxIsInPrice" boolean NOT NULL, "salesTax" integer NOT NULL DEFAULT 10, "state" character varying(16) NOT NULL, CONSTRAINT "PK_9bc6d41c99ff1869e0c465323f9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c1e4a1731df3bc77e388f3f6fd" ON "d_order" ("orderedAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f778b304d102cab812d50adf34" ON "d_order" ("deliveredAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_a590e336758d516983a7c76104" ON "d_order" ("workId") `, undefined);
        await queryRunner.query(`CREATE TABLE "d_user" ("id" character varying(16) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "name" character varying(256) NOT NULL, "pwhash" character varying(128) NOT NULL, "i" character varying(16) NOT NULL, CONSTRAINT "PK_86d489a604d35528b614f5e8a21" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_34cb35a0cc21e68fa3b6e1c1c1" ON "d_user" ("createdAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d031e0c9ec40aa22d3117c2695" ON "d_user" ("name") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c6fa5c50455de7537f9695eb0e" ON "d_user" ("pwhash") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6af83bfeb905beb1d23baef77d" ON "d_user" ("i") `, undefined);
        await queryRunner.query(`ALTER TABLE "d_person" ADD CONSTRAINT "FK_4dcf8f4ddf05a655efbc017dd4b" FOREIGN KEY ("companyId") REFERENCES "d_company"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "d_bill" ADD CONSTRAINT "FK_7c4af2d81b7796eb8511e127d05" FOREIGN KEY ("ordererCompanyId") REFERENCES "d_company"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "d_bill" ADD CONSTRAINT "FK_1826e5a0ae193bc27b7e7e2a46c" FOREIGN KEY ("ordererPersonId") REFERENCES "d_person"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "d_deliver_sheet" ADD CONSTRAINT "FK_6aad413a4a952f008eafb4a51a7" FOREIGN KEY ("ordererCompanyId") REFERENCES "d_company"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "d_deliver_sheet" ADD CONSTRAINT "FK_0ca5ae642543fcfba1f0efde69c" FOREIGN KEY ("ordererPersonId") REFERENCES "d_person"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "d_meta" ADD CONSTRAINT "FK_90df46687b296a3cee0dced9f06" FOREIGN KEY ("bannerId") REFERENCES "d_drive_file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "d_work" ADD CONSTRAINT "FK_1bf067e229a5c26a5af96cf1b7d" FOREIGN KEY ("ordererCompanyId") REFERENCES "d_company"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "d_work" ADD CONSTRAINT "FK_d76f51106c4d17fcf185ee07d77" FOREIGN KEY ("ordererPersonId") REFERENCES "d_person"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "d_order" ADD CONSTRAINT "FK_a590e336758d516983a7c761046" FOREIGN KEY ("workId") REFERENCES "d_work"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "d_order" DROP CONSTRAINT "FK_a590e336758d516983a7c761046"`, undefined);
        await queryRunner.query(`ALTER TABLE "d_work" DROP CONSTRAINT "FK_d76f51106c4d17fcf185ee07d77"`, undefined);
        await queryRunner.query(`ALTER TABLE "d_work" DROP CONSTRAINT "FK_1bf067e229a5c26a5af96cf1b7d"`, undefined);
        await queryRunner.query(`ALTER TABLE "d_meta" DROP CONSTRAINT "FK_90df46687b296a3cee0dced9f06"`, undefined);
        await queryRunner.query(`ALTER TABLE "d_deliver_sheet" DROP CONSTRAINT "FK_0ca5ae642543fcfba1f0efde69c"`, undefined);
        await queryRunner.query(`ALTER TABLE "d_deliver_sheet" DROP CONSTRAINT "FK_6aad413a4a952f008eafb4a51a7"`, undefined);
        await queryRunner.query(`ALTER TABLE "d_bill" DROP CONSTRAINT "FK_1826e5a0ae193bc27b7e7e2a46c"`, undefined);
        await queryRunner.query(`ALTER TABLE "d_bill" DROP CONSTRAINT "FK_7c4af2d81b7796eb8511e127d05"`, undefined);
        await queryRunner.query(`ALTER TABLE "d_person" DROP CONSTRAINT "FK_4dcf8f4ddf05a655efbc017dd4b"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_6af83bfeb905beb1d23baef77d"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c6fa5c50455de7537f9695eb0e"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d031e0c9ec40aa22d3117c2695"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_34cb35a0cc21e68fa3b6e1c1c1"`, undefined);
        await queryRunner.query(`DROP TABLE "d_user"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_a590e336758d516983a7c76104"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f778b304d102cab812d50adf34"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c1e4a1731df3bc77e388f3f6fd"`, undefined);
        await queryRunner.query(`DROP TABLE "d_order"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_9f540d73d5f8204dc9e9604273"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d3543ddc6069c2faa59b298db6"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_027dca69675d05f98f8c57faf8"`, undefined);
        await queryRunner.query(`DROP TABLE "d_work"`, undefined);
        await queryRunner.query(`DROP TABLE "d_meta"`, undefined);
        await queryRunner.query(`DROP TABLE "d_drive_file"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_6bca2d43ac6d7e0b7b5f8186cf"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1c758f108702e4395098dcb33e"`, undefined);
        await queryRunner.query(`DROP TABLE "d_deliver_sheet"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_08506b81629935baffc6c63fd7"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_200b155c8876ceab70c30e6460"`, undefined);
        await queryRunner.query(`DROP TABLE "d_bill"`, undefined);
        await queryRunner.query(`DROP TABLE "d_person"`, undefined);
        await queryRunner.query(`DROP TABLE "d_company"`, undefined);
    }

}
