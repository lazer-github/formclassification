from formClassificationAPI import get, patch
from userDefinedTypes import JobUpdate, FormUpdate


sampleget = {'http://localhost:8000/api/jobs': 'Job',   # Get all job details
             'http://localhost:8000/api/jobs/1': 'Job',     # Get specific job details
             'http://localhost:8000/api/jobs?status=completed': 'Job',  # Get job with completed status(created, inprogress)
             'http://localhost:8000/api/jobs/7/forms': 'Form'   # Get forms associated with specific job
             }
for key, value in sampleget.items():
    print(get(key, value))

samplePatch = {'http://localhost:8000/api/jobs/5': JobUpdate('INPROGRESS'),     # Update Job status
               # Update form details
               'http://localhost:8000/api/forms/1': FormUpdate(extract_text='DUMMY01', process_time='3.5', form_type='UnClassified')}
for key, value in samplePatch.items():
    print(patch(key, value.to_dict()))
