import { FaLocationDot } from "react-icons/fa6";

export function ProjectsList({ projects }) {
  console.log("projects", projects);
  return (
    <div className="px-4 mx-auto max-w-[1500px] sm:px-6 lg:px-8 ">
      <h1 className="font-poppins text-center text-[24px] font-semibold text-textmain mt-16 mb-10">
        Our Prior projects
      </h1>
      <p className="max-w-xl mx-auto leading-6 text-center text-md mb-14">
        Explore our previous projects to see the magic we've created! Get
        inspired for your next green adventure with Green Oasis.
      </p>
      {projects.map((project) => (
        <div
          className="border border-solid border-[#e6e6e6] rounded-[30px] p-9"
          key={project._id}
        >
          <h1 className="font-poppins text-[24px] font-semibold text-textmain pt-4">
            {project.projectName}
          </h1>
          <h1 className="font-poppins text-[16px] text-accent font-medium flex items-center gap-2">
            <FaLocationDot />
            {project.location}
          </h1>
          <p className="py-2 pr-96">{project.description}</p>

          <div className="grid w-full grid-cols-2 gap-2 py-6">
            {project.images.map((imageLink, index) => (
              <div key={index}>
                <img
                  className="object-cover object-center w-full h-40 rounded-lg md:h-96"
                  src={imageLink}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
