import re
import numpy as np

with open('public/icons/gorod-swoosh-smooth.svg') as f:
    text = f.read()

d_match = re.search(r'd="([^"]+)"', text)
d = d_match.group(1)
tokens = d.replace('M', '').replace('L', '').replace('Z', '').strip().split()
pts = np.array([float(x) for x in tokens]).reshape(-1, 2)

print('Total points:', len(pts))
print('Top tip:', pts[0])
idx_left = np.argmin(pts[:, 0])
print('Leftmost:', pts[idx_left], 'at idx', idx_left)
flat_pts = np.where(pts[:, 1] > 127.5)[0]
print('Bottom-left flat:', pts[flat_pts[0]], 'at idx', flat_pts[0])
print('Bottom-right flat:', pts[flat_pts[-1]], 'at idx', flat_pts[-1])
idx_inner_knee = np.argmin(pts[flat_pts[-1]:, 0]) + flat_pts[-1]
print('Inner knee:', pts[idx_inner_knee], 'at idx', idx_inner_knee)
