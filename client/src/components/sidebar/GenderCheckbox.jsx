// import React from "react"

// const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
//   return (
//     <div className="flex">
//       <div className="form-control">
//         <label
//           className={`label gap-2 cursor-pointer ${
//             selectedGender === "male" ? "selected" : ""
//           }`}
//         >
//           <span className="label-text">Male</span>

//           <input
//             type="checkbox"
//             className="checkbox border-slate-900"
//             checked={selectedGender === "male"}
//             onChange={() => onCheckboxChange("male")}
//           />
//         </label>
//       </div>

//       <div className="form-control">
//         <label
//           className={`label gap-2 cursor-pointer ${
//             selectedGender === "female" ? "selected" : ""
//           }`}
//         >
//           <span className="label-text">Female</span>

//           <input
//             type="checkbox"
//             className="checkbox border-slate-900"
//             checked={selectedGender === "female"}
//             onChange={() => onCheckboxChange("female")}
//           />
//         </label>
//       </div>
//     </div>
//   )
// }

// export default GenderCheckbox



import React from "react";

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex items-center space-x-8">
      {/* Male Checkbox */}
      <div className="flex items-center space-x-2">
        <label
          className={`cursor-pointer text-lg font-medium ${
            selectedGender === "male" ? "text-indigo-600" : "text-gray-700"
          } hover:text-indigo-500`}
        >
          <input
            type="checkbox"
            className="appearance-none h-5 w-5 border-2 rounded-md border-indigo-600 checked:bg-indigo-600 checked:border-transparent transition-all duration-300"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
          <span className="ml-2">Male</span>
        </label>
      </div>

      {/* Female Checkbox */}
      <div className="flex items-center space-x-2">
        <label
          className={`cursor-pointer text-lg font-medium ${
            selectedGender === "female" ? "text-indigo-600" : "text-gray-700"
          } hover:text-indigo-500`}
        >
          <input
            type="checkbox"
            className="appearance-none h-5 w-5 border-2 rounded-md border-indigo-600 checked:bg-indigo-600 checked:border-transparent transition-all duration-300"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
          <span className="ml-2">Female</span>
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
