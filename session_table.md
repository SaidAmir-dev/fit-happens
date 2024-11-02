| Column Name      | Data Type    | Description                                                  |
| ---------------- | ------------ | ------------------------------------------------------------ |
| `ref_number`     | Integer/String | Unique reference number for each session.                   |
| `is_assigned`    | Boolean      | Indicates if the reference number is currently in use (`true`) or available (`false`). |
| `assigned_to`    | String       | (Optional) Customer ID or a placeholder for user information, if you’re tracking customers individually. |
| `start_time`     | DateTime     | (Optional) Timestamp of when the session started, useful for session timeout. |
| `end_time`       | DateTime     | (Optional) Timestamp of when the session ended, useful for session duration tracking. |
| `scanned_items`  | JSON/Array   | List of items scanned by the user during this session.       |
| `3d_model_status` | String      | Status of 3D model capture (e.g., "not started," "in progress," "completed"). |
    