const login = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
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
  
    const first_name = document.querySelector("#first-name-signup").value.trim();
    const last_name = document.querySelector("#last-name-signup").value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (first_name && last_name && email && password) {
        const response = await fetch("/api/user", {
            method: "POST",
            body: JSON.stringify({ first_name, last_name, email, password }),
            headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
            document.location.replace("/login");
        } else {
            alert("Error creating user");
        }
    }
  };

  document.querySelector('.login-form').addEventListener('submit', login);
  document.querySelector('.signup-form').addEventListener('submit', signUp );