import pytest
from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c

# Mock data
TEST_EMAIL = "testuser@example.com"
TEST_PASSWORD = "testpassword"

def test_register_user(client):
    response = client.post("/auth/register", json={
        "email": TEST_EMAIL,
        "password": TEST_PASSWORD
    })
    assert response.status_code == 200 or response.status_code == 201
    data = response.json()
    assert "id" in data
    assert data["email"] == TEST_EMAIL

def test_login_user(client):
    response = client.post("/auth/login", json={
        "email": TEST_EMAIL,
        "password": TEST_PASSWORD
    })
    assert response.status_code == 200
    assert "session_id" in response.cookies

def test_session_me(client):
    # First login
    login_res = client.post("/auth/login", json={
        "email": TEST_EMAIL,
        "password": TEST_PASSWORD
    })
    cookies = login_res.cookies

    # Now check /auth/me
    res = client.get("/auth/me", cookies=cookies)
    assert res.status_code == 200
    data = res.json()
    assert data["email"] == TEST_EMAIL


def test_logout_user(client):
    # First login
    login_res = client.post("/auth/login", json={
        "email": TEST_EMAIL,
        "password": TEST_PASSWORD
    })
    cookies = login_res.cookies

    # Logout
    res = client.post("/auth/logout", cookies=cookies)
    assert res.status_code == 200

    # Try accessing /auth/me again → should fail
    me_res = client.get("/auth/me", cookies=cookies)
    assert me_res.status_code == 401
