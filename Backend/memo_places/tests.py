from django.test import TestCase
import requests
import pytest

class UserTests(TestCase):
    id_created=None

    def setUp(self):
        data = {'email': 'test9998@test.pl',
                'username':'XxTestxX',
                'password': 'Test1234!'
        }
        url = 'http://localhost:8000/memo_places/users/'
        response = requests.post(url, json=data, headers={ 'Content-Type': 'application/json' } )
        pytest.id_created = response.json()['id']

    def tearDown(self):
        url = f'http://localhost:8000/memo_places/users/{pytest.id_created}'
        requests.delete(url, headers={ 'Content-Type': 'application/json' } )
        pass
    
    def test_user_data_get(self):
        url = f'http://localhost:8000/memo_places/users/pk={pytest.id_created}/'
        response = requests.get(url, headers={ 'Content-Type': 'application/json' } )
        self.assertEqual(response.json()['username'], 'XxTestxX')

    def test_update_user_data(self):
        data = {'username': 'NewTest'}
        url = f'http://localhost:8000/memo_places/users/pk={pytest.id_created}/'
        response = requests.put(url, json=data, headers={ 'Content-Type': 'application/json' } )
        self.assertEqual(response.json()['username'], 'NewTest')

class PlacesTests(TestCase):
    id_created=None

    def setUp(self):
        data1 = {
            'user':'1', 
            'place_name':'random_place_name',
            'description':'random_description',
            'creation_date':'2024-02-19',
            'found_date':'2024-02-19',
            'lng':'123456789',
            'lat':'123456789',
            'type': 'some type',
            'sortof': 'some sortof',
            'period': 'some period'}

        url = 'http://localhost:8000/memo_places/places/'
        response = requests.post(url, json=data1, headers={ 'Content-Type': 'application/json' } )
        pytest.id_created = response.json()['id']

    def tearDown(self):
        url = f'http://localhost:8000/memo_places/places/{pytest.id_created}'
        requests.delete(url, headers={ 'Content-Type': 'application/json' } )
        pass
    
    def test_place_data_get_by_id(self):
        url = f'http://localhost:8000/memo_places/places/pk={pytest.id_created}/'
        response = requests.get(url, headers={ 'Content-Type': 'application/json' } )
        self.assertEqual(response.json()['place_name'], 'random_place_name')

    def test_place_data_get_by_user(self):
        #Rethink
        user_id=1
        url = f'http://localhost:8000/memo_places/places/user={user_id}/'
        response = requests.get(url, headers={ 'Content-Type': 'application/json' } )
        for i,data in enumerate(response.json()):
            if data['place_name'] == 'random_place_name':
                self.assertEqual(response.json()[i]['place_name'], 'random_place_name')
    
    def test_place_data_get_by_type(self):
        data = {
            'user':'1', 
            'place_name':'random_place_name2',
            'description':'random_description',
            'creation_date':'2024-02-19',
            'found_date':'2024-02-19',
            'lng':'123456789',
            'lat':'123456789',
            'type': 'some type',
            'sortof': 'some sortof2',
            'period': 'some period2'}

        url = 'http://localhost:8000/memo_places/places/'
        response = requests.post(url, json=data, headers={ 'Content-Type': 'application/json' } )
        id=response.json()['id']

        search = data['type']
        url = f'http://localhost:8000/memo_places/places/type={search}/'
        response = requests.get(url, headers={ 'Content-Type': 'application/json' } )
        url = f'http://localhost:8000/memo_places/places/{id}'
        requests.delete(url, headers={ 'Content-Type': 'application/json' } )
        self.assertEqual(len(response.json()), 2)
    
    def test_place_data_get_by_sortof(self):
        data = {
            'user':'1', 
            'place_name':'random_place_name2',
            'description':'random_description',
            'creation_date':'2024-02-19',
            'found_date':'2024-02-19',
            'lng':'123456789',
            'lat':'123456789',
            'type': 'some type1',
            'sortof': 'some sortof',
            'period': 'some period2'}

        url = 'http://localhost:8000/memo_places/places/'
        response = requests.post(url, json=data, headers={ 'Content-Type': 'application/json' } )
        id=response.json()['id']

        search = data['sortof']
        url = f'http://localhost:8000/memo_places/places/sortof={search}/'
        response = requests.get(url, headers={ 'Content-Type': 'application/json' } )
        url = f'http://localhost:8000/memo_places/places/{id}'
        requests.delete(url, headers={ 'Content-Type': 'application/json' } )
        self.assertEqual(len(response.json()), 2)
    
    def test_place_data_get_by_period(self):
        data = {
            'user':'1', 
            'place_name':'random_place_name2',
            'description':'random_description',
            'creation_date':'2024-02-19',
            'found_date':'2024-02-19',
            'lng':'123456789',
            'lat':'123456789',
            'type': 'some type1',
            'sortof': 'some sortof2',
            'period': 'some period'}

        url = 'http://localhost:8000/memo_places/places/'
        response = requests.post(url, json=data, headers={ 'Content-Type': 'application/json' } )
        id=response.json()['id']

        search = data['period']
        url = f'http://localhost:8000/memo_places/places/period={search}/'
        response = requests.get(url, headers={ 'Content-Type': 'application/json' } )
        url = f'http://localhost:8000/memo_places/places/{id}'
        requests.delete(url, headers={ 'Content-Type': 'application/json' } )
        self.assertEqual(len(response.json()), 2)

    def test_update_places_data(self):
        data = {'place_name': 'new place name'}
        url = f'http://localhost:8000/memo_places/places/{pytest.id_created}/'
        response = requests.put(url, json=data, headers={ 'Content-Type': 'application/json' } )
        self.assertEqual(response.json()['place_name'], 'new place name')