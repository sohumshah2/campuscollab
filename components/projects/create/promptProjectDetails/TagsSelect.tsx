import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

const TagsSelect = ({ tags, setTags }: any) => {
  const [defaultOptions, setDefaultOptions] = useState([
    { value: "course", label: "Course" },
    { value: "hackathon", label: "Hackathon" },
    { value: "competition", label: "Competition" },
    { value: "event", label: "Event" },
    { value: "personal_project", label: "Personal Project" },
  ]);

  const handleChange = (newValue) => {
    setTags(newValue);
  };

  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue.toLowerCase(), label: inputValue };
    setDefaultOptions((prevOptions) => [...prevOptions, newOption]);
    setTags((prevSelected) => [...prevSelected, newOption]);
  };

  return (
    <CreatableSelect
      isMulti
      value={tags}
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={defaultOptions}
    />
  );
};

export default TagsSelect;
