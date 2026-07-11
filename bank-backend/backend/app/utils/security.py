# utils/security.py
from passlib.context import CryptContext
from passlib.exc import UnknownHashError

pwd_context = CryptContext(
    schemes=["bcrypt", "plaintext"],
    default="bcrypt",
    deprecated=["plaintext"],    # mark plaintext as deprecated
)

def hash_password(plain_password: str) -> str:
    return pwd_context.hash(plain_password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def verify_and_upgrade(db, record, plain_password: str) -> bool:
    """Verify a password against ``record.password``.

    Records created before hashing was introduced store their password in
    plaintext. When one of those verifies successfully it is re-saved as a
    bcrypt hash, so the legacy value disappears after its first use.
    """
    try:
        valid = verify_password(plain_password, record.password)
    except UnknownHashError:
        valid = record.password == plain_password

    if valid and not record.password.startswith("$2"):
        record.password = hash_password(plain_password)
        db.commit()
        db.refresh(record)

    return valid
