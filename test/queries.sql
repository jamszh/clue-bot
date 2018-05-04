create or replace view hard_common
AS
SELECT i.id, i.item
FROM items i
WHERE (i.level = 'hard' or i.level = 'all') and i.rarity = 'common'
;


create or replace view pages
	AS
	SELECT i.id, i.item
	FROM items i
	WHERE (i.rarity = 'pages')
;


create or replace view hard_unique
	AS
	SELECT i.id, i.item
	FROM items i
	WHERE (i.level = 'hard' or i.level = 'all') and i.rarity = 'unique'
;