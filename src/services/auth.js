const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

//Signup
export async function signUp(email, password) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return data;
}

//Login
export async function login(email, password) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return data;
}

//Update Password

export async function updatePassword(idToken, newPassword) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken,
        password: newPassword,
        returnSecureToken: true,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return data;
}

// Check Token Validity
export async function checkTokenValidity(idToken) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: idToken,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return data;
}
