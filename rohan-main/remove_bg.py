from PIL import Image

def remove_white_bg(input_path, output_path, threshold=200):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        # item is (R, G, B, A)
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            # It's whiteish, make it transparent
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print("Image processed successfully!")

try:
    remove_white_bg("hero.png", "hero-transparent.png", threshold=230)
except Exception as e:
    print(f"Error processing image: {e}")
