import random
import sys

nato_phoonetic_dict = {'A':'Alpha', 'B':'Bravo','C':'Charlie', 'D':'Delta', 'E':'Echo', 'F':'Foxtrot', 'G':'Golf',"H":"Hotel", 'I':'India', 'J':'Juliet', 'K':'Kilo', 'L':'Lima', 'M':'Mike', 'N':'November', 'O':'Oscar', 'P':'Papa', 'Q':'Quebec', 'R':'Romeo', 'S':'Sierra', 'T':'Tango', 'U':'Uniform', 'V':'Victor', 'W':'Whiskey', 'X':'Xray', 'Y':'Yankee', 'Z':'Zulu'}
letter_set = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
upper_case_letter_set = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
digit_set = ['0','1','2','3','4','5','6','7','8','9']
special_character_set = ['.', ',', '_', '-', '?', '/', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '+', '{', '}', '[', ']']

list_options = sys.argv[1].split(',')

using_set = []
pass_length = int(list_options[0])
is_phonetic = bool(list_options[1])
no_repetition = bool(list_options[6])
num_pass = int(list_options[7])
create_pass_list = []

for k in range(num_pass):
	if list_options[2] == 1:
		using_set.extend(letter_set)
	if list_options[3] == 1 :
		using_set.extend(upper_case_letter_set)
	if list_options[4] == 1:
		using_set.extend(digit_set)
	if list_options[5] == 1:
		using_set.extend(special_character_set)

	pwd_list = []
	for i in range(list_options[0]):
		if(len(using_set) == 0):
				print("No es possible generar la contrasena")
				break
		letter = random.choice(using_set)
		pwd_list.append(letter)
		if(no_repetition):
			using_set.remove(letter)
	if(is_phonetic):
		for j in range(len(pwd_list)):
			if pwd_list[j] in nato_phoonetic_dict:
				pwd_list.insert(j,nato_phoonetic_dict.get(pwd_list[j]))
				pwd_list.remove(pwd_list[j+1])
	pwd = ''.join(pwd_list)
	create_pass_list.append(pwd)
	using_set.clear()
	pwd_list.clear()
print(create_pass_list)
		
sys.stdout.flush*

	