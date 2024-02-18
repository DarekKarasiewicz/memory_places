from django.test import TestCase
import requests
import pytest

# Create your tests here.
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
    
