from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Mock database
users_db = {}
tasks_db = {}

# Models
class User(BaseModel):
    id: int
    name: str
    email: str

class Task(BaseModel):
    id: int
    user_id: int
    title: str
    description: str

@app.get("/message/{id}")
async def get_message(id: int):
    return f"hello world - {id}"

# Routes for Users
@app.post("/users/", status_code=201)
async def create_user(user: User):
    if user.id in users_db:
        raise HTTPException(status_code=400, detail="User already exists")
    users_db[user.id] = user
    return {"message": "User created successfully", "user": user}

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    user = users_db.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Routes for Tasks
@app.post("/tasks/", status_code=201)
async def create_task(task: Task):
    if task.user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    tasks_db.setdefault(task.user_id, []).append(task)
    return {"message": "Task created successfully", "task": task}

@app.get("/tasks/{user_id}", response_model=List[Task])
async def get_tasks(user_id: int):
    if user_id not in tasks_db:
        return []
    return tasks_db[user_id]