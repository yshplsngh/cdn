(function() {
  function createFeedbackWidget(projectId) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://yshplsngh.github.io/cdn/feedback-widget.html`;
    iframe.style.position = 'fixed';
    iframe.style.bottom = '15px';
    iframe.style.right = '15px';
    iframe.style.width = '300px';
    iframe.style.height = '200px';
    iframe.style.border = 'none';
    iframe.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    document.body.appendChild(iframe);
  }

  window.createFeedbackWidget = createFeedbackWidget;
})();