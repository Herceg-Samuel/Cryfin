# pragma version ^0.4.0
# @license MIT

struct Person:
    name: String[32]
    fav_number: uint256
    
fav_number: public(uint256)
num_list: public(uint256 [5])
index: public(uint256)


@external
def store(new_number: uint256):
    self.fav_number = new_number
    self.index = 0

# Constructor
# Called once when contract is deployed
# sets owner

@deploy
def __init__():
    self.fav_number = 7

@external
@view
def retrieve() -> uint256:
    return self.fav_number

@external
def add_num(fav_number: uint256):
    self.num_list[self.index] = fav_number
    self.index = self.index + 1