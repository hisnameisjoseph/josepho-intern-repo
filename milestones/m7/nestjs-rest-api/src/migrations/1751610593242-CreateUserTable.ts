import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1751610593242 implements MigrationInterface {
    name = 'CreateUserTable1751610593242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

}
