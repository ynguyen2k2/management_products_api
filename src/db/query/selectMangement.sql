select * from painttype;
select * from rawmaterial;

select * from productssku;

select p.id, p.productid, c.values as color, painttype.value as paintType  from productssku as p ,colorproduct as c, painttype 
GROUP BY p.id,c.values, painttype.value;