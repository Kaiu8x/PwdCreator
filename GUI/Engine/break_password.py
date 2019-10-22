import random
import itertools
from hashing import *
import sys
import time
from signal import signal, SIGINT



vocal_set = ['a','i','u','e','o']
upper_case_vocal_set = ['A','I','U','E','O']
letter_set = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
upper_case_letter_set = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
digit_set = ['0','1','2','3','4','5','6','7','8','9']

fullCmdArguments = sys.argv
list_options = fullCmdArguments[1:]

#print(list_options)

using_set = []
pass_length = int(list_options[0])
break_option = int(list_options[1])
possible_pwd_list = []
possible_pwd = ''.join(possible_pwd_list)
create_pass_list = []

currentPassComb = ''

if break_option == 0:
	#print("entered 0")
	using_set.extend(vocal_set)
if break_option == 1:
	#print("entered 1")
	using_set.extend(upper_case_vocal_set)
if break_option == 2:
	#print("entered 2")
	using_set.extend(vocal_set)
	using_set.extend(upper_case_vocal_set)
if break_option == 3:
	#print("entered 3")
	using_set.extend(digit_set)
if break_option == 4:
	#print("entered 4")
	using_set.extend(letter_set)
if break_option == 5:
	#print("entered 5")
	using_set.extend(upper_case_letter_set)
if break_option > 5:
	print("ERROR")
if break_option < 0:
	print("ERROR")
count = 0
t0 = time.time()
#print(using_set)

def handler(signal_received, frame):
    create_pass_list.append("Se Interrumpió la operación")
    create_pass_list.append(count)
    create_pass_list.append(currentPassComb)
    t1 = time.time()
    total = t1-t0
    create_pass_list.append(total)
    print(create_pass_list)
    sys.exit(0)

signal(SIGINT, handler)

for subset in itertools.product(using_set,repeat=pass_length):
	count += 1
	currentPassComb = ''.join(subset)
	if list_options[2] != "":
		if list_options[2] == md5_hex_hash(''.join(subset)):
			t1 = time.time()
			total = t1 - t0;
			create_pass_list.append("Se logró romper la contraseña")
			create_pass_list.append(count)
			create_pass_list.append(''.join(subset))
			create_pass_list.append(total)
			print(create_pass_list)
			#print("Password Broken!!! with ", count, "attempts PASSWORD IS: ", ''.join(subset))
			break
		#print("test1", list_hash[0])
	elif list_options[3] != "":
		if list_options[3] == sha1_hex_hash(''.join(subset)):
			t1 = time.time()
			total = t1 - t0
			create_pass_list.append("Se logró romper la contraseña")
			create_pass_list.append(count)
			create_pass_list.append(''.join(subset))
			create_pass_list.append(total)
			print(create_pass_list)
			#print("Password Broken!!! with ", count, "attempts PASSWORD IS: ", ''.join(subset))
			break
		#print("test2", list_hash[1])
	else:
		print ("ERROR")
		#print(subset)
print ("ERROR")
sys.stdout.flush()
