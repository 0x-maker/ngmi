export function CreativeTemplate({ data }) {
  const { personal, experience, education, skills, projects } = data

  return (
    <div className="grid grid-cols-3 bg-white text-sm">
      {/* Sidebar */}
      <div className="col-span-1 bg-gray-100 p-6">
        <div className="mb-8 text-center">
          <h1 className="text-xl font-bold">{personal.name || "Your Name"}</h1>
        </div>

        <div className="mb-6 space-y-1">
          {personal.email && <div className="flex items-center gap-2 text-sm">{personal.email}</div>}
          {personal.phone && <div className="flex items-center gap-2 text-sm">{personal.phone}</div>}
          {personal.address && <div className="flex items-center gap-2 text-sm">{personal.address}</div>}
          {personal.website && <div className="flex items-center gap-2 text-sm">{personal.website}</div>}
          {personal.linkedin && <div className="flex items-center gap-2 text-sm">{personal.linkedin}</div>}
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 font-bold uppercase tracking-wider">Skills</h2>
            <div className="space-y-2">
              {skills.map((skill, index) => (
                <div key={index} className="rounded-full bg-gray-200 px-3 py-1 text-xs">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h2 className="mb-3 font-bold uppercase tracking-wider">Education</h2>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-gray-300 pl-3">
                  <div className="font-medium">{edu.degree}</div>
                  <div className="text-xs">{edu.field}</div>
                  <div className="text-xs font-medium">{edu.institution}</div>
                  <div className="text-xs text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="col-span-2 p-6">
        {/* Summary */}
        {personal.summary && (
          <div className="mb-6">
            <h2 className="mb-2 inline-block border-b-2 border-gray-300 pb-1 text-lg font-bold">About Me</h2>
            <p className="text-sm leading-relaxed">{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-4 inline-block border-b-2 border-gray-300 pb-1 text-lg font-bold">Experience</h2>
            <div className="space-y-4">
              {experience.map((job, index) => (
                <div key={index} className="relative border-l-2 border-gray-200 pl-4">
                  <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-gray-400"></div>
                  <h3 className="font-bold">{job.position}</h3>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{job.company}</span>
                    <span className="text-xs text-gray-600">
                      {job.startDate} - {job.endDate}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">{job.location}</div>
                  <p className="mt-2 whitespace-pre-line text-sm">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div>
            <h2 className="mb-4 inline-block border-b-2 border-gray-300 pb-1 text-lg font-bold">Projects</h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="relative border-l-2 border-gray-200 pl-4">
                  <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-gray-400"></div>
                  <h3 className="font-bold">{project.name}</h3>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{project.role}</span>
                    <span className="text-xs text-gray-600">
                      {project.startDate} - {project.endDate}
                    </span>
                  </div>
                  {project.url && <div className="text-xs text-blue-600">{project.url}</div>}
                  <p className="mt-2 whitespace-pre-line text-sm">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

