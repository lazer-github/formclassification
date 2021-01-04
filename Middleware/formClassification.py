# get job details   'http://localhost:8000/api/jobs'
# Get job details based on status.created | inprogress | completed   'http://localhost:8000/api/jobs?status=completed'
# Get forms attached    'http://localhost:8000/api/jobs/3/forms'
# Get forms details 'http://localhost:8000/api/forms/1'

from datetime import datetime, timezone
import requests
import json
from dataclasses import dataclass
from dataclasses_json import dataclass_json


@dataclass_json
@dataclass
class JobUpdate:
    status: str


@dataclass_json
@dataclass
class FormUpdate:
    extract_text: str = ''
    process_time: str = ''
    start_date: str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    form_type: str = ''


def get(url='https://jsonplaceholder.typicode.com/todos?_limit=1'):
    with requests.get(url) as response:
        if response.status_code == 200:
            return json.loads(response.content)


def patch(url, data):
    with requests.patch(url=url, data=data, headers={'Accept': 'application/json'}) as response:
        if response.status_code == 200:
            return json.loads(response.content)


print(get('http://localhost:8000/api/jobs'))
print(get('http://localhost:8000/api/jobs/1'))

# Update job status
print(patch('http://localhost:8000/api/jobs/5', JobUpdate('INPROGRESS').to_dict()))

#   update form details
print(patch('http://localhost:8000/api/forms/1',
            FormUpdate(extract_text='DUMMY01', process_time='3.5', form_type='UnClassified').to_dict()))
