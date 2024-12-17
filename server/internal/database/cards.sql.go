// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: cards.sql

package database

import (
	"context"
	"database/sql"
)

const createCard = `-- name: CreateCard :one
INSERT INTO cards(id, created_at, updated_at, title, description, last_tested)
VALUES (
    gen_random_uuid(),
    NOW(),
    NOW(),
    $1,
    $2,
    $3
)
RETURNING id, created_at, updated_at, title, description, last_tested
`

type CreateCardParams struct {
	Title       string
	Description string
	LastTested  sql.NullTime
}

func (q *Queries) CreateCard(ctx context.Context, arg CreateCardParams) (Card, error) {
	row := q.db.QueryRowContext(ctx, createCard, arg.Title, arg.Description, arg.LastTested)
	var i Card
	err := row.Scan(
		&i.ID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Title,
		&i.Description,
		&i.LastTested,
	)
	return i, err
}

const getCards = `-- name: GetCards :many
SELECT id, created_at, updated_at, title, description, last_tested FROM cards
ORDER BY created_at
`

func (q *Queries) GetCards(ctx context.Context) ([]Card, error) {
	rows, err := q.db.QueryContext(ctx, getCards)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Card
	for rows.Next() {
		var i Card
		if err := rows.Scan(
			&i.ID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.Title,
			&i.Description,
			&i.LastTested,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
