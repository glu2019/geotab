import json
from geotab.utils import Sudoku
from django.views.generic import View
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt


class SudokuView(View):
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super(SudokuView, self).dispatch(request, *args, **kwargs)
    
    def get(self, request):
        num_list = [0] * 81
        sudoku = Sudoku(num_list).generate()
        return HttpResponse(json.dumps(sudoku), status=200)

    def post(self, request):
        num_list = [0] * 81
        num = json.loads(request.body).get("num", num_list)
        sudoku = Sudoku(num).generate()
        return HttpResponse(json.dumps(sudoku), status=200)