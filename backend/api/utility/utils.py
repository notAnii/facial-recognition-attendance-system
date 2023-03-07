from datetime import date, datetime

def getTime(t):
    if len(t) == 3:
        t = '0' + t
        return t[:2] + ':' + t[2:]
    else:
        return t[:2] + ':' + t[2:]

def build_json(result, column_names):
    json_data = []
    for row in result:
        json_row = {}
        for i, column_name in enumerate(column_names):
            json_row[column_name] = row[i]
        json_data.append(json_row)
    return json_data

def get_today_date():
    return date.today()

def get_current_time():
    now = datetime.now()
    return now.strftime("%H:%M")
