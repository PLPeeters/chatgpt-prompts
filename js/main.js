function copyPrompt(button, promptId) {
    const promptEl = document.getElementById(promptId);
    const inputs = Array.from(promptEl.querySelectorAll('.inputs input'));
    const textEl = promptEl.querySelector('pre');

    let text = textEl.textContent;

    inputs.forEach(input => {
        const placeholder = input.getAttribute('data-placeholder');
        const value = input.value || placeholder;
        text = text.replace(placeholder, value);
    });

    navigator.clipboard.writeText(text);

    button.textContent = 'Copied!';

    setTimeout(() => {
        button.textContent = 'Copy';
    }, 750);
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Grab all prompt elements
    var prompts = document.querySelectorAll('.prompt pre');

    // Process each prompt
    prompts.forEach(prompt => {
        // Extract placeholders from the prompt text
        var re = /\[(.*?)\]/g;
        var text = prompt.dataset.originalText;
        var match;
        var placeholders = [];

        while ((match = re.exec(text)) != null) {
            if (placeholders.indexOf(match[1]) === -1) {
                placeholders.push(match[1]);
            }
        }

        var inputs = document.createElement('div');
        inputs.setAttribute('class', 'inputs');

        // For each placeholder, create an input element
        placeholders.forEach(placeholder => {
            // Create a new input element
            var input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('class', `placeholder-input ${prompt.id}-placeholder-input`);
            input.setAttribute('name', placeholder);
            input.setAttribute('data-placeholder', placeholder);
            input.setAttribute('data-prompt', prompt.id);

            var label = document.createElement('label');
            label.setAttribute('for', placeholder);
            label.textContent = `${placeholder}:`;

            inputs.appendChild(label);
            inputs.appendChild(input);
        });

        // Insert the input element before the prompt
        prompt.parentNode.insertBefore(inputs, prompt);
    });

    // Grab all input elements
    var inputs = document.querySelectorAll('input[data-placeholder]');

    // Add event listener to each input element
    inputs.forEach(input => {
        input.addEventListener('keyup', function() {
            // Grab the corresponding prompt element
            var prompt = document.querySelector(`#${this.dataset.prompt}`);
            var inputs = document.querySelectorAll(`.${this.dataset.prompt}-placeholder-input`);

            // Grab the original text of the prompt
            var originalText = prompt.dataset.originalText;
            var updatedText = originalText;

            // Replace placeholders in text with input values
            inputs.forEach(input => {
                updatedText = updatedText.replace(new RegExp(`\\[${input.name}\\]`, 'g'), input.value || `[${input.name}]`)
            })

            // Update the text of the prompt
            prompt.innerText = updatedText;
        });
    });
});
