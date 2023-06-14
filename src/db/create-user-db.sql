drop database if exists test_db;
    create database if not exists test_db;
        Use test_db

drop table if exists user;

create table if not exists user;
(
    id         int primary key auto incrément,
    username   varchar(25) UNIQUE NOT NULL,
    password char(60) not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(100) not null,
    role enum('Admin', 'SuperUser') Defaut 'SuperUser',
    age int(11) default 0
)