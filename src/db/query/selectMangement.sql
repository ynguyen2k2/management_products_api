-- select * from painttype;
-- select * from rawmaterial;

select * from productssku;

-- select p.id, p.productid, c.values as color, painttype.value as paintType  from productssku as p ,colorproduct as c, painttype 
-- GROUP BY p.id,c.values, painttype.value;


-- select m.name as machines, d.name as departments, o.name as operations from departments as d
-- INNER JOIN  machines as m on m.departmentid = d.id
-- inner join operations as o on o.machineid = m.id;



-- select m.name as machines, d.name as departmentName, o.name as operations from departments as d
-- INNER JOIN ( machines as m 
-- inner join operations as o on o.machineid = m.id) on m.departmentid = d.id
-- where d.id = 1;


SELECT m.name as machinename, m.id as machineId, d.name as departmentName,d.id as departmentId , o.name as operationname, o.id as operationId , d.createdat, d.updatedat FROM  departments as d 
	INNER JOIN (machines as m INNER JOIN operations as o ON o.machineid = m.id) 
	on m.departmentid = d.id order by d.id asc limit  5 offset  1;


SELECT m.name as machinename, m.id as machineId, d.name as departmentName,d.id as departmentId , o.name as operationname, o.id as operationId , d.createdat, d.updatedat FROM  departments as d INNER JOIN (machines as m INNER JOIN operations as o ON o.machineid = m.id) on m.departmentid = d.id   order by m.id ;


SELECT m.name as machinename, m.id as machineId, o.name as operationname, o.id as operationId , m.createdat, m.updatedat FROM  machines as m 
INNER JOIN operations as o ON o.machineid = m.id WHERE m.id = 1;

select * from products;

select * from colorproduct;
select * from products ;
select * from productssku;

--  query product
select p.id as id ,p.name as name, ps.id as skuid ,ps.colorid as colorId, cl.value as color, ps.painttypeid as painttypeId, pt.value as painttype , ps.internalcode , p.description as description, p.cover as cover, p.slug as slug,p.createdat as createdat, p.updatedat as updatedat from products as p 
inner join (productssku as ps INNER JOIN colorproduct AS cl on cl.id = ps.colorid
							   INNER JOIN painttype as pt on pt.id = ps.painttypeid)on ps.productid = p.id where p.id = 1;

-- query skus 
select p.id as id ,p.name as name, ps.id as skuid ,ps.colorid as colorProductId, cl.value as colorProduct, ps.painttypeid as painttypeId, 
cm.id as componentId, cm.name as componentName, clc.id as colorComponentId, clc.value as colorComponent, 
rm.id as rawMaterialid, rm.value as rawMeterial,pt.value as painttype, 
ps.internalcode,ps.createdat as createdat, ps.updatedat as updatedat from productssku as ps 
INNER JOIN colorproduct AS cl on cl.id = ps.colorid
INNER JOIN painttype as pt on pt.id = ps.painttypeid
INNER JOIN products as p on p.id = ps.productid
INNER JOIN (components as cm 
	  INNER JOIN colorproduct as clc on clc.id = cm.colorid
	  INNER JOIN rawmaterial as rm on rm.id = cm.rawmaterialid) on cm.productid = ps.id
where ps.id = 1;

select * from components;
select * from rawmaterial;

select sc.id, c.id as componentid, c.name as componentname, ps.id as skuid, p.name as productname,  d.id as departmentid , d.name as departmentname, 
m.id as machineid , m.name as machinename , o.id as operationid , o.name as operationname, sc.step as step, 
sc.cycletime as cycletime, sc.quantitycycletime as quantitycycletime, sc.workerquantity as workerquantity, 
sc.createdat, sc.updatedat from stepcomponent as sc
INNER JOIN ( components as c
	  INNER JOIN (productssku as ps 
	  	    INNER JOIN products as p on p.id = ps.productid) on c.productid = ps.id ) on c.id = sc.componentid
INNER JOIN (operations as o 
	  INNER JOIN departments as d ON o.departmentid = d.id
	  INNER JOIN machines as m ON o.machineid = m.id) ON sc.operationid = o.id ;

