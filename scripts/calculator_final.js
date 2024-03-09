// Initialize the calculator's calculation string from localStorage or start anew
let calculation = localStorage.getItem('calculation') || '';

// Function to update the displayed calculation in the calculator
function displayCalculation() {
  // Replace '**' with '^' for display purposes only
  let displayString = calculation.replace(/\*\*/g, '^');
  document.querySelector('.js-result').innerHTML = displayString;
}

// Function to append a value to the current calculation and update display and storage
function updateCalculation(value) {
  if (value === '^') {
    calculation += '**'; // Internally use '**' for exponentiation, but it will be displayed as '^'
  } else {
    calculation += value;
  }
  displayCalculation();
  localStorage.setItem('calculation', calculation);
}

// Function to apply a trigonometric or logarithm function and display the result
function applyTrigFunction(func) {
  if (calculation !== '') { // Check if there's a number to apply the function to
      let value = Number(calculation); // Convert the calculation string to a number
      
      let result;
      if (func === 'log') {
        result = Math.log10(value); // Logarithm base 10 of value

      } else {
          let radianValue = value * (Math.PI / 180); // Convert degrees to radians for trig functions
          result = eval(`Math.${func}(${radianValue})`); // Apply the trigonometric function
      }
      
      calculation = result.toString(); // Update the calculation with the result
      displayCalculation(); // Display the new result
      localStorage.setItem('calculation', calculation); // Update storage
  }
}

// Function to evaluate the calculation
function evaluateCalculation() {
  try {
    // Evaluate the calculation string, which already uses '**' for exponentiation
    let result = eval(calculation);
    calculation = result.toString();
    displayCalculation();
    localStorage.setItem('calculation', calculation);
  } catch (e) {
    // Handle errors (e.g., invalid syntax) gracefully
    document.querySelector('.js-result').innerHTML = "Error";
    calculation = ''; // Reset calculation on error
  }
}

// Function to clear the calculation
function clearCalculation() {
  calculation = '';
  displayCalculation();
  localStorage.setItem('calculation', calculation);
}

// Function to toggle the theme between 'dark' and 'light'
function updateTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme); // Save the new theme preference
  updateThemeButtonLabel(newTheme); // Update the toggle button label
}

// Function to update the theme toggle button label based on the current theme
function updateThemeButtonLabel(theme) {
  const themeToggleButton = document.getElementById('theme-toggle');
  themeToggleButton.textContent = theme === 'dark' ? 'Light Theme' : 'Dark Theme';
}

// Event listeners for the calculator's functionality
document.addEventListener('DOMContentLoaded', (event) => {
  // Retrieve and display any saved calculation from previous sessions
  displayCalculation();
  
  // Set the initial theme based on saved preferences or defaults
  const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light theme if none saved
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButtonLabel(savedTheme);

  // Add event listener for the theme toggle button
  document.getElementById('theme-toggle').addEventListener('click', updateTheme);
  
  // Example of adding an event listener for a button that evaluates the calculation
  // Ensure you have a button with the ID 'evaluate-calculation' in your HTML
  document.getElementById('evaluate-calculation').addEventListener('click', evaluateCalculation);

  // Similarly, ensure you have a button for clearing the calculation
  document.getElementById('clear-calculation').addEventListener('click', clearCalculation);
});
