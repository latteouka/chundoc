## reader

```
This is the first line,Line1
This is the second line,Line2
This is the third line,Line3
```

### read to list

```py
import csv

with open('file.csv', newline='') as f:
    reader = csv.reader(f)
    data = list(reader)

print(data)

# [['This is the first line', 'Line1'], ['This is the second line', 'Line2'], ['This is the third line', 'Line3']]
```

### read to tuple

```py
import csv

with open('file.csv', newline='') as f:
    reader = csv.reader(f)
    data = [tuple(row) for row in reader]

print(data)

# [('This is the first line', 'Line1'), ('This is the second line', 'Line2'), ('This is the third line', 'Line3')]
```
