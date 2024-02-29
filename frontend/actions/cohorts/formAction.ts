export const submitNewCohort = async (formData: FormData) => {
  const data = {
    name: formData.get('name'),
    intake: formData.get('intake'),
    program: formData.get('program'),
    peripd: formData.get('period'),
  };

  alert(`New Cohort ${data.name} is saved.`);
};
