import pandas as pd
from datetime import datetime

# Create a DataFrame for 100 reference numbers
data = {
    "ref_number": range(1001, 1101),
    "is_assigned": [False] * 100,
    "assigned_to": [None] * 100,
    "start_time": [None] * 100,
    "end_time": [None] * 100,
    "scanned_items": [None] * 100,
    "3d_model_status": ["not started"] * 100
}

df = pd.DataFrame(data)

# Save to CSV
df.to_csv("/mnt/data/reference_numbers.csv", index=False)
print("Dataset created: reference_numbers.csv")
