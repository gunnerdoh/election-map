import pandas as pd

try:
    df = pd.read_csv('data-refinement/og.csv', encoding='utf-8', delimiter=',')
    print("CSV loaded successfully!")
    print(df.head()) 
    print(type(df))
except Exception as e:
    print(f"Error loading CSV: {e}")
    exit()

try:
    grouped = df.groupby(['year', 'state', 'state_po', 'county_name', 'county_fips', 'office', 'candidate', 'party'])
    print("Grouping successful!")
except Exception as e:
    print(f"Error during grouping: {e}")
    exit()

agg = grouped.agg({
    'candidatevotes': 'sum',
    'totalvotes': 'first', 
    'version': 'first',    
    'mode': lambda x: 'TOTAL'  
}).reset_index()

# Save the transformed data back to a CSV file
try:
    agg.to_csv('transformed_dataset.csv', index=False, quoting=1)
except Exception as e:
    print(f"Error saving CSV: {e}")