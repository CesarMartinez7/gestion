import secrets
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from models.users import User
from models.session import Session as UserSession
from utils.save import save_changes
TOKEN_EXPIRATION_MINUTES = 60  

def login_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user or user.password != password:  
        return None, "Usuario o contraseña incorrectos"

    token = secrets.token_hex(32)  
    expires_at = datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRATION_MINUTES)

    save = UserSession(user_id=user.id, token=token, expires_at=expires_at)
    
    save_changes(save)
    return token, None

