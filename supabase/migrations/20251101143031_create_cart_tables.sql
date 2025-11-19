/*
  # Create Shopping Cart Tables

  1. New Tables
    - `cart_items`
      - `id` (uuid, primary key) - Unique identifier for cart item
      - `user_id` (uuid, nullable) - Reference to authenticated user (null for guest carts)
      - `session_id` (text) - Browser session ID for guest cart persistence
      - `product_id` (text) - Product identifier
      - `product_name` (text) - Product name
      - `product_collection` (text) - Collection name
      - `selected_frame` (text) - Selected frame variant
      - `selected_lens` (text) - Selected lens type
      - `selected_color` (text) - Selected color name
      - `color_index` (integer) - Index of selected color
      - `price` (text) - Product price
      - `quantity` (integer) - Quantity in cart
      - `image_url` (text) - Product image URL
      - `created_at` (timestamptz) - When item was added to cart
      - `updated_at` (timestamptz) - Last update time

  2. Security
    - Enable RLS on `cart_items` table
    - Add policies for users to manage their own cart items
    - Add policies for guest users to manage cart by session_id
*/

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  product_id text NOT NULL,
  product_name text NOT NULL,
  product_collection text NOT NULL,
  selected_frame text NOT NULL,
  selected_lens text NOT NULL,
  selected_color text NOT NULL,
  color_index integer NOT NULL DEFAULT 0,
  price text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to view their own cart items
CREATE POLICY "Users can view own cart items"
  ON cart_items
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for authenticated users to insert their own cart items
CREATE POLICY "Users can insert own cart items"
  ON cart_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for authenticated users to update their own cart items
CREATE POLICY "Users can update own cart items"
  ON cart_items
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for authenticated users to delete their own cart items
CREATE POLICY "Users can delete own cart items"
  ON cart_items
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for anonymous users to view cart by session_id
CREATE POLICY "Anonymous users can view cart by session"
  ON cart_items
  FOR SELECT
  TO anon
  USING (session_id = current_setting('request.jwt.claims', true)::json->>'session_id');

-- Policy for anonymous users to insert cart items by session_id
CREATE POLICY "Anonymous users can insert cart by session"
  ON cart_items
  FOR INSERT
  TO anon
  WITH CHECK (session_id = current_setting('request.jwt.claims', true)::json->>'session_id');

-- Policy for anonymous users to update cart items by session_id
CREATE POLICY "Anonymous users can update cart by session"
  ON cart_items
  FOR UPDATE
  TO anon
  USING (session_id = current_setting('request.jwt.claims', true)::json->>'session_id')
  WITH CHECK (session_id = current_setting('request.jwt.claims', true)::json->>'session_id');

-- Policy for anonymous users to delete cart items by session_id
CREATE POLICY "Anonymous users can delete cart by session"
  ON cart_items
  FOR DELETE
  TO anon
  USING (session_id = current_setting('request.jwt.claims', true)::json->>'session_id');

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_session_id ON cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_created_at ON cart_items(created_at DESC);