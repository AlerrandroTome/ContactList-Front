export function authHeader(): string | null {
  const user = JSON.parse(localStorage.getItem("user") as string);
  if (user && user.token) {
    return user.token;
  } else {
    return null;
  }
}
