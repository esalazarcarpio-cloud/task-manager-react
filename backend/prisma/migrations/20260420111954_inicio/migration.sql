-- CreateTable
CREATE TABLE "tareas" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR,
    "state" VARCHAR,

    CONSTRAINT "tareas_pkey" PRIMARY KEY ("id")
);
