import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "Plants",
    "Seeds",
    "Services",
    "Fertilizers",
    "Materials",
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="">
      <h1 className="mb-10 text-xl font-medium text-center text-white font-poppins sm:mb-8 sm:text-5xl lg:w-[700px] leading-6">
        Everything You Need for Your Garden in One Place
      </h1>

      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default PlaceholdersAndVanishInputDemo;
