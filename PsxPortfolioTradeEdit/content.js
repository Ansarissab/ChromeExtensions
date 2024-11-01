function AlterInputs() {
  try {
    // Remove 'readonly' attribute from 'price' and 'fee' inputs in 'buyTrade' form
    const priceInput = document.querySelector("input[name=price]");
    const feeInput = document.querySelector("input[name=fee]");

    if (priceInput) {
      priceInput.removeAttribute("readonly");
    } else {
      console.error("Price input not found");
    }

    if (feeInput) {
      feeInput.removeAttribute("readonly");
    } else {
      console.error("Fee input not found");
    }
  } catch (error) {
    console.error("Error while altering inputs: ", error);
  }
}

function AlterPortfolioInputs() {
  try {
    // Example: Add/remove attributes for 'createPortfolio' form if needed
    const portfolioInput = document.querySelector("#createPortfolio input[name=cash]");

    if (portfolioInput) {
      portfolioInput.removeAttribute("readonly"); // Example: Change as needed
    } else {
      console.error("Portfolio input not found");
    }
  } catch (error) {
    console.error("Error while altering portfolio inputs: ", error);
  }
}

const observer = new MutationObserver(() => {
  try {
    const FormDiv = document.getElementById("buyTrade");
    const PortfolioDiv = document.getElementById("createPortfolio");

    // Observer for 'buyTrade' form
    if (FormDiv) {
      const priceInput = FormDiv.querySelector("input[name=price]");
      if (priceInput) {
        AlterInputs();
        observer.disconnect(); // Stop observing once inputs are altered
      }
    }

    // Observer for 'createPortfolio' form
    if (PortfolioDiv) {
      const portfolioInput = PortfolioDiv.querySelector("input[name=cash]");
      if (portfolioInput) {
        AlterPortfolioInputs();
        observer.disconnect(); // Stop observing once inputs are altered
      }
    }
  } catch (error) {
    console.error("Error in MutationObserver: ", error);
  }
});

// Start observing the document for changes
observer.observe(document.body, { childList: true, subtree: true });
