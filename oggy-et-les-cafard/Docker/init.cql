CREATE KEYSPACE IF NOT EXISTS hingage
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
