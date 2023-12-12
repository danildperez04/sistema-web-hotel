export async function createUser(userData){
    const response = await fetch('http://localhost:3000/auth/signup/', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    return await response;
}