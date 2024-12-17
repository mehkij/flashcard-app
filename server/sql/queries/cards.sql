-- name: CreateCard :one
INSERT INTO cards(id, created_at, updated_at, title, description, last_tested)
VALUES (
    gen_random_uuid(),
    NOW(),
    NOW(),
    $1,
    $2,
    $3
)
RETURNING *;

-- name: GetCards :many
SELECT * FROM cards
ORDER BY created_at;
