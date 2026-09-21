import cv2
import numpy as np

img_path = r'C:\Users\acer\.gemini\antigravity-ide\brain\d09175c4-b4aa-4bd4-a87d-e5a8f474f6ab\.user_uploaded\media_1790012064646.png'
im = cv2.imread(img_path)
gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
mask = (gray < 70).astype(np.uint8)

contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
cnt = max(contours, key=cv2.contourArea)
x, y, w, h = cv2.boundingRect(cnt)

pts = (cnt[:, 0, :] - [x, y]).astype(float)

# Let's approximate polygon with high fidelity
epsilon = 0.5
approx = cv2.approxPolyDP(cnt, epsilon, True)
pts_approx = approx[:, 0, :] - [x, y]

# Create SVG path
d_cmds = [f"M {pts_approx[0][0]} {pts_approx[0][1]}"]
for p in pts_approx[1:]:
    d_cmds.append(f"L {p[0]} {p[1]}")
d_cmds.append("Z")
d_str = " ".join(d_cmds)

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="none">
  <path d="{d_str}" fill="currentColor" />
</svg>'''

with open('public/icons/gorod-swoosh.svg', 'w') as f:
    f.write(svg_content)

print(f"Successfully generated public/icons/gorod-swoosh.svg with viewBox 0 0 {w} {h} ({len(pts_approx)} points)")
