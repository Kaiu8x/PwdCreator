import hashlib

def md5_hex_hash(str_to_hash):
	return hashlib.md5(str_to_hash.encode()).hexdigest()

def sha1_hex_hash(str_to_hash):
	return hashlib.sha1(str_to_hash.encode()).hexdigest()