import random
import itertools
from hashing import *
import sys

vocal_set = ['a','i','u','e','o']
upper_case_vocal_set = ['A','I','U','E','O']
letter_set = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
upper_case_letter_set = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
digit_set = ['0','1','2','3','4','5','6','7','8','9']

list_options = sys.argv[1].split(',')
list_hash = sys.argv[2].split(',')

using_set = []
pass_length = int(list_options[0])
break_option = int(list_options[1])
possible_pwd_list = []
possible_pwd = ''.join(possible_pwd_list)

if break_option == 0:
	using_set.extend(vocal_set)
if break_option == 1:
	using_set.extend(upper_case_vocal_set)
if break_option == 2:
	using_set.extend(vocal_set)
	using_set.extend(upper_case_vocal_set)
if break_option == 3:
	using_set.extend(digit_set)
if break_option == 4:
	using_set.extend(letter_set)
if break_option == 5:
	using_set.extend(upper_case_letter_set)
if break_option > 5:
	print("NOT POSSIBLE")
if break_option < 0:
	print("NOT POSSIBLE")
count = 0
for subset in itertools.product(using_set,repeat=pass_length):
	count += 1
	if list_hash[0]:
		if list_hash[0] == md5_hex_hash(''.join(subset)):
			print("Password Broken!!! with ", count, "attempts")
			break
		#print("test1", list_hash[0])
	elif list_hash[1]:
		if list_hash[1] == sha1_hex_hash(''.join(subset)):
			print("Password Broken!!! with ", count, "attempts")
			break
		#print("test2", list_hash[1])
	else:
		print ("ERROR")
		#print(subset)

