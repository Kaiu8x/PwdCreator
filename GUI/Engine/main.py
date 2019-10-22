from password1 import *
from hashing import *
from break_password import *

def main():
	##missing quantity of pwds
	list_opt = [4,0,1,0,0,0,0,1]
	pwd = generate_password(list_opt)
	print(pwd)
	md5_hash = md5_hex_hash(pwd)
	sha1_hash = sha1_hex_hash(pwd)
	print("MD5 Hash of: ", pwd, "is: ", md5_hash)
	print("SHA1 Hash of: ", pwd, "is: ", sha1_hash)
	opts = [4,4]
	break_password(opts,[md5_hash,sha1_hash])


if __name__ == '__main__':
	main()