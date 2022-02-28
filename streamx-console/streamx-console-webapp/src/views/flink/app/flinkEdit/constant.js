
// MySQL、达梦数据库、PostgreSQL、SQLServer、Oracle、Greenplum、TiDB、ClickHouse；
// HBase、MongoDB、Elasticsearch，Hive；
// Kafka；HDFS、FTP、NeuraxOSS、Minio
export const DATA_SOURCE = [
  {
    key: 'ClickHouse',
    name: 'ClickHouse',
    code: `CREATE TABLE table1 (id String,name String
) WITH  (
    'connector' = 'jdbc', 
    'url' = 'jdbc:clickhouse://localhost:8123',
    'table-name' = 'demo_test' ,
    'username' = 'default' ,
    'password' = 'test');
CREATE TABLE table2 (id String,name String
) WITH  (
    'connector' = 'print');
INSERT INTO table2 SELECT id, name FROM table1;`
  },
  {
    key: 'Dameng',
    name: '达梦数据库',
    code: `CREATE TABLE table1 ( id string,name string 
) WITH  ( 
       'connector' = 'jdbc',     
       'url' = 'jdbc:dm://localhost:5236/SYSDBA',    
       'table-name' = 'TEST' ,    
       'username' = 'SYSDBA' ,    
       'password' = 'SYSDBA');
CREATE TABLE table2 ( id string,name string 
) WITH  ( 
       'connector' = 'print');
INSERT INTO table2 SELECT  id,name  FROM table1;`
  },
  {
    key: 'Elasticsearch',
    name: 'Elasticsearch',
    code: `CREATE TABLE table1 (id String,name String
  'connector' = 'kafka',   
  'topic' = 'test',
  'properties.bootstrap.servers' = 'localhost:9092',   
  'properties.group.id' = 'demo-test-group');
CREATE TABLE table2 (id String,name String
) WITH ( 
   'connector' = 'elasticsearch-7', 
   'hosts' = 'http://localhost:9200', 
   'username' = 'elastic',
   'password' = 'elastic123456',
   'index' = 'demo-test' );
INSERT INTO table2 SELECT id,name FROM table1;`
  },
  {
    key: 'Greenplum',
    name: 'Greenplum',
    code: `CREATE TABLE table1 (id string,name string
) WITH   ( 
  'connector' = 'jdbc',     
  'url' = 'jdbc:postgresql://localhost:2345/greenplum',    
  'table-name' = 'test' ,    
  'username' = 'gpadmin' ,    
  'password' = 'gpadmin' );
CREATE TABLE table2 (id string,name string
) WITH   ( 
  'connector' = 'print');
INSERT INTO table2 SELECT id,name FROM table1;`
  },
  {
    key: 'HBase',
    name: 'HBase',
    code: `CREATE TABLE  table1 ( id string,name string
) WITH ( 
       'connector' = 'kafka',   
       'topic' = 'test',
       'properties.bootstrap.servers' = 'localhost:9092',   
       'properties.group.id' = 'demo-test-group');
CREATE TABLE table2 ( id string,name string 
) WITH  (
       'connector' = 'hbase-2.2',  
       'table-name' = 'mytable',  
       'zookeeper.quorum' = 'localhost:2181' ) ;
INSERT INTO table2 SELECT id,name FROM table1;`
  },
  {
    key: 'Hive',
    name: 'Hive',
    code: `CREATE CATALOG myhive WITH (
  'type' = 'hive',
  'default-database' = 'test',
  'hive-conf-dir' = '/usr/local/apache-hive-3.1.2-bin/conf'
);
use CATALOG myhive;
INSERT INTO print SELECT * FROM test;`
  },
  {
    key: 'Kafka',
    name: 'Kafka',
    code: `CREATE TABLE table1 (id String,name String
  'connector' = 'kafka',   
  'topic' = 'test',
  'properties.bootstrap.servers' = 'localhost:9092',   
  'properties.group.id' = 'demo-test-group');
CREATE TABLE table2 (id String,name String
) WITH ( 
   'connector' = 'print');
INSERT INTO table2 SELECT id,name FROM table1;`
  },
  {
    key: 'MongoDB',
    name: 'MongoDB',
    code: `CREATE TABLE  table1 ( id string,name string
) WITH ( 
       'connector' = 'kafka',   
       'topic' = 'test',
       'properties.bootstrap.servers' = 'localhost:9092',   
       'properties.group.id' = 'demo-test-group'');
CREATE TABLE table2 ( id string,name string 
) WITH  ( 
       'connector' = 'mongodb',  
     'host' = 'mongodb://localhost:27017',  
     'database' = 'test', 
     'collection' = 'test') ;
INSERT INTO table2 SELECT id,name FROM table1;`
  },
  {
    key: 'MySQL',
    name: 'MySQL',
    code: `CREATE TABLE table1 (id string,name string
) WITH   (   
       'connector' = 'jdbc',     
       'url' = 'jdbc:mysql://localhost:3306/mysql',    
       'table-name' = 'test' ,    
       'username' = 'demo' ,
       'password' = 'test1234'	);
CREATE TABLE table2 (id string,name string
) WITH   (   
       'connector' = 'print');
INSERT INTO table2 SELECT id,name FROM table1;`
  },
  {
    key: 'Oracle',
    name: 'Oracle',
    code: `CREATE TABLE table1 (id String,name String
)  WITH ( 
       'connector' = 'jdbc',
       'url' = 'jdbc:oracle:thin:@localhost:1521:orcl', 
       'username' = 'oracle',
       'password' = 'oracle1234', 
       'table-name' = 'test');
CREATE TABLE table2 (id String,name String
)  WITH ( 
       'connector' = 'print');
INSERT INTO table2 SELECT id,name FROM table1;`
  },
  {
    key: 'PostgreSQL',
    name: 'PostgreSQL',
    code: `CREATE TABLE table1 (id string,name string
) WITH   ( 
  'connector' = 'jdbc',     
  'url' = 'jdbc:postgresql://localhost:5432/postgres',    
  'table-name' = 'test' ,    
  'username' = 'postgres' ,    
  'password' = 'postgres' );
CREATE TABLE table2 (id string,name string
) WITH   ( 
  'connector' = 'print');
INSERT INTO table2 SELECT id,name FROM table1;`
  },
  {
    key: 'SQLServer',
    name: 'SQLServer',
    code: `CREATE TABLE table1 (id string,name string
) WITH   (  
       'connector' = 'jdbc',     
       'url' = 'jdbc:sqlserver://localhost;databaseName=DataTest',    
       'table-name' = 'dbo.test' ,    
       'username' = 'sa' ,    
       'password' = 'test123' );
CREATE TABLE table2 (id string,name string
) WITH   (  
       'connector' = 'print');
INSERT INTO table2 SELECT id,name FROM table1;`
  },
  {
    key: 'TiDB',
    name: 'TiDB',
    code: `CREATE TABLE table1 (id string,name string
) WITH   (   
       'connector' = 'jdbc',     
       'url' = 'jdbc:mysql://localhost:4000/test',    
       'table-name' = 'test' ,    
       'username' = 'root'  );
CREATE TABLE table2 (id string,name string
) WITH   (   
       'connector' = 'print');
INSERT INTO table2 SELECT id,name FROM table1;`
  }
]

