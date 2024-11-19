export const laboratoryFields = [
    { name: "name", label: "Laboratory Name", type: "text", section: "Laboratory Information" },
    { name: "address", label: "Address", type: "text", section: "Laboratory Information" },
    { name: "city", label: "City", type: "text", section: "Laboratory Information" },
    { name: "country", label: "Country", type: "text", section: "Laboratory Information" },
    { name: "means", label: "Means", type: "select", section: "Laboratory Information", options: [
      { value: "High", label: "High" },
      { value: "Medium", label: "Medium" },
      { value: "Low", label: "Low" },
    ]},
    { name: "expertise", label: "Expertise", type: "select", section: "Laboratory Information", options: [
      { value: "High", label: "High" },
      { value: "Medium", label: "Medium" },
      { value: "Low", label: "Low" },
    ]},
    { name: "directorEmail", label: "Director's Email", type: "email", section: "Director Information" },
    { name: "directorFirstname", label: "Director's First Name", type: "text", section: "Director Information" },
    { name: "directorLastname", label: "Director's Last Name", type: "text", section: "Director Information" },
    { name: "directorPhoneNumber", label: "Director's Phone Number", type: "text", section: "Director Information" },
    { name: "directorHdr", label: "HDR (optional)", type: "checkbox", section: "Director Information" },
  ];
  