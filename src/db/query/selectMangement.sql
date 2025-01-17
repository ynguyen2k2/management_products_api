-- select * from painttype;
-- select * from rawmaterial;

-- select * from productssku;

-- select p.id, p.productid, c.values as color, painttype.value as paintType  from productssku as p ,colorproduct as c, painttype 
-- GROUP BY p.id,c.values, painttype.value;


-- select m.name as machines, d.name as departments, o.name as operations from departments as d
-- INNER JOIN  machines as m on m.departmentid = d.id
-- inner join operations as o on o.machineid = m.id;



select m.name as machines, d.name as departmentName, o.name as operations from departments as d
INNER JOIN ( machines as m 
inner join operations as o on o.machineid = m.id) on m.departmentid = d.id
where d.id = 1;


SELECT m.name as machinename, m.id as machineId, d.name as departmentName,d.id as departmentId , o.name as operationname, o.id as operationId , d.createdat, d.updatedat FROM  departments as d 
	INNER JOIN (machines as m INNER JOIN operations as o ON o.machineid = m.id) 
	on m.departmentid = d.id order by d.id asc limit  5 offset  1;