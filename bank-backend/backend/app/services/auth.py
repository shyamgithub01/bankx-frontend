# services/auth.py
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.account import Account
from app.utils.security import verify_and_upgrade

def authenticate_account(db: Session, aadhar: str, password: str) -> Account:
    acct = db.query(Account).filter_by(aadhar_card_number=aadhar).first()
    if not acct or not verify_and_upgrade(db, acct, password):
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            "Invalid Aadhar number or password",
        )
    return acct
