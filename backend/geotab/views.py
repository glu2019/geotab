import json
from geotab.utils import Sudoku
from django.views.generic import View
from django.http import HttpResponse

class SudokuView(View):

    def get(self, request):
        num_list = [0] * 81
        sudoku = Sudoku(num_list).generate()
        return HttpResponse(json.dumps(sudoku), status=200)

    def post(self, request):
        num_list = [0] * 81
        num = request.POST.get("num", num_list)
        sudoku = Sudoku(num).generate()
        return HttpResponse(json.dumps(sudoku), status=200)