from datetime import datetime, timezone
from dataclasses import dataclass
from dataclasses_json import dataclass_json


@dataclass_json
@dataclass
class Job:
    jobID: int
    path: str
    filesCount: int
    status: str


@dataclass_json
@dataclass
class Form:
    id: int
    name: str
    extractText: str = ''
    formType: str = ''
    startDate: str = ''
    processTime: float = 0.0
    complexity: float = 0.0


@dataclass_json
@dataclass
class JobUpdate:
    status: str


@dataclass_json
@dataclass
class FormUpdate:
    extract_text: str = ''
    process_time: str = ''
    start_date: str = ''
    form_type: str = ''
    complexity: str = ''
