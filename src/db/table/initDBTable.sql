-- Active: 1731071036952@@127.0.0.1@5432@management-product@public
CREATE TYPE productattributetype AS ENUM( 
    'color',
    'painttype',
);

CREATE TYPE componentattributetype AS ENUM( 
    'color',
    'rawmaterial'
);


CREATE TABLE IF NOT EXISTS "users" (
    "id" serial PRIMARY KEY,
    "firtname" varchar(50) not null,
    "lastname" varchar(50) not null,
    "username" varchar(50) not null,
    "email" varchar(50) default null,
    "role" varchar not null,
    "avatar" varchar,
    "createdat" timestamp with time zone default current_timestamp,
    "updatedat" timestamp default null
);

CREATE TABLE IF NOT EXISTS "products" (
    "id" serial PRIMARY KEY,
    "name" varchar not null,
    "description" varchar,
    "cover" varchar,
    "slug" varchar,
    "catagoryid" integer,
    "createdat" timestamp
    with
        time zone default current_timestamp,
        "updatedat" timestamp default null
);

CREATE TABLE IF NOT EXISTS "productattributes" (
    "id" serial PRIMARY KEY,
    "type" productattributetype,
    "value" varchar,
    "createdat" timestamp
    with
        time zone default current_timestamp,
        "updatedat" timestamp default null
);

CREATE TABLE IF NOT EXISTS "productssku" (
    "id" serial PRIMARY KEY,
    "productid" integer,
    "colorattributeid" integer,
    "painttypeattributeid" integer,
    "internalcodeattribute" varchar(50) NOT NULL,
    "createdat" timestamp
    with
        time zone default current_timestamp,
        "updatedat" timestamp default null
);

CREATE TABLE IF NOT EXISTS "componentattributes" (
    "id" serial PRIMARY KEY,
    "type" componentattributetype,
    "value" varchar,
    "createdat" timestamp
    with
        time zone default current_timestamp,
        "updatedat" timestamp default null
);

CREATE TABLE IF NOT EXISTS "components" (
    "id" serial PRIMARY KEY,
    "productid" integer,
    "colorattributeid" integer,
    "rawmaterailattributeid" integer,
    "quatity" integer,
    "dimension" varchar,
    "createdat" timestamp
    with
        time zone default current_timestamp,
        "updatedat" timestamp default null
);

CREATE TABLE IF NOT EXISTS "departments" (
    "id" serial PRIMARY KEY,
    "name" varchar,
    "createdat" timestamp
    with
        time zone default current_timestamp,
        "updatedat" timestamp default null
);

CREATE TABLE IF NOT EXISTS "machines" (
    "id" serial PRIMARY KEY,
    "name" varchar,
    "createdat" timestamp
    with
        time zone default current_timestamp,
        "updatedat" timestamp default null
);

CREATE TABLE IF NOT EXISTS "operations" (
    "id" serial PRIMARY KEY,
    "name" varchar,
    "createdat" timestamp
    with
        time zone default current_timestamp,
        "updatedat" timestamp default null
);

CREATE TABLE IF NOT EXISTS "quatitycomponent" (
    "id" serial PRIMARY KEY,
    "componentid" integer,
    "productid" integer,
    "orderitemsid" integer,
    "departmentid" integer,
    "machineid" integer,
    "operationid" integer,
    "quatity" integer,
    "userimport" integer,
    "dayimport" timestamp,
    "createdat" timestamp
    with
        time zone default current_timestamp,
        "updatedat" timestamp default null
);

CREATE TABLE IF NOT EXISTS "stepcomponent" (
    "id" serial PRIMARY KEY,
    "componentid" integer,
    "departmentid" integer,
    "machineid" integer,
    "operationid" integer,
    "step" integer,
    "note" varchar,
    "cycletime" integer,
    "quatitycycletime" integer,
    "workerquatity" integer,
    "createdat" timestamp
    with
        time zone default current_timestamp,
        "updatedat" timestamp default null
);

CREATE TABLE IF NOT EXISTS "orderdetails" (
    "id" serial PRIMARY KEY,
    "usercreatedid" integer,
    "customerid" integer,
    "createdat" timestamp
    with
        time zone default current_timestamp,
        "updatedat" timestamp default null
);

CREATE TABLE IF NOT EXISTS "orderitems" (
    "id" serial PRIMARY KEY,
    "orderdetailid" integer,
    "productid" integer,
    "quatity" integer,
    "createdat" timestamp
    with
        time zone default current_timestamp,
        "updatedat" timestamp default null
);

ALTER TABLE "productssku"
ADD FOREIGN KEY ("productid") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "productssku"
ADD FOREIGN KEY ("colorattributeid") REFERENCES "productattributes" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "productssku"
ADD FOREIGN KEY ("painttypeattributeid") REFERENCES "productattributes" ("id") ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE "components"
ADD FOREIGN KEY ("productid") REFERENCES "productssku" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "components"
ADD FOREIGN KEY ("colorattributeid") REFERENCES "componentattributes" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "components"
ADD FOREIGN KEY ("rawmaterailattributeid") REFERENCES "componentattributes" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "quatitycomponent"
ADD FOREIGN KEY ("componentid") REFERENCES "components" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "quatitycomponent"
ADD FOREIGN KEY ("productid") REFERENCES "productssku" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "quatitycomponent"
ADD FOREIGN KEY ("orderitemsid") REFERENCES "orderitems" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "quatitycomponent"
ADD FOREIGN KEY ("departmentid") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "quatitycomponent"
ADD FOREIGN KEY ("machineid") REFERENCES "machines" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "quatitycomponent"
ADD FOREIGN KEY ("operationid") REFERENCES "operations" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "quatitycomponent"
ADD FOREIGN KEY ("userimport") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "stepcomponent"
ADD FOREIGN KEY ("componentid") REFERENCES "components" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "stepcomponent"
ADD FOREIGN KEY ("departmentid") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "stepcomponent"
ADD FOREIGN KEY ("machineid") REFERENCES "machines" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "stepcomponent"
ADD FOREIGN KEY ("operationid") REFERENCES "operations" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "orderitems"
ADD FOREIGN KEY ("orderdetailid") REFERENCES "orderdetails" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "orderitems"
ADD FOREIGN KEY ("productid") REFERENCES "productssku" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "orderdetails"
ADD FOREIGN KEY ("usercreatedid") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;