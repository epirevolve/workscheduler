drop table if exists users;
create table users (
    id integer primary key autoincrement,
    login_id text not null,
    name text not null,
    password text not null,
    role text not null
);

drop table if exists user_relations;
create table user_relations (
    id integer primary key autoincrement,
    user_1 integer not null,
    user_2 integer not null,
    affinity real not null,
    looked_by integer not null
);

drop table if exists roles;
create table roles (
    uuid text primary key,
    name text not null,
    is_admin integer not null
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