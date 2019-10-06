import json
from django.test import Client

# test get /sudoku/board
def test_get_sudoku_board():
    c = Client()
    response = c.get('/sudoku/board')
    assert response.status_code == 200

# test post /sudoku/board
def test_post_sudoku_board():
    c = Client()
    num = [0] * 81
    num[20] = 5
    response = c.post('/sudoku/board', json.dumps({"num": num}), content_type="application/json")
    assert num[20] == json.loads(response.getvalue())[20]
    