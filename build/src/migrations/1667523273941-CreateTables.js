"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTables1667523273941 = void 0;
class CreateTables1667523273941 {
    constructor() {
        this.name = 'CreateTables1667523273941';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "adm" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "avatar_img" character varying NOT NULL DEFAULT 'https://www.lance.com.br/files/article_main/uploads/2022/04/29/626c07807ccfa.jpeg', "password" character varying NOT NULL, CONSTRAINT "UQ_0f5ee0a519c677c5237a33b9516" UNIQUE ("email"), CONSTRAINT "PK_d4dab02cf2667fc5b673741b322" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "payment_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "card_number" numeric(16) NOT NULL, "due_date" date NOT NULL, "card_cv" numeric(16) NOT NULL, CONSTRAINT "PK_c66c60a17b56ec882fcd8ec770b" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "avatar_img" character varying NOT NULL DEFAULT 'https://www.lance.com.br/files/article_main/uploads/2022/04/29/626c07807ccfa.jpeg', "password" character varying NOT NULL, "isActive" character varying NOT NULL DEFAULT true, "created_At" date NOT NULL DEFAULT '"2022-11-04T00:54:38.423Z"', "updated_At" date NOT NULL DEFAULT '"2022-11-04T00:54:38.423Z"', "paymentId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_e0bd6fdbf43b798bda889642dc" UNIQUE ("paymentId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "playlists_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "users_count" integer NOT NULL, "created_At" date NOT NULL, "userId" uuid, "playlistId" uuid, CONSTRAINT "PK_a6856b83b783a3503e3d9b3e33f" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "playlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "link_playlist" character varying NOT NULL, "created_At" date NOT NULL DEFAULT '"2022-11-04T00:54:38.423Z"', "updated_At" date NOT NULL DEFAULT '"2022-11-04T00:54:38.423Z"', CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "playlists_musics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "music_count" integer NOT NULL, "created_At" date NOT NULL, "playlistId" uuid, "musicId" uuid, CONSTRAINT "PK_c035464035faa029608c5e70357" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "music" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistName" character varying NOT NULL, "genre" character varying NOT NULL, "description" character varying NOT NULL, "duration" double precision NOT NULL, "created_At" date NOT NULL DEFAULT '"2022-11-04T00:54:38.424Z"', "updated_At" date NOT NULL DEFAULT '"2022-11-04T00:54:38.424Z"', "artistId" uuid, CONSTRAINT "PK_c92b010dd889692dd54286f75e2" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "avatar_img" character varying NOT NULL DEFAULT 'https://www.lance.com.br/files/article_main/uploads/2022/04/29/626c07807ccfa.jpeg', "password" character varying NOT NULL, "isActive" character varying NOT NULL DEFAULT true, "created_At" date NOT NULL DEFAULT '"2022-11-04T00:54:38.424Z"', "updated_At" date NOT NULL DEFAULT '"2022-11-04T00:54:38.424Z"', CONSTRAINT "UQ_66b179caee88b4a3f0bb46533d4" UNIQUE ("email"), CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e0bd6fdbf43b798bda889642dcb" FOREIGN KEY ("paymentId") REFERENCES "payment_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "playlists_users" ADD CONSTRAINT "FK_d57fadb2465ee0d835756194498" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "playlists_users" ADD CONSTRAINT "FK_f773533cc5eb5db8b97fa1c6458" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "playlists_musics" ADD CONSTRAINT "FK_8391891c711a5cb2afffdfbcca6" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "playlists_musics" ADD CONSTRAINT "FK_a7e34146f7cb09d5f91acdb02e7" FOREIGN KEY ("musicId") REFERENCES "music"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "music" ADD CONSTRAINT "FK_8fdd0a21f58494eba65266a1e05" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "music" DROP CONSTRAINT "FK_8fdd0a21f58494eba65266a1e05"`);
            yield queryRunner.query(`ALTER TABLE "playlists_musics" DROP CONSTRAINT "FK_a7e34146f7cb09d5f91acdb02e7"`);
            yield queryRunner.query(`ALTER TABLE "playlists_musics" DROP CONSTRAINT "FK_8391891c711a5cb2afffdfbcca6"`);
            yield queryRunner.query(`ALTER TABLE "playlists_users" DROP CONSTRAINT "FK_f773533cc5eb5db8b97fa1c6458"`);
            yield queryRunner.query(`ALTER TABLE "playlists_users" DROP CONSTRAINT "FK_d57fadb2465ee0d835756194498"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e0bd6fdbf43b798bda889642dcb"`);
            yield queryRunner.query(`DROP TABLE "artist"`);
            yield queryRunner.query(`DROP TABLE "music"`);
            yield queryRunner.query(`DROP TABLE "playlists_musics"`);
            yield queryRunner.query(`DROP TABLE "playlist"`);
            yield queryRunner.query(`DROP TABLE "playlists_users"`);
            yield queryRunner.query(`DROP TABLE "user"`);
            yield queryRunner.query(`DROP TABLE "payment_user"`);
            yield queryRunner.query(`DROP TABLE "adm"`);
        });
    }
}
exports.CreateTables1667523273941 = CreateTables1667523273941;