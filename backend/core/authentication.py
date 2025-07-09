import requests
from jose import jwt
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from core.models import User

CLERK_ISSUER = "https://vital-krill-99.clerk.accounts.dev"
CLERK_JWKS_URL = f"{CLERK_ISSUER}/.well-known/jwks.json"
CLERK_AUDIENCE = "pk_test_dml0YWwta3JpbGwtOTkuY2xlcmsuYWNjb3VudHMuZGV2JA"

_jwks_cache = None

def get_jwks():
    global _jwks_cache
    if _jwks_cache is None:
        response = requests.get(CLERK_JWKS_URL)
        _jwks_cache = response.json()
    return _jwks_cache


class ClerkJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth = request.headers.get('Authorization')
        if not auth or not auth.startswith('Bearer '):
            return None

        token = auth.split(' ')[1]
        jwks = get_jwks()

        try:
            decoded = jwt.decode(
                token,
                jwks,
                algorithms=["RS256"],
                audience=CLERK_AUDIENCE,
                issuer=CLERK_ISSUER,
                options={"verify_aud": False}
            )
        except Exception as e:
            raise AuthenticationFailed("Invalid JWT") from e

        user_id = decoded.get("sub")
        if not user_id:
            raise AuthenticationFailed("No user ID in token")

        user, _ = User.objects.get_or_create(id=user_id)
        return user, None
