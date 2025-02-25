/*
  Warnings:

  - You are about to drop the column `post_author` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `post_content` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `post_order` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `post_password` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `post_status` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `post_title` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `post_author`,
    DROP COLUMN `post_content`,
    DROP COLUMN `post_order`,
    DROP COLUMN `post_password`,
    DROP COLUMN `post_status`,
    DROP COLUMN `post_title`,
    ADD COLUMN `author` VARCHAR(255) NULL,
    ADD COLUMN `category_id` INTEGER NULL,
    ADD COLUMN `content` TEXT NULL,
    ADD COLUMN `cover_image` VARCHAR(255) NULL,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `keywords` VARCHAR(255) NULL,
    ADD COLUMN `order` VARCHAR(255) NULL,
    ADD COLUMN `password` VARCHAR(255) NULL,
    ADD COLUMN `status` VARCHAR(255) NULL,
    ADD COLUMN `title` VARCHAR(255) NULL,
    ADD COLUMN `view_count` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatar` VARCHAR(255) NULL,
    ADD COLUMN `bio` TEXT NULL,
    ADD COLUMN `is_admin` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `category` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tag` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `tag_name_key`(`name`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postTag` (
    `post_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,

    PRIMARY KEY (`post_id`, `tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `post_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `parent_id` INTEGER NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'active',

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postTag` ADD CONSTRAINT `postTag_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `post`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postTag` ADD CONSTRAINT `postTag_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `post`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `comment`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;
