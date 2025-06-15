import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1750003247882 implements MigrationInterface {
    name = 'AutoMigration1750003247882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" text NOT NULL, "password" text NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "grammy" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites_artists" ("favoriteId" uuid NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_8c55e34c32eabc5811bd11b9cbb" PRIMARY KEY ("favoriteId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5fe2b45220925011fc8b283bb5" ON "favorites_artists" ("favoriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_78426d3d98baf6756b0b6223b3" ON "favorites_artists" ("artistId") `);
        await queryRunner.query(`CREATE TABLE "favorites_albums" ("favoriteId" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_67a355c0a0a90c1a6453b70c6bf" PRIMARY KEY ("favoriteId", "albumId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8e4cda19727967606ea34c5df2" ON "favorites_albums" ("favoriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e3baa03f2e256a1ff521eda9ca" ON "favorites_albums" ("albumId") `);
        await queryRunner.query(`CREATE TABLE "favorites_tracks" ("favoriteId" uuid NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "PK_9fba03d9f26971d53136da6b0bf" PRIMARY KEY ("favoriteId", "trackId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_98248465388178137526563e9a" ON "favorites_tracks" ("favoriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_307cc54e4e3fddbb478b061920" ON "favorites_tracks" ("trackId") `);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites_artists" ADD CONSTRAINT "FK_5fe2b45220925011fc8b283bb59" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_artists" ADD CONSTRAINT "FK_78426d3d98baf6756b0b6223b36" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_albums" ADD CONSTRAINT "FK_8e4cda19727967606ea34c5df22" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_albums" ADD CONSTRAINT "FK_e3baa03f2e256a1ff521eda9cad" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks" ADD CONSTRAINT "FK_98248465388178137526563e9a3" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks" ADD CONSTRAINT "FK_307cc54e4e3fddbb478b0619206" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites_tracks" DROP CONSTRAINT "FK_307cc54e4e3fddbb478b0619206"`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks" DROP CONSTRAINT "FK_98248465388178137526563e9a3"`);
        await queryRunner.query(`ALTER TABLE "favorites_albums" DROP CONSTRAINT "FK_e3baa03f2e256a1ff521eda9cad"`);
        await queryRunner.query(`ALTER TABLE "favorites_albums" DROP CONSTRAINT "FK_8e4cda19727967606ea34c5df22"`);
        await queryRunner.query(`ALTER TABLE "favorites_artists" DROP CONSTRAINT "FK_78426d3d98baf6756b0b6223b36"`);
        await queryRunner.query(`ALTER TABLE "favorites_artists" DROP CONSTRAINT "FK_5fe2b45220925011fc8b283bb59"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_307cc54e4e3fddbb478b061920"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_98248465388178137526563e9a"`);
        await queryRunner.query(`DROP TABLE "favorites_tracks"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e3baa03f2e256a1ff521eda9ca"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8e4cda19727967606ea34c5df2"`);
        await queryRunner.query(`DROP TABLE "favorites_albums"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78426d3d98baf6756b0b6223b3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5fe2b45220925011fc8b283bb5"`);
        await queryRunner.query(`DROP TABLE "favorites_artists"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
