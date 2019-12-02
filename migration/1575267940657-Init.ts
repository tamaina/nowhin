import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1575267940657 implements MigrationInterface {
    name = 'Init1575267940657'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "company" ("id" character varying(16) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "name" character varying(64) NOT NULL, "shortName" character varying(64) NOT NULL, "post" character varying(16) NOT NULL, "address" character varying(64) array NOT NULL, "members" character varying(16) array NOT NULL DEFAULT '{}'::varchar[], CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "person" ("id" character varying(16) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "name" character varying(128) NOT NULL, "position" character varying(128) NOT NULL, "companyId" character varying(16), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "bill" ("id" character varying(16) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "orderIds" character varying(16) array NOT NULL, "memo" character varying(8192) NOT NULL, "ordererCompanyId" character varying(16), "ordererPersonId" character varying(16), CONSTRAINT "PK_683b47912b8b30fe71d1fa22199" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_595e2f60fcc127cd6cdebb65f2" ON "bill" ("createdAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6fb00a8c93a77ab06e512e00ba" ON "bill" ("orderIds") `, undefined);
        await queryRunner.query(`CREATE TABLE "deliver_sheet" ("id" character varying(16) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "orderIds" character varying(16) array NOT NULL, "memo" character varying(8192) NOT NULL, "ordererCompanyId" character varying(16), "ordererPersonId" character varying(16), CONSTRAINT "PK_e61ea56f730422b80e94515f2cd" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_109fc24691aa62168426245e42" ON "deliver_sheet" ("createdAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_7146579c61a536ce93d9e2f4a6" ON "deliver_sheet" ("orderIds") `, undefined);
        await queryRunner.query(`CREATE TABLE "drive_file" ("id" character varying(16) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "name" character varying(256) NOT NULL, "type" character varying(24) NOT NULL, CONSTRAINT "PK_43ddaaaf18c9e68029b7cbb032e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "meta" ("id" character varying(16) NOT NULL, "companyName" character varying(128) NOT NULL, "bannerId" character varying(128) NOT NULL, CONSTRAINT "REL_2aafba50625f7dcf7905b4e475" UNIQUE ("bannerId"), CONSTRAINT "PK_c4c17a6c2bd7651338b60fc590b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "work" ("id" character varying(16) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "lastOrderedAt" TIMESTAMP NOT NULL, "name" character varying(256) NOT NULL, "identifiers" character varying(128) array NOT NULL, "orderIds" character varying array NOT NULL, "fileIds" character varying array NOT NULL DEFAULT '{}'::varchar[], "memo" character varying(8192) NOT NULL, "ordererCompanyId" character varying(16), "ordererPersonId" character varying(16), CONSTRAINT "PK_1ad2a9dfd058d66c37e6d495222" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1993b99a5d86af53544be69761" ON "work" ("lastOrderedAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_807267b57332b619f6b79b93e1" ON "work" ("orderIds") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f84e870cb31049fdbdfb1eb915" ON "work" ("fileIds") `, undefined);
        await queryRunner.query(`CREATE TABLE "order" ("id" character varying(16) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "orderedAt" TIMESTAMP, "deliveredAt" TIMESTAMP, "workId" character varying(16) NOT NULL, "quantity" integer NOT NULL DEFAULT 1, "unitPrice" integer NOT NULL, "salesTaxIsInPrice" boolean NOT NULL, "salesTax" integer NOT NULL DEFAULT 10, "state" character varying(16) NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_73fa941c122465238600d2c4bb" ON "order" ("orderedAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f437a76442f23c89ad7652b2a4" ON "order" ("deliveredAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_9c87578f9789fccf28eff93d63" ON "order" ("workId") `, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying(16) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "name" character varying(256) NOT NULL, "pwhash" character varying(128) NOT NULL, "i" character varying(16) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_065d4d8f3b5adb4a08841eae3c" ON "user" ("name") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_5093b95246c540631e0bb8eb1e" ON "user" ("pwhash") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1a465e400b9f8beae078eb4dda" ON "user" ("i") `, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_ee066ddacfce46c9a7cb90edd1a" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_89d9b205f99acc48734075ff152" FOREIGN KEY ("ordererCompanyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_9d4f9d3222b7479613f2f9542f8" FOREIGN KEY ("ordererPersonId") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "deliver_sheet" ADD CONSTRAINT "FK_23924bb7eb79fe52046af2c0c3f" FOREIGN KEY ("ordererCompanyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "deliver_sheet" ADD CONSTRAINT "FK_b784e5853c821841f28861d4ebc" FOREIGN KEY ("ordererPersonId") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "meta" ADD CONSTRAINT "FK_2aafba50625f7dcf7905b4e475e" FOREIGN KEY ("bannerId") REFERENCES "drive_file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "work" ADD CONSTRAINT "FK_bbd6c375c3cd2c5e431d3f3ab77" FOREIGN KEY ("ordererCompanyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "work" ADD CONSTRAINT "FK_e7cd22be5e850207c8a26bf5de6" FOREIGN KEY ("ordererPersonId") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_9c87578f9789fccf28eff93d63d" FOREIGN KEY ("workId") REFERENCES "work"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_9c87578f9789fccf28eff93d63d"`, undefined);
        await queryRunner.query(`ALTER TABLE "work" DROP CONSTRAINT "FK_e7cd22be5e850207c8a26bf5de6"`, undefined);
        await queryRunner.query(`ALTER TABLE "work" DROP CONSTRAINT "FK_bbd6c375c3cd2c5e431d3f3ab77"`, undefined);
        await queryRunner.query(`ALTER TABLE "meta" DROP CONSTRAINT "FK_2aafba50625f7dcf7905b4e475e"`, undefined);
        await queryRunner.query(`ALTER TABLE "deliver_sheet" DROP CONSTRAINT "FK_b784e5853c821841f28861d4ebc"`, undefined);
        await queryRunner.query(`ALTER TABLE "deliver_sheet" DROP CONSTRAINT "FK_23924bb7eb79fe52046af2c0c3f"`, undefined);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_9d4f9d3222b7479613f2f9542f8"`, undefined);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_89d9b205f99acc48734075ff152"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_ee066ddacfce46c9a7cb90edd1a"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1a465e400b9f8beae078eb4dda"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_5093b95246c540631e0bb8eb1e"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_065d4d8f3b5adb4a08841eae3c"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_e11e649824a45d8ed01d597fd9"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_9c87578f9789fccf28eff93d63"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f437a76442f23c89ad7652b2a4"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_73fa941c122465238600d2c4bb"`, undefined);
        await queryRunner.query(`DROP TABLE "order"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f84e870cb31049fdbdfb1eb915"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_807267b57332b619f6b79b93e1"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1993b99a5d86af53544be69761"`, undefined);
        await queryRunner.query(`DROP TABLE "work"`, undefined);
        await queryRunner.query(`DROP TABLE "meta"`, undefined);
        await queryRunner.query(`DROP TABLE "drive_file"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_7146579c61a536ce93d9e2f4a6"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_109fc24691aa62168426245e42"`, undefined);
        await queryRunner.query(`DROP TABLE "deliver_sheet"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_6fb00a8c93a77ab06e512e00ba"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_595e2f60fcc127cd6cdebb65f2"`, undefined);
        await queryRunner.query(`DROP TABLE "bill"`, undefined);
        await queryRunner.query(`DROP TABLE "person"`, undefined);
        await queryRunner.query(`DROP TABLE "company"`, undefined);
    }

}
