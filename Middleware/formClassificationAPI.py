import requests
import json
from userDefinedTypes import Form, Job, JobUpdate, FormUpdate


def get(url: str, responsetype: str):
    with requests.get(url) as response:
        if response.status_code == 200:
            res = json.loads(response.content)
            result = []
            for item in res:
                if responsetype == 'Job':
                    result.append(Job(item["jobID"], item["path"], item["filesCount"], item['status']))
                elif responsetype == 'Form':
                    result.append(Form(item['id'], item['name'], item['extractText'], item['formType'],
                                       item['complexity']))
            return result


def patch(url: str, data):
    with requests.patch(url=url, data=data, headers={'Accept': 'application/json'}) as response:
        if response.status_code == 200:
            return json.loads(response.content)
