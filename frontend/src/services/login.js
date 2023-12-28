export async function authenticate(user){
    const response = await fetch('http://localhost:3000/auth/', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      return await response.json();
}