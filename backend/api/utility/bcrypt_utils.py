import bcrypt

def hash_password(password):
    # Generate a salt and hash the password with it
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

def compare_passwords(plain_password, hashed_password):
    # Check if the plain password matches the hashed password
    if bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password):
        return True
    else:
        return False