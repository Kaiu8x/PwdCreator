import random
import sys
from hashing import *

nato_phoonetic_dict = {'A':'Alpha', 'B':'Bravo','C':'Charlie', 'D':'Delta', 'E':'Echo', 'F':'Foxtrot', 'G':'Golf',"H":"Hotel", 'I':'India', 'J':'Juliet', 'K':'Kilo', 'L':'Lima', 'M':'Mike', 'N':'November', 'O':'Oscar', 'P':'Papa', 'Q':'Quebec', 'R':'Romeo', 'S':'Sierra', 'T':'Tango', 'U':'Uniform', 'V':'Victor', 'W':'Whiskey', 'X':'Xray', 'Y':'Yankee', 'Z':'Zulu'}
letter_set = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
upper_case_letter_set = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
digit_set = ['0','1','2','3','4','5','6','7','8','9']
special_character_set = ['.', ',', '_', '-', '?', '/', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '+', '{', '}', '[', ']']
true_list = ['True', 'true','1']
fullCmdArguments = sys.argv
list_options = fullCmdArguments[1:]

using_set = []
#print(list_options)
pass_length = int(list_options[0])
is_phonetic = list_options[1]
no_repetition = list_options[6]
num_pass = int(list_options[7])
create_pass_list = []
if list_options[2] in true_list:
	using_set.extend(letter_set)
if list_options[3] in true_list:
	using_set.extend(upper_case_letter_set)
if list_options[4] in true_list:
	using_set.extend(digit_set)
if list_options[5] in true_list:
	using_set.extend(special_character_set)

#print("Length: ", pass_length, " Phonetic: ", is_phonetic, "lower: ", list_options[2], " upper: ", list_options[3], " digit: ", list_options[4], " special char: ", list_options[5], " no_repetition: ", no_repetition, " num_pass: ", num_pass)
#print("Using set: ", using_set)

for k in range(num_pass):
	pwd_list = []
	for i in range(pass_length):
		if(len(using_set) == 0):
				print("No es possible generar la contrasena")
				break
		letter = random.choice(using_set)
		pwd_list.append(letter)
		if(no_repetition in true_list):
			using_set.remove(letter)
	if(is_phonetic in true_list):
		for j in range(len(pwd_list)):
			if pwd_list[j] in nato_phoonetic_dict:
				pwd_list.insert(j,nato_phoonetic_dict.get(pwd_list[j]))
				pwd_list.remove(pwd_list[j+1])

	pwd = ''.join(pwd_list)
	md5_hash = md5_hex_hash(pwd)
	sha1_hash = sha1_hex_hash(pwd)
	create_pass_list.append(pwd)
	create_pass_list.append(md5_hash)
	create_pass_list.append(sha1_hash)
	pwd_list.clear()
	
print(create_pass_list)
		
sys.stdout.flush()


	
	#nato_phoonetic_dict = {'A':'Alpha', 'B':'Bravo','C':'Charlie', 'D':'Delta', 'E':'Echo', 'F':'Foxtrot', 'G':'Golf',"H":"Hotel", 'I':'India', 'J':'Juliet', 'K':'Kilo', 'L':'Lima', 'M':'Mike', 'N':'November', 'O':'Oscar', 'P':'Papa', 'Q':'Quebec', 'R':'Romeo', 'S':'Sierra', 'T':'Tango', 'U':'Uniform', 'V':'Victor', 'W':'Whiskey', 'X':'Xray', 'Y':'Yankee', 'Z':'Zulu'}
	#letter_set = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
	#upper_case_letter_set = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
	#digit_set = ['0','1','2','3','4','5','6','7','8','9']
	#special_character_set = ['.', ',', '_', '-', '?', '/', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '+', '{', '}', '[', ']']

	