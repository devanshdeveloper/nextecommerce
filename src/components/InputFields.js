import { BsImage } from "react-icons/bs";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export const InputField = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full border-2 border-brand-300 rounded px-4 py-3 outline-none ${className}`}
  />
);

export const TextArea = ({ className = "", ...props }) => (
  <div className="group flex items-center justify-start overflow-hidden rounded-lg border border-solid border-brand-400 bg-brand-400 transition-all duration-200 focus-within:border-brand-default focus-within:ring-[4px] focus-within:ring-brand-default focus-within:ring-opacity-30 hover:border-brand-default w-full">
    <textarea
      {...props}
      className={`brand-scrollbar w-full border-none bg-transparent px-4 py-3 text-base text-brand-100  outline-non ${className}`}
    />
  </div>
);

export function FilesInput() {
  return (
    <>
      <label htmlFor="filesInput" className="text-white">
        Select Images
      </label>
      <InputField />
      <input
        type="file"
        id="filesInput"
        className=" invisible rou bg-brand-400 text-white"
      />
    </>
  );
}

export const TagsInput = ({ className = "", ...props }) => {
  const [tags, setTags] = useState < any > [];

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <li
            key={i}
            className="flex items-center gap-2 rounded bg-brand-700 p-1 text-white"
          >
            {tag}
            <span
              onClick={() => {
                console.log("running remove tag");
                setTags(tags.filter((curTag) => curTag !== tag));
              }}
            >
              <AiOutlineClose />
            </span>
          </li>
        ))}
      </ul>
      <label className="flex flex-col gap-1 text-white">
        Select Tags
        <InputField
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (e.target.value === "") return;
              if (tags.includes(e.target.value)) {
                e.target.value = "";
                return;
              }
              setTags([...tags, e.target.value]);
              e.target.value = "";
            }
          }}
        />
      </label>
    </div>
  );
};

export const SelectBox = ({ className = "", children, ...props }) => (
  <div className={`flex justify-center ${className}`}>
    <select
      className="w-full appearance-none rounded-lg border border-solid border-brand-400 bg-brand-400 px-5 py-3 text-white transition-all duration-200 focus-within:border-brand-default focus-within:ring-[4px] focus-within:ring-brand-default focus-within:ring-opacity-30 hover:border-brand-default focus:outline-none"
      {...props}
    >
      {children}
    </select>
  </div>
);

export const Checkbox = ({ ...props }) => (
  <label className="switch">
    <input type="checkbox" {...props} />
    <span className="slider round"></span>
  </label>
);

export const RadioGroup = ({ className = "", name, children, ...props }) => (
  <div
    className={`inline-flex gap-1 rounded bg-brand-400 p-1 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const RadioInput = ({ htmlFor, name, labelText, ...props }) => (
  <label className="radio-container" htmlFor={htmlFor}>
    <input type="radio" id={htmlFor} name={name} {...props} />
    <div className="radio-box">{labelText}</div>
  </label>
);

export const ColorPicker = ({
  colors = [],
  onChange,
  value,
  name,
  className = "",
}) => {
  return (
    <div
      className={`inline-flex gap-3 rounded bg-brand-400 p-4 ${className}`}
      {...{ onChange }}
    >
      <label
        className="color-container flex items-center"
        htmlFor={`${name}-picker`}
      >
        <input type="color" id={`${name}-picker`} name={name} />
        <svg
          width="16"
          height="16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8.001" cy="1.778" r="1.778" fill="#B072FF"></circle>
          <circle cx="12.446" cy="3.556" r="1.778" fill="#FF7673"></circle>
          <circle cx="14.223" cy="8" r="1.778" fill="#FFBB5C"></circle>
          <circle cx="12.446" cy="12.444" r="1.778" fill="#FFD74E"></circle>
          <circle cx="8.001" cy="14.222" r="1.778" fill="#6DE194"></circle>
          <circle cx="3.556" cy="12.444" r="1.778" fill="#63ECDB"></circle>
          <circle cx="1.779" cy="8" r="1.778" fill="#5ACFF5"></circle>
          <circle cx="3.556" cy="3.556" r="1.778" fill="#70B1FF"></circle>
        </svg>
      </label>
      {colors.map((color, i) => (
        <label className="color-container" key={i} htmlFor={`${name}-${color}`}>
          <input
            type="radio"
            id={`${name}-${color}`}
            value={color}
            checked={color === value}
            name={name}
          />
          <div className="color-box" style={{ backgroundColor: color }}></div>
        </label>
      ))}
    </div>
  );
};

export const ImageInput = ({ ...props }) => (
  <div className="relative h-24 w-44 cursor-pointer overflow-hidden rounded-lg border border-dashed border-brand-400 transition-all hover:border-brand-default">
    <div className="flex items-center justify-center">
      <BsImage className="absolute left-1/2 top-1/2 inline-block -translate-x-1/2 -translate-y-1/2 transform text-2xl text-brand-200" />
      <input
        {...props}
        type="file"
        accept="image/gif, image/jpeg, image/jpg, image/png"
        className="absolute inset-0 z-10 opacity-0"
      />
    </div>
  </div>
);
