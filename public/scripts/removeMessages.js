const isError = document.getElementById("errorMessage");
if (isError) {
  setTimeout(() => {
    isError.style.display = "none";
  }, 2000);
}

const isSuccess = document.getElementById("successMessage");
if (isSuccess) {
  setTimeout(() => {
    isSuccess.style.display = "none";
  }, 2000);
}
