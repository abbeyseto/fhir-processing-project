-- Create a keyspace
CREATE KEYSPACE IF NOT EXISTS saffron WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' };

USE saffron;

-- Create a table
CREATE TABLE IF NOT EXISTS bundle2_queues (
  id UUID PRIMARY KEY,
  entry TEXT,
  inserted_at TIMESTAMP
);


-- Insert some data
INSERT INTO bundle2_queues
(id, entry)
VALUES
(uuid(), '{"name": "John Doe", "age": 25}');

INSERT INTO bundle2_queues
(id, entry)
VALUES
(uuid(), '{"name": "Jane Doe", "age": 36}');

INSERT INTO bundle2_queues
(id, entry)
VALUES
(uuid(), '{"name": "John Smith", "age": 21}');


-- create table control_table
CREATE TABLE IF NOT EXISTS control_table (
  control_id INT PRIMARY KEY,
  last_processed_entry_id UUID
);

