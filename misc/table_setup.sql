create or replace table stackables (
    id smallint NOT NULL AUTO_INCREMENT PRIMARY KEY,
    item_id int NOT NULL,
    CONSTRAINT `fk_item_stackable`
    FOREIGN KEY (item_id) REFERENCES items(id)
);