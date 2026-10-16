# pragma version ^0.4.0
# @license MIT

stored: public(uint256)

@deploy
def __init__(initial_value: uint256):
    self.stored = initial_value

@external
def increment():
    self.stored += 1

@external
def set_value(new_value: uint256):
    self.stored = new_value
