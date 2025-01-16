select * from productattributes;



-- insert products
 INSERT INTO products(name,description,cover,slug) values("Ghe Suyt 01","description-product","cover-product","ghe-suyt-01") RETURNING  *;`
 INSERT INTO products(name,description,cover,slug) values("Ghe Suyt 02","description-product","cover-product","ghe-suyt-02") RETURNING  *;`
 INSERT INTO products(name,description,cover,slug) values("Ghe Suyt 03","description-product","cover-product","ghe-suyt-03") RETURNING  *;`
 INSERT INTO products(name,description,cover,slug) values("Ghe Suyt 04","description-product","cover-product","ghe-suyt-04") RETURNING  *;`
 INSERT INTO products(name,description,cover,slug) values("Ghe Suyt 05","description-product","cover-product","ghe-suyt-05") RETURNING  *;`

-- insert properties such as color painttype rawmaterial
insert into colorproduct (value,colorcode) values('clear varnish 02','444');
insert into colorproduct (value,colorcode) values('clear varnish 04','555');
insert into colorproduct (value,colorcode) values('clear varnish 06','666');

insert into painttype (value) values('waterbase');
insert into painttype (value) values('nc');

insert into rawmaterial (value) values('bew');
insert into rawmaterial (value) values('mdf');
insert into rawmaterial (value) values('wdf');
select * from colorproduct;

 -- insert sku
INSERT INTO productssku(productid,colorid,painttypeid,internalcode) values(1,1,1,"BRED124BEW111") ;
INSERT INTO productssku(productid,colorid,painttypeid,internalcode) values(1,2,1,"BRED124BEW112") ;
INSERT INTO productssku(productid,colorid,painttypeid,internalcode) values(1,3,1,"BRED124BEW113") ;
INSERT INTO productssku(productid,colorid,painttypeid,internalcode) values(2,1,1,"BRED125BEW111") ;
INSERT INTO productssku(productid,colorid,painttypeid,internalcode) values(2,2,1,"BRED125BEW112") ;
INSERT INTO productssku(productid,colorid,painttypeid,internalcode) values(2,3,1,"BRED125BEW113");
INSERT INTO productssku(productid,colorid,painttypeid,internalcode) values(3,1,1,"BRED126BEW111") ;
INSERT INTO productssku(productid,colorid,painttypeid,internalcode) values(3,2,1,"BRED126BEW112") ;
INSERT INTO productssku(productid,colorid,painttypeid,internalcode) values(3,3,1,"BRED126BEW113") ;
INSERT INTO productssku(productid,colorid,painttypeid,internalcode) values(4,1,1,"BRED127BEW111") ;
INSERT INTO productssku(productid,colorid,painttypeid,internalcode) values(4,2,1,"BRED127BEW112") ;
INSERT INTO productssku(productid,colorid,painttypeid,internalcode) values(4,3,1,"BRED127BEW113") ;
INSERT INTO productssku(productid,colorid,painttypeid,internalcode) values(5,1,1,"BRED128BEW111") ;
INSERT INTO productssku(productid,colorid,painttypeid,internalcode) values(5,2,1,"BRED128BEW112") ;
INSERT INTO productssku(productid,colorid,painttypeid,internalcode) values(5,3,1,"BRED128BEW113") ;


-- insert Components productId id productSKU
INSERT INTO components(name,productid,colorId,rawMaterialId,quantity)values("Thanh ngang dài",1,1,1,2) ;
INSERT INTO components(name,productid,colorId,rawMaterialId,quantity)values("Thanh ngang ngắn",1,2,1,2) ;
INSERT INTO components(name,productid,colorId,rawMaterialId,quantity)values("Thanh ngang dài",2,1,1,2) ;
INSERT INTO components(name,productid,colorId,rawMaterialId,quantity)values("Thanh ngang ngắn",2,2,1,2) ;
INSERT INTO components(name,productid,colorId,rawMaterialId,quantity)values("Thanh ngang dài",3,1,1,2) ;
INSERT INTO components(name,productid,colorId,rawMaterialId,quantity)values("Thanh ngang ngắn",3,2,1,2) ;
INSERT INTO components(name,productid,colorId,rawMaterialId,quantity)values("Thanh ngang dài",4,1,1,2) ;
INSERT INTO components(name,productid,colorId,rawMaterialId,quantity)values("Thanh ngang ngắn",4,2,1,2) ;
INSERT INTO components(name,productid,colorId,rawMaterialId,quantity)values("Thanh ngang dài",5,1,1,2);
INSERT INTO components(name,productid,colorId,rawMaterialId,quantity)values("Thanh ngang ngắn",5,2,1,2);
INSERT INTO components(name,productid,colorId,rawMaterialId,quantity)values("Thanh ngang dài",6,1,1,2);
INSERT INTO components(name,productid,colorId,rawMaterialId,quantity)values("Thanh ngang ngắn",6,2,1,2);
INSERT INTO components(name,productid,colorId,rawMaterialId,quantity)values("Thanh ngang dài",7,1,1,2) ;
INSERT INTO components(name,productid,colorId,rawMaterialId,quantity)values("Thanh ngang ngắn",7,2,1,2) ;
INSERT INTO components(name,productid,colorId,rawMaterialId,quantity)values("Thanh ngang dài",8,1,1,2) ;
INSERT INTO components(name,productid,colorId,rawMaterialId,quantity)values("Thanh ngang ngắn",8,2,1,2) ;


-- insert department
INSERT INTO departments(name) values("CUT");
INSERT INTO departments(name) values("FORM");
INSERT INTO departments(name) values("SAND");

-- insert machines 
INSERT INTO machines(name,departmentid) values("bao 2 mat", 1);
INSERT INTO machines(name,departmentid) values("cua rong", 1);
INSERT INTO machines(name,departmentid) values("may cat khuc", 1);
INSERT INTO machines(name,departmentid) values("cnc 4 head", 2);
INSERT INTO machines(name,departmentid) values("cnc 3 head", 2);
INSERT INTO machines(name,departmentid) values("cnc 5 head", 2);
INSERT INTO machines(name,departmentid) values("cha nham m5", 3);
INSERT INTO machines(name,departmentid) values("cha nham tabilue", 3);
INSERT INTO machines(name,departmentid) values("cha nham choi ", 3);
-- insert operations
INSERT INTO operations(name,machineid,departmentid) values("bao 2 mat go", 1,1);
INSERT INTO operations(name,machineid,departmentid) values("cua thanh go thanh nhieu thanh", 2,1);
INSERT INTO operations(name,machineid,departmentid) values("cat cac thanh go nhieu khuc", 3,1);
INSERT INTO operations(name,machineid,departmentid) values("cnc 4 head dung de khac", 4,1);
INSERT INTO operations(name,machineid,departmentid) values("cnc 3 head dung de khac", 5,1);
INSERT INTO operations(name,machineid,departmentid) values("cnc 5 head dung de khac", 6,1);
INSERT INTO operations(name,machineid,departmentid) values("cha min go", 7,1);
INSERT INTO operations(name,machineid,departmentid) values("cha min go", 8,1);
INSERT INTO operations(name,machineid,departmentid) values("cha min go", 9,1);




 +