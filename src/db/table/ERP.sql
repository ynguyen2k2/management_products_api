-- Active: 1731071036952@@127.0.0.1@5432@management-product@public
CREATE TYPE productAtributeType AS ENUM IF not exists( 
  'color',
  'paintType',
  'internalCode'
);

CREATE TYPE componentAtributeType AS ENUM (
  'internalCode',
  'color',
  'rawMaterial'
);

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "firtName" varchar(50) not null,
  "lastName" varchar(50) not null,
  "username" varchar(50) not null,
  "email" varchar(50) default null,
  "role" varchar not null,
  "avatar" varchar,
  "createdAt" timestamp with time zone default current_timestamp,
  "updatedAt" timestamp default null
);


CREATE TABLE "products" (
  "id" serial PRIMARY KEY,
"name" varchar not null,
  "description" varchar,
  "cover" varchar,
"slug" varchar
  "catagoryId" integer,
  "createdAt" timestamp with time zone default current_timestamp ,
   "updatedAt" timestamp default null
);

CREATE TABLE "productAttributes" (
  "id" serial PRIMARY KEY,
  "type" productAtributeType,
  "value" varchar,
  "createdAt" timestamp with time zone default current_timestamp,
   "updatedAt" timestamp default null
);

CREATE TABLE "productsSKU" (
  "id" serial PRIMARY KEY,
  "productId" integer,
  "colorAttributeId" integer,
  "paintTypeAttributeId" integer,
  "internalCodeAttribute" integer,
  "createdAt" timestamp with time zone default current_timestamp,
   "updatedAt" timestamp default null
);

CREATE TABLE "componentAttributes" (
  "id" serial PRIMARY KEY,
  "type" componentAtributeType,
  "value" varchar,
  "createdAt" timestamp with time zone default current_timestamp,
   "updatedAt" timestamp default null
);

CREATE TABLE "components" (
  "id" serial PRIMARY KEY,
  "productId" integer,
  "colorAttributeId" integer,
  "rawMaterailAttributeId" integer,
  "quatity" integer,
  "dimension" varchar,
  "createdAt" timestamp with time zone default current_timestamp,
   "updatedAt" timestamp default null
);

CREATE TABLE "departments" (
 "id" serial PRIMARY KEY,
  "name" varchar,
    "createdAt" timestamp with time zone default current_timestamp,
   "updatedAt" timestamp default null
);

CREATE TABLE "machines" (
  "id" serial PRIMARY KEY,
  "name" varchar, 
    "createdAt" timestamp with time zone default current_timestamp,
   "updatedAt" timestamp default null
);

CREATE TABLE "operations" (
  "id" serial PRIMARY KEY,
  "name" varchar,
    "createdAt" timestamp with time zone default current_timestamp,
   "updatedAt" timestamp default null
);

CREATE TABLE "quatityComponent" (
  "id" serial PRIMARY KEY,
  "componentId" integer,
  "productId" integer,
  "orderItemsId" integer,
  "departmentId" integer,
  "machineId" integer,
  "operationId" integer,
  "quatity" integer,
  "userImport" integer,
  "dayImport" timestamp,
  "createdAt" timestamp with time zone default current_timestamp,
   "updatedAt" timestamp default null
);

CREATE TABLE "stepComponent" (
  "id" serial PRIMARY KEY,
  "componentId" integer,
  "departmentId" integer,
  "machineId" integer,
  "operationId" integer,
  "step" integer,
  "note" varchar,
  "cycleTime" integer,
  "quatityCycleTime" integer,
  "workerQuatity" integer,
  "createdAt" timestamp with time zone default current_timestamp,
   "updatedAt" timestamp default null
);

CREATE TABLE "orderDetails" (
  "id" serial PRIMARY KEY,
  "userCreatedId" integer,
  "customerId" integer,
  "createdAt" timestamp with time zone default current_timestamp,
   "updatedAt" timestamp default null
);

CREATE TABLE "orderItems" (
  "id" serial PRIMARY KEY,
  "orderDetailId" integer,
  "productId" integer,
  "quatity" integer,
  "createdAt" timestamp with time zone default current_timestamp,
   "updatedAt" timestamp default null
);



ALTER TABLE "productsSKU" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "productsSKU" ADD FOREIGN KEY ("colorAttributeId") REFERENCES "productAttributes" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "productsSKU" ADD FOREIGN KEY ("paintTypeAttributeId") REFERENCES "productAttributes" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "productsSKU" ADD FOREIGN KEY ("internalCodeAttribute") REFERENCES "productAttributes" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "components" ADD FOREIGN KEY ("productId") REFERENCES "productsSKU" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "components" ADD FOREIGN KEY ("colorAttributeId") REFERENCES "componentAttributes" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "components" ADD FOREIGN KEY ("rawMaterailAttributeId") REFERENCES "componentAttributes" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "quatityComponent" ADD FOREIGN KEY ("componentId") REFERENCES "components" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "quatityComponent" ADD FOREIGN KEY ("productId") REFERENCES "productsSKU" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "quatityComponent" ADD FOREIGN KEY ("orderItemsId") REFERENCES "orderItems" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "quatityComponent" ADD FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "quatityComponent" ADD FOREIGN KEY ("machineId") REFERENCES "machines" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "quatityComponent" ADD FOREIGN KEY ("operationId") REFERENCES "operations" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "quatityComponent" ADD FOREIGN KEY ("userImport") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "stepComponent" ADD FOREIGN KEY ("componentId") REFERENCES "components" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "stepComponent" ADD FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "stepComponent" ADD FOREIGN KEY ("machineId") REFERENCES "machines" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "stepComponent" ADD FOREIGN KEY ("operationId") REFERENCES "operations" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "orderItems" ADD FOREIGN KEY ("orderDetailId") REFERENCES "orderDetails" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "orderItems" ADD FOREIGN KEY ("productId") REFERENCES "productsSKU" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "orderDetails" ADD FOREIGN KEY ("userCreatedId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
