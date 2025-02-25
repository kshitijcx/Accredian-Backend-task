-- CreateTable
CREATE TABLE `Referal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `referrerName` VARCHAR(191) NOT NULL,
    `referrerMail` VARCHAR(191) NOT NULL,
    `referrerAmt` INTEGER NOT NULL,
    `refereeName` VARCHAR(191) NOT NULL,
    `refereeMail` VARCHAR(191) NOT NULL,
    `refereeAmt` INTEGER NOT NULL,
    `course` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
