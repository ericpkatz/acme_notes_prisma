-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "txt" VARCHAR(100) NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Note_txt_key" ON "Note"("txt");
