import csv
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
input_path = os.path.join(script_dir, 'test1.csv')
output_path = os.path.join(script_dir, 'test1_cleaned.csv')

print("Looking for file at:", input_path)

rows = []
with open(input_path, 'r') as file:
    reader = csv.DictReader(file)
    header = reader.fieldnames
    
    for row in reader:
        row['year'] = int(row['year'])
        row['county_fips'] = str(int(float(row['county_fips'])))
        row['candidatevotes'] = int(row['candidatevotes'])
        row['totalvotes'] = int(row['totalvotes'])
        row['version'] = int(row['version'])
        rows.append(row)

with open(output_path, 'w', newline='') as file:
    writer = csv.DictWriter(file, fieldnames=header, quoting=csv.QUOTE_NONNUMERIC)
    writer.writeheader()
    writer.writerows(rows)

print(f"Cleaned file saved to: {output_path}")