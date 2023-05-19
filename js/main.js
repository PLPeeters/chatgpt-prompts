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
        var re = /\[(.*?)(?::(.*?))?\]/g;
        var text = prompt.dataset.originalText;
        var match;
        var placeholders = [];

        while ((match = re.exec(text)) != null) {
            if (placeholders.map(p => p.name).indexOf(match[1]) === -1) {
                if (match[2] === 'textarea') {
                    placeholders.push({
                        'name': match[1],
                        'elementType': 'textarea'
                    })
                } else {
                    placeholders.push({
                        'name': match[1],
                        'elementType': 'input'
                    });
                }
            }
        }

        var inputs = document.createElement('div');
        inputs.setAttribute('class', 'inputs');

        var updatedText = text;

        // For each placeholder, create an input element
        placeholders.forEach(placeholder => {
            // Create a new input element
            var input = document.createElement(placeholder.elementType);

            if (placeholder.elementType === 'input') {
                input.setAttribute('type', 'text');
            } else if (placeholder.elementType === 'textarea') {
                input.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = this.scrollHeight + 'px';
                }, false);
                input.style.resize = 'none';
            }

            input.setAttribute('class', `placeholder-input ${prompt.id}-placeholder-input`);
            input.setAttribute('name', placeholder.name);
            input.setAttribute('placeholder', placeholder.name);
            input.setAttribute('data-placeholder', placeholder.name);
            input.setAttribute('data-prompt', prompt.id);

            var label = document.createElement('label');
            label.setAttribute('for', placeholder.name);
            label.setAttribute('for-type', placeholder.elementType);
            label.textContent = `${placeholder.name}:`;

            inputs.appendChild(label);
            inputs.appendChild(input);

            updatedText = updatedText.replace(new RegExp(`\\[${placeholder.name}(:.*?)?\\]`, 'g'), `[${placeholder.name}]`);
        });

        // Insert the input element before the prompt
        prompt.parentNode.insertBefore(inputs, prompt);
        prompt.textContent = updatedText;
    });

    // Grab all input elements
    var inputs = document.querySelectorAll('[data-placeholder]');

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
                updatedText = updatedText.replace(new RegExp(`\\[${input.name}(:.*?)?\\]`, 'g'), input.value || `[${input.name}]`)
            })

            // Update the text of the prompt
            prompt.innerText = updatedText;
        });
    });
});
