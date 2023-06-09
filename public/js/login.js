// Target our button elements here
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

// Handles Login functionality
const loginFormHandler = async (event) => {
    event.preventDefault(); // Prevents default action that is associated with an event. 

    const email = document.querySelector('.email-field').value.trim();
    const password = document.querySelector('.password-field').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password}), 
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/profile');
          }
        else {
            alert(response.statusText);
          };
    };

}

// Handles Signup functionality 
const signupFormHandler = async (event) => {
    event.preventDefault();

  const emailField = document.querySelector('.email-field').value.trim();
  const passwordField = document.querySelector('.password-field').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};
