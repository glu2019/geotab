import random

class Sudoku:
    _num = [0]* 81
    def __init__(self, num):
        self._num = num

    def generate(self):
        self.solve(0)
        return self._num

    def solve(self, index):
        if index == 81:
            return True
        elif self._num[index] != 0:
            return self.solve(index + 1)
        else:
            random_num_list = random.sample(range(1,10), 9)
            for i in range(9):
                if self.is_valid(index, random_num_list[i]):
                    self._num[index] = random_num_list[i]
                    if self.solve(index + 1):
                        return True

        self._num[index] = 0
        return False
    def is_valid(self, index, value):
        if not self.is_row_valid(index, value):
            return False
        if not self.is_col_valid(index, value):
            return False
        if not self.is_grid_valid(index, value):
            return False
        return True

    def is_row_valid(self, index, value):
        row = index // 9
        for i in range(9):
            if value == self._num[row * 9 + i]:
                return False
        return True

    def is_col_valid(self, index, value):
        col = index % 9
        for i in range(9):
            if value == self._num[i * 9 + col]:
                return False
        return True      

    def is_grid_valid(self, index, value):
        row = index // 9
        col = index % 9
        x = row // 3 * 3
        y = col // 3 * 3
        for i in range(3):
            for j in range(3):
                if value == self._num[(x + i) * 9 + y + j]:
                    return False
        return True