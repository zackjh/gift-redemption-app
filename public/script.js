document
  .getElementById("redemptionForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    const staffPassId = document.getElementById("staffPassId").value;
    fetch("/api/redeem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ staffPassId }),
    })
      .then((response) => response.json())
      .then(
        (data) =>
          (document.getElementById("message").textContent = data.message)
      )
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("message").textContent =
          "An error occurred while trying to redeem the gift.";
      });
  });
