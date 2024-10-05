class FeedbackWidget extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: 'open'});
	}

	connectedCallback() {
		const spaceName = this.getAttribute('spaceName') || '';

		this.render(spaceName);
		this.fetchFeedbacks(spaceName).then((feedbacks) => {
			if (feedbacks) {  // Add a check here
				this.displayFeedbacks(feedbacks);
			}
		});
	}

	render(spaceName) {
		const styles = ` 
            :host {
                font-family: Arial, sans-serif;
            }
            .widget {
                padding: 10px;
                border-radius: 5px;
                background-color: #f0f0f0;
                color: #333;
            }
        `;

		this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <div class="widget">
                <h1>${spaceName}</h1>
                <div id="feedbacks"></div>
            </div>
        `;
	}

	async fetchFeedbacks(spaceName) {
		try {
			const response = await fetch(`http://localhost:4000/api/feedback/getFeedbacks/${spaceName}`);
			if (response.ok) {
				return await response.json();
			} else {
				throw new Error('Failed to fetch feedbacks');
			}
		} catch (error) {
			console.error('Error fetching feedbacks:', error);
			return null;  // Return null on error
		}
	}

	displayFeedbacks(feedbacks) {
		const feedbacksContainer = this.shadowRoot.querySelector('#feedbacks');
		feedbacksContainer.innerHTML = '<h4>Recent Feedback:</h4>';
		feedbacks.forEach(feedback => {
			const feedbackElement = document.createElement('p');
			feedbackElement.textContent = feedback.customerFeedback;
			feedbacksContainer.appendChild(feedbackElement);
		});
	}
}

customElements.define('feedback-widget', FeedbackWidget);