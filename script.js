document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const errorMessage = document.getElementById('error-message');
    
    calculateBtn.addEventListener('click', calculateAge);
    
    function calculateAge() {
        const month = parseInt(document.getElementById('month').value);
        const day = parseInt(document.getElementById('day').value);
        const year = parseInt(document.getElementById('year').value);
        
        // Validate inputs
        if (!day || !month !== 0 && !month || !year) {
            showError('Please fill in all fields');
            return;
        }
        
        const birthDate = new Date(year, month, day);
        const today = new Date();
        
        // Validate date is valid and in the past
        if (birthDate > today) {
            showError('Birth date cannot be in the future');
            return;
        }
        
        if (birthDate.getDate() !== day) {
            showError('Invalid date. Please check your input.');
            return;
        }
        
        // Calculate years
        let ageYears = today.getFullYear() - birthDate.getFullYear();
        
        // Calculate months
        let ageMonths = today.getMonth() - birthDate.getMonth();
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }
        
        // Calculate days
        let ageDays = today.getDate() - birthDate.getDate();
        if (ageDays < 0) {
            ageMonths--;
            
            // Get the last day of the previous month
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            ageDays += lastMonth.getDate();
            
            if (ageMonths < 0) {
                ageYears--;
                ageMonths += 12;
            }
        }
        
        // Display results
        document.getElementById('years').textContent = ageYears;
        document.getElementById('months').textContent = ageMonths;
        document.getElementById('days').textContent = ageDays;
        
        // Show result
        resultDiv.classList.add('active');
        errorMessage.style.display = 'none';
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        resultDiv.classList.remove('active');
    }
});
