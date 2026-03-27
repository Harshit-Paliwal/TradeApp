export const alertService = {
  checkPriceAlert(price: number, target: number) {
    if (price >= target) {
      alert("Target reached!");
    }
  }
};