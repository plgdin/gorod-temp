import re
import numpy as np
import cv2

with open('public/icons/gorod-swoosh-smooth.svg') as f:
    text = f.read()

d_match = re.search(r'd="([^"]+)"', text)
d = d_match.group(1)
tokens = d.replace('M', '').replace('L', '').replace('Z', '').strip().split()
pts = np.array([float(x) for x in tokens]).reshape(-1, 2).astype(np.int32)

canvas = np.ones((130, 200, 3), dtype=np.uint8) * 255
cv2.fillPoly(canvas, [pts], (115, 104, 0)) # BGR for #006873
cv2.imwrite('scratch/rendered_swoosh.png', canvas)
print('Rendered scratch/rendered_swoosh.png successfully')
