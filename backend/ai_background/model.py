import os
from rembg import remove
from PIL import Image
import io

def remove_background(input_path: str, output_path:str) -> bool:
    try:
        with open(input_path, 'rb') as i:
            input_image = i.read()
            output_image = remove(input_image)

            with open(output_path, 'wb') as o:
                o.write(output_image)

        return True
    except Exception as e:
        print(f'AI error: {e}')
        return False
