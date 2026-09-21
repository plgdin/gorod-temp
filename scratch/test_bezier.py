import numpy as np
from scipy.optimize import minimize
import cv2

# Target points from contour
# Outer curve from (198, 0) -> (0, 84) -> (31, 128.5)
# Flat base: (31, 128.5) -> (104, 128.5)
# Inner curve: (104, 128.5) -> (29, 77) -> (198, 0)

# Let's define cubic beziers:
# P0 = (198, 0)
# Outer:
# Curve 1: (198, 0) to (0, 84) with control points C1, C2
# Curve 2: (0, 84) to (31, 128.5) with control points C3, C4
# Base: Line to (104, 128.5)
# Inner:
# Curve 3: (104, 128.5) to (29, 77) with control points C5, C6
# Curve 4: (29, 77) to (198, 0) with control points C7, C8

# Let's test a clean, handcrafted, high-precision SVG path:
svg_bezier = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 130" fill="none">
  <path d="M 198 2 C 145 7 70 24 22 55 C 4 67 -2 78 0 88 C 2 98 12 115 31 128.5 L 104 128.5 C 72 118 42 100 31 82 C 24 70 28 58 45 46 C 78 24 140 10 198 2 Z" fill="currentColor" />
</svg>'''

with open('public/icons/gorod-swoosh-bezier.svg', 'w') as f:
    f.write(svg_bezier)

# Let's render both to compare with the mask
canvas = np.ones((130, 200, 3), dtype=np.uint8) * 255
# Render bezier
from xml.dom import minidom
print('Saved gorod-swoosh-bezier.svg')
