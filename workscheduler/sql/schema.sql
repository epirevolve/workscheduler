drop table if exists users;
create table users (
    id integer primary key autoincrement,
    login_id text not null,
    name text not null,
    password text not null,
    role integer
);
insert into users (login_id, name, password, role) values ('admin', '管理者', 'minAd', 9);
insert into users (login_id, name, password, role) values ('user', 'ユーザ', 'user', 1);

drop table if exists user_relations_subject;
create table user_relations_subject (
    id integer primary key autoincrement,
    user integer not null,
    partner integer not null,
    relation integer not null
);

drop table if exists user_relations_object;
create table user_relations_object (
    id integer primary key autoincrement,
    user_1 integer not null,
    user_2 integer not null,
    relation integer not null
);

drop table if exists roles;
create table roles (
    id integer primary key autoincrement,
    name text not null
);

drop table if exists skills;
create table skills (
    id integer primary key autoincrement,
    name text not null,
    score integer not null
);

drop table if exists schedules;
create table schedules (
    id integer primary key autoincrement,
    yearmonth integer not null,
    score integer not null
);

drop table if exists schedule_items;
create table schedule_items (
    id integer primary key autoincrement,
    schedule integer not null,
    date integer not null,
    user integer not null,
    state integer
);