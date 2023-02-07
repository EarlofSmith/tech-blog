const login = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector("#name-login").value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (name && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  const signUp = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector("#user-name-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (name && password) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ name, password }),
            headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Error creating user");
        }
    }
  };

  document.querySelector('.login-form').addEventListener('submit', login);
  document.querySelector('.signup-form').addEventListener('submit', signUp );