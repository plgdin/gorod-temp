import numpy as np
import cv2

# Sample 200 points from the bezier curve and draw
def bz(p0, p1, p2, p3, t):
    return (1-t)**3 * p0 + 3*(1-t)**2*t * p1 + 3*(1-t)*t**2 * p2 + t**3 * p3

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

ts = np.linspace(0, 1, 60)
seg1 = [bz(p0, c1, c2, p3, t) for t in ts]
seg2 = [bz(p3, c3, c4, p6, t) for t in ts]
seg3 = [bz(p_base, c5, c6, p9, t) for t in ts]
seg4 = [bz(p9, c7, c8, p0, t) for t in ts]

all_pts = np.vstack([seg1, seg2, [p_base], seg3, seg4]).astype(np.int32)

canvas = np.ones((140, 210, 3), dtype=np.uint8) * 255
cv2.fillPoly(canvas, [all_pts], (115, 104, 0)) # BGR for Deep Cyan
cv2.imwrite('scratch/rendered_bezier.png', canvas)
print('Rendered scratch/rendered_bezier.png successfully')
