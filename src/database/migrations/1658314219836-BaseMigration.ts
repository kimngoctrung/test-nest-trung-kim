import {MigrationInterface, QueryRunner} from "typeorm";

export class BaseMigration1658314219836 implements MigrationInterface {
    name = 'BaseMigration1658314219836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_post" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "userName" character varying NOT NULL, "emailUser" character varying NOT NULL, "bthday" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_post_role_enum" NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_e7f8682e704bec181055fa1a728" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_post"`);
    }

}
