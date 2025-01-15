select * from productattributes;


select * from productssku;

insert into colorproduct (value,colorcode) values('clear varnish 02','444');
insert into colorproduct (value,colorcode) values('clear varnish 04','555');
insert into colorproduct (value,colorcode) values('clear varnish 06','666');

select * from colorproduct;
select * from painttype;
select * from rawmaterial;

insert into painttype (value) values('waterbase');
insert into rawmaterial (value) values('bew');
insert into rawmaterial (value) values('mdf');

select * from productssku;

select p.id, p.productid, c.values as color, painttype.value as paintType  from productssku as p ,colorproduct as c, painttype 
GROUP BY p.id,c.values, painttype.value;


 +