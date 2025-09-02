from fastapi import FastAPI, HTTPException
import os
import requests
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

#vite is at http://127.0.0.1:5173
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["GET"],    
    allow_headers=["*"],
)
load_dotenv()

GRID_STATUS_API_BASE = "https://api.gridstatus.io/v1/datasets/"

DAY_AHEAD = "isone_lmp_day_ahead_hourly/query?"
REAL_TIME = "isone_lmp_real_time_5_min/query?"

EARLIEST_DATE = "2021-01-12"


#date in yyyy-mm-dd format
@app.get("/dayahead/{date}")
def get_daybefore_data(date: str):

    #validate input
    if(not is_valid_date(date)):
        raise HTTPException(status_code=400, detail="Invalid date entry.")
    
    #build api url
    url = build_url_string(date, DAY_AHEAD)

    #make get request
    try:
        data = requests.get(url).json()['data']
    except:
        raise HTTPException(400, "Grid Status DAYAHEAD API call failed.")
    
    final_data = []
    #prep data
    for i in range(len(data)):
        lmp = data[i]["lmp"]
        final_data.append(lmp)

    return final_data

#date in yyyy-mm-dd format
@app.get("/realtime/{date}")
def get_realtime_data(date: str):

    #validate input
    if(not is_valid_date(date)):
        raise HTTPException(status_code=400, detail="Invalid date entry.")
    
    #build api url
    url = build_url_string(date, REAL_TIME)
    
    #make get request
    try:
        data = requests.get(url).json()['data']
    except:
        raise HTTPException(400, "Grid Status REALTIME API call failed.")
    
    final_data = []
    #prep data
    for i in range(len(data)):
        lmp = data[i]["lmp"]
        final_data.append(lmp)

    return final_data


def build_url_string(date: str, database_type: str) -> str:

    #begin creating api url
    url = GRID_STATUS_API_BASE + database_type

    #get next day
    next_date = get_next_day(date)

    #add dates to url
    url += "start_time=" + date + "&end_time=" + next_date

    #add other specifications
    url += "&timezone=market&filter_column=location&filter_value=.Z.NEMASSBOST&columns=interval_start_utc,lmp,location&order=asc&limit=300&api_key="
    
    #add api key
    url += os.getenv("GRID_STATUS_API_KEY", "NOKEY")

    return url


def is_number(str: str) -> bool:
    try:
        float(str)
        return True
    except ValueError:
        return False

def is_valid_date(date: str) -> bool:

    #check string
    isinstance(date, str)

    #check correct length
    if(len(date) != 10): return False

    #check correct formatting
    if(date[4] != "-" or date[7] != "-"): return False

    #check date is numbers
    date_list = date.split("-")
    if(not is_number(date_list[0]) or not is_number(date_list[1]) or not is_number(date_list[2])): return False

    #check date is older than earliest date that we have data for
    earliest_date_list = EARLIEST_DATE.split("-")
    if(int(date_list[0]) < int(earliest_date_list[0])): return False
    if(int(date_list[0]) == int(earliest_date_list[0]) and int(date_list[1]) < int(earliest_date_list[1])): return False
    if(int(date_list[0]) == int(earliest_date_list[0]) and int(date_list[1]) == int(earliest_date_list[1]) and int(date_list[2]) < int(earliest_date_list[2])): return False

    return True

def get_next_day(date: str) -> str:

    DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    date_list = date.split("-")
    year = int(date_list[0])
    month = int(date_list[1])
    day = int(date_list[2])

    #case 0a: leap year
    if(day == 28 and month == 2 and year % 4 == 0):
        return build_date_string(year, 2, 29)
    
    #case 0b: leap year
    if(day == 29 and month == 2):
        return build_date_string(year, 3, 1)

    month_ind = month - 1
    #simple case: next day, same month & year
    if(day < DAYS_PER_MONTH[month_ind]):
        day += 1
        return build_date_string(year, month, day)

    #case 2: next day is new month, same year
    if(day == DAYS_PER_MONTH[month_ind] and month < 12):
        day = 1
        month += 1
        return build_date_string(year, month, day)
    
    #case 3: new years!
    if(day == 31 and month == 12):
        day = 1
        month = 1
        year += 1
        return build_date_string(year, month, day)
    
    #should never reach here
    return None    
    


def build_date_string(year: int, month: int, day: int) -> str:

    date = str(year) + "-"

    if(len(str(month)) == 1):
        date += "0" + str(month)
    else:
        date += str(month)

    date += "-"

    if(len(str(day)) == 1):
        date += "0" + str(day)
    else:
        date += str(day)

    return date

    







