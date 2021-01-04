from datetime import datetime, timezone
import requests
import json

defaultURL = 'https://jsonplaceholder.typicode.com/todos?_limit=1'
defaultURL = 'http://localhost:8000/api/jobs'   # get job details
defaultURL = 'http://localhost:8000/api/jobs?status=completed'     # created | inprogress | completed --> get jobdetails based on status.
defaultURL = 'http://localhost:8000/api/jobs/3/forms'   # get forms attached
defaultURL = 'http://localhost:8000/api/forms/1'


def get(url=defaultURL):
    with requests.get(url) as response:
        if response.status_code == 200:
            return json.loads(response.content)


def patch(url, data):
    with requests.patch(url=url, data=data, headers={'Accept': 'application/json'}) as response:
        if response.status_code == 200:
            return json.loads(response.content)


print(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
print(get())    # get job details
data = {"status": "INPROGRESS"}
print(patch('http://localhost:8000/api/jobs/5', data))  # Update job status

#   req.body.extract_text, req.body.process_time,req.body.start_date,req.body.form_type, req.params.id
#   2020-12-31 13:35:49
print(patch('http://localhost:8000/api/forms/1',
            {'extract_text': 'DUMMY', 'process_time': '3.5', 'start_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
             'form_type': 'TEST'}))
