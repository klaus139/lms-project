import React, { FC } from "react";
import { styles } from "../../../../app/styles/style";
import AddCircleIcon from "@mui/icons-material/AddCircle"

interface Props {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
}

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefits = () => {
    setBenefits([...benefits, {title: ""}]);
  };
  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px] dark:text-white text-black`} htmlFor="email">
          What are the benefits for students who register for this course
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="benefit"
            placeholder="You will be able to learn how to..."
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon 
        style={{margin: "10px 0px", cursor: "pointer", width: "30px"}}
        onClick={handleAddBenefits}
        />
      </div>
    </div>
  );
};

export default CourseData;
