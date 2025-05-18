/*
  # Insert Indian food data
  
  1. Food Items
    - Insert 50 common Indian food items with nutritional information
    - Each entry includes:
      - Name
      - Calories
      - Protein
      - Carbohydrates
      - Fat
      - Fiber
*/

INSERT INTO food_items (name, calories, protein, carbohydrates, fat, fiber)
VALUES
  ('Masala Dosa', 210, 6, 27, 8, 2),
  ('Idli', 39, 2, 8, 0.1, 0.9),
  ('Sambar', 65, 3.5, 10, 1.2, 3.5),
  ('Aloo Paratha', 260, 5, 36, 10, 2.5),
  ('Butter Chicken', 485, 28, 9, 36, 2),
  ('Palak Paneer', 300, 15, 7, 22, 4),
  ('Chole Bhature', 427, 12, 50, 20, 7),
  ('Dal Makhani', 310, 12, 36, 12, 8),
  ('Chicken Biryani', 400, 20, 46, 14, 2),
  ('Tandoori Roti', 120, 4, 24, 0.5, 1.5),
  ('Paneer Tikka', 275, 18, 4, 20, 1.5),
  ('Malai Kofta', 350, 10, 24, 22, 3),
  ('Vada', 97, 2.5, 14, 3.5, 1.2),
  ('Coconut Chutney', 60, 1, 4, 4.5, 1.5),
  ('Rasam', 85, 2, 17, 1, 2),
  ('Chapati', 85, 3, 18, 0.4, 1.2),
  ('Raita', 75, 3, 5, 4, 0.5),
  ('Upma', 190, 6, 26, 7, 3),
  ('Rajma', 180, 9, 30, 3, 8),
  ('Vegetable Pulao', 280, 6, 46, 8, 3),
  ('Dhokla', 160, 5, 26, 3.5, 3),
  ('Poha', 175, 4, 30, 4, 2),
  ('Pani Puri', 120, 3, 18, 4, 1),
  ('Uttapam', 195, 5, 30, 5, 2.5),
  ('Kachori', 210, 5, 24, 11, 2),
  ('Rava Dosa', 180, 4, 24, 7, 1.5),
  ('Bhindi Masala', 120, 3, 14, 6, 4),
  ('Baingan Bharta', 130, 2.5, 12, 8, 5),
  ('Mutter Paneer', 290, 16, 11, 20, 4),
  ('Aloo Gobi', 145, 4, 17, 7, 5),
  ('Garlic Naan', 300, 9, 50, 7, 2),
  ('Plain Dosa', 155, 4, 24, 5, 1),
  ('Gulab Jamun', 150, 2, 25, 5, 0.5),
  ('Jalebi', 175, 2, 30, 6, 0),
  ('Kheer', 135, 3, 19, 5, 0.5),
  ('Chicken Tikka', 230, 30, 4, 9, 0.5),
  ('Egg Curry', 240, 14, 8, 17, 2),
  ('Seekh Kebab', 275, 22, 6, 18, 1),
  ('Fish Curry', 240, 25, 8, 12, 2),
  ('Pav Bhaji', 290, 8, 42, 10, 6),
  ('Vegetable Samosa', 260, 4, 30, 14, 3),
  ('Pakora', 175, 4, 18, 10, 2),
  ('Bhel Puri', 210, 5, 36, 6, 4),
  ('Sev Puri', 190, 4, 30, 7, 3),
  ('Chaat', 230, 6, 38, 7, 4),
  ('Dahi Vada', 160, 5, 20, 7, 2),
  ('Chana Masala', 240, 11, 38, 6, 10),
  ('Shahi Paneer', 325, 15, 8, 26, 2),
  ('Kadai Paneer', 310, 14, 10, 24, 3),
  ('Naan', 260, 8, 45, 5, 2)
ON CONFLICT (id) DO NOTHING;