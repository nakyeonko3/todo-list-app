export const preventEnterSubmit = (e: React.KeyboardEvent) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
};
