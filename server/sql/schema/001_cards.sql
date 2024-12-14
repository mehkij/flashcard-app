-- +goose Up
CREATE TABLE cards(
    id UUID PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    last_tested TIMESTAMP
);

-- +goose Down
DROP TABLE cards;
