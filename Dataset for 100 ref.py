import pandas as pd
from datetime import datetime

# File path to save the DataFrame
file_path = "reference_numbers.csv"


# Function to initialize the reference number table
def initialize_table():
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
    df.to_csv(file_path, index=False)
    print(f"Dataset initialized and saved to {file_path}")


# Function to load the table from CSV
def load_table():
    return pd.read_csv(file_path)


# Function to assign a reference number to a customer
def assign_ref_number(customer_id):
    df = load_table()

    # Find the first unassigned reference number
    available_row = df[df["is_assigned"] == False].head(1)

    if available_row.empty:
        print("No available reference numbers.")
        return None

    ref_number = available_row["ref_number"].values[0]
    df.loc[df["ref_number"] == ref_number, ["is_assigned", "assigned_to", "start_time"]] = [True, customer_id,
                                                                                            datetime.now()]

    # Save the updated table
    df.to_csv(file_path, index=False)
    print(f"Assigned reference number {ref_number} to customer {customer_id}")
    return ref_number


# Function to release a reference number when the session is over
def release_ref_number(ref_number):
    df = load_table()

    if ref_number not in df["ref_number"].values:
        print(f"Reference number {ref_number} not found.")
        return

    # Mark as available again
    df.loc[df["ref_number"] == ref_number, ["is_assigned", "assigned_to", "start_time", "end_time", "scanned_items",
                                            "3d_model_status"]] = [False, None, None, None, None, "not started"]
    df.to_csv(file_path, index=False)
    print(f"Reference number {ref_number} is now available again.")

# Initialize the table (run this once)
# initialize_table()

# Example usage:
# Assign a reference number
# customer_id = "Customer123"
# ref_number = assign_ref_number(customer_id)

# Release the reference number when the session is over
# release_ref_number(ref_number)
