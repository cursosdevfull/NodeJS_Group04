from locust import TaskSet, HttpLocust, task
import json

class UserBehaviorA(TaskSet):
  def on_start(self):
    response = self.client.post("/auth/login", {"email": "carmela@correo.com", "password": "123"})
    print("================")
    print(response.json())
    self.accessToken = response.json()["accessToken"]

  @task(10)
  def list_users(self):
    self.client.get("/users", headers={"Authorization": "Bearer {}".format(self.accessToken)})

  @task(5)
  def list_drivers(self):
    self.client.get("/drivers", headers={"Authorization": "Bearer {}".format(self.accessToken)})  
  
  @task(2)
  def list_medics(self):
    self.client.get("/medics", headers={"Authorization": "Bearer {}".format(self.accessToken)})

class TestA(HttpLocust):
    task_set = UserBehaviorA
    min_wait = 2000
    max_wait = 3000


class UserBehaviorB(TaskSet):
  def on_start(self):
    response = self.client.post("/auth/login", {"email": "carmela@correo.com", "password": "123"})
    print("================")
    print(response.json())
    self.accessToken = response.json()["accessToken"]

  @task(2)
  def list_users(self):
    self.client.get("/users", headers={"Authorization": "Bearer {}".format(self.accessToken)})

  @task(5)
  def list_drivers(self):
    self.client.get("/drivers", headers={"Authorization": "Bearer {}".format(self.accessToken)})  

class TestB(HttpLocust):
    task_set = UserBehaviorB
    min_wait = 1000
    max_wait = 4000