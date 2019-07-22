const dataset = document.querySelector('script[src*="request"]').dataset;

export const currentOperator = JSON.parse(dataset.currentOperator);