-- Add item reference and servings to foods
ALTER TABLE foods
  ADD COLUMN food_item_id INT NULL,
  ADD COLUMN servings DECIMAL(10,2) DEFAULT 1,
  ADD FOREIGN KEY (food_item_id) REFERENCES food_items(id) ON DELETE SET NULL;