export const CODE_EXAMPLE = [
  {
    key: 'Restful',
    name: 'Restful',
    code: `CREATE FUNCTION restful AS 'com.botech.flinketl.udf.RestfulUdf';
restful(reponse_str,'')`
  },
  {
    key: '加\解密',
    name: '加\解密',
    code: `FROM_BASE64(string)
TO_BASE64(string)`
  },
  {
    key: '分支',
    name: '分支',
    code: `CASE WHEN condition1 THEN result1 (WHEN condition2 THEN result2)* (ELSE result_z) END`
  },
  {
    key: '脱敏',
    name: '脱敏',
    code: `CREATE FUNCTION deSense AS 'com.botech.flinketl.udf.DeSenseUdf';
deSense(desense_str,start,length,'*')`
  },
  {
    key: '字段合并拆分',
    name: '字段合并拆分',
    code: `SPLIT_INDEX(string1, string2, integer1)
CONCAT(string1, string2,...)`
  },
  {
    key: '字段内容清洗',
    name: '字段内容清洗',
    code: `LTRIM(string)  
RTRIM(string)`
  },
  {
    key: '空值转换',
    name: '空值转换',
    code: `IFNULL(input, null_replacement)`
  },
  {
    key: '中文数字转换',
    name: '中文数字转换',
    code: `CREATE FUNCTION chineseToNumber AS 'com.botech.flinketl.udf.ChineseNumberUdf';
chineseToNumber(chinse)`
  },
  {
    key: '日期时间转换',
    name: '日期时间转换',
    code: `DATE_FORMAT(timestamp, string)`
  },
  {
    key: '数据类型转换',
    name: '数据类型转换',
    code: `CAST(value AS type)`
  },
  {
    key: '过滤',
    name: '过滤',
    code: `SELECT * FROM TABLE WHERE filter`
  },
  {
    key: '抽样',
    name: '抽样',
    code: `RAND()`
  },
  {
    key: '去重',
    name: '去重',
    code: `SELECT DISTINCT col1,col2... FROM TABLE WHERE filter`
  }
]

