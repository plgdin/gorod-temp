import numpy as np
from scipy.optimize import minimize
import cv2

# Load original mask
img_path = r'C:\Users\acer\.gemini\antigravity-ide\brain\d09175c4-b4aa-4bd4-a87d-e5a8f474f6ab\.user_uploaded\media_1790012064646.png'
im = cv2.imread(img_path)
gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
mask = (gray < 70).astype(np.uint8)

contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
cnt = max(contours, key=cv2.contourArea)
x, y, w, h = cv2.boundingRect(cnt)
pts = (cnt[:, 0, :] - [x, y]).astype(float)
pts[:, 0] *= 200.0 / w
pts[:, 1] *= 130.0 / h

# Let's find best control points for:
# Outer: P0=(198, 2) -> P1=(c1x, c1y), P2=(c2x, c2y) -> P3=(0, 84)
# Turn:  P3=(0, 84) -> P4=(c3x, c3y), P5=(c4x, c4y) -> P6=(31, 128.5)
# Base:  L (104, 128.5)
# Inner turn: (104, 128.5) -> P7, P8 -> P9=(29.5, 77)
# Inner sweep: P9=(29.5, 77) -> P10, P11 -> P0=(198, 2)

# Sample 100 bezier points and compute distance to contour
def bezier_point(p0, p1, p2, p3, t):
    return (1-t)**3 * p0 + 3*(1-t)**2*t * p1 + 3*(1-t)*t**2 * p2 + t**3 * p3

# Let's write a script that outputs the best Bezier path:
p0 = np.array([198.0, 2.0])
p3 = np.array([0.0, 84.0])
p6 = np.array([31.0, 128.5])
p_base = np.array([104.0, 128.5])
p9 = np.array([29.5, 77.0])

c1 = np.array([120.0, 8.0])
c2 = np.array([35.0, 36.0])

c3 = np.array([-1.0, 102.0])
c4 = np.array([12.0, 120.0])

c5 = np.array([68.0, 120.0])
c6 = np.array([33.0, 102.0])

c7 = np.array([28.0, 52.0])
c8 = np.array([115.0, 14.0])

path_d = f"M {p0[0]} {p0[1]} C {c1[0]} {c1[1]}, {c2[0]} {c2[1]}, {p3[0]} {p3[1]} C {c3[0]} {c3[1]}, {c4[0]} {c4[1]}, {p6[0]} {p6[1]} L {p_base[0]} {p_base[1]} C {c5[0]} {c5[1]}, {c6[0]} {c6[1]}, {p9[0]} {p9[1]} C {c7[0]} {c7[1]}, {c8[0]} {c8[1]}, {p0[0]} {p0[1]} Z"

svg_clean = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 130" fill="none">
  <path d="{path_d}" fill="currentColor" />
</svg>'''

with open('public/icons/gorod-brand-swoosh.svg', 'w') as f:
    f.write(svg_clean)

print("Saved public/icons/gorod-brand-swoosh.svg with pristine Bezier curve:")
print(path_d)
