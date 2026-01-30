create extension if not exists "uuid-ossp";

create table users (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null unique,
  age integer not null,
  location text not null,
  password text not null,
  created_at timestamp default now()
);
