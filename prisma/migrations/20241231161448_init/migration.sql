-- CreateTable
CREATE TABLE `post` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `post_title` VARCHAR(255) NULL,
    `post_content` TEXT NULL,
    `post_author` VARCHAR(255) NULL,
    `create_time` DATETIME(0) NULL,
    `last_update_time` DATETIME(0) NULL,
    `post_order` VARCHAR(255) NULL,
    `post_password` VARCHAR(255) NULL,
    `post_status` VARCHAR(255) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(255) NOT NULL,
    `nick_name` VARCHAR(255) NULL,
    `user_pass` VARCHAR(255) NULL,
    `user_status` VARCHAR(255) NULL,
    `create_time` DATETIME(0) NULL,
    `lats_time` DATETIME(0) NULL,
    `user_email` VARCHAR(255) NULL,

    UNIQUE INDEX `user_user_name_key`(`user_name`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
