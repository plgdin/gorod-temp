import cv2
import numpy as np
from scipy.interpolate import splprep, splev

img_path = r'C:\Users\acer\.gemini\antigravity-ide\brain\d09175c4-b4aa-4bd4-a87d-e5a8f474f6ab\.user_uploaded\media_1790012064646.png'
im = cv2.imread(img_path)
gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
mask = (gray < 70).astype(np.uint8)

contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
cnt = max(contours, key=cv2.contourArea)
x, y, w, h = cv2.boundingRect(cnt)

pts = cnt[:, 0, :] - [x, y]

# Start from top tip
idx_top_tip = np.argmax(pts[:, 0] - pts[:, 1]*0.5)
pts_ordered = np.roll(pts, -idx_top_tip, axis=0)

# Resample smoothly with spline
tck, u = splprep([pts_ordered[:, 0], pts_ordered[:, 1]], s=20, per=True)
u_new = np.linspace(0, 1, 150)
x_new, y_new = splev(u_new, tck)

d_smooth = f"M {x_new[0]:.2f} {y_new[0]:.2f} " + " ".join([f"L {xi:.2f} {yi:.2f}" for xi, yi in zip(x_new[1:], y_new[1:])]) + " Z"

# Scale to 200 x 130 viewBox for clean scaling
scale_x = 200.0 / w
scale_y = 130.0 / h

d_scaled = f"M {x_new[0]*scale_x:.2f} {y_new[0]*scale_y:.2f} " + " ".join([f"L {xi*scale_x:.2f} {yi*scale_y:.2f}" for xi, yi in zip(x_new[1:], y_new[1:])]) + " Z"

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 130" fill="none">
  <path d="{d_scaled}" fill="currentColor" />
</svg>'''

with open('public/icons/gorod-swoosh-smooth.svg', 'w') as f:
    f.write(svg_content)

print("Saved public/icons/gorod-swoosh-smooth.svg successfully!")
