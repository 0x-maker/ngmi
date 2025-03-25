export function ExecutiveTemplate({ data }) {
  const { personal, experience, education, skills, projects } = data

  return (
    <div className="flex flex-col bg-white p-8 text-sm">
      {/* Header */}
      <div className="mb-8 border-b-2 border-gray-800 pb-4 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest">{personal.name || "Your Name"}</h1>
        <div className="mt-3 flex flex-wrap justify-center gap-x-4 text-sm">
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.address && <div>{personal.address}</div>}
          {personal.website && <div>{personal.website}</div>}
          {personal.linkedin && <div>{personal.linkedin}</div>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="mb-8">
          <h2 className="mb-3 text-center text-xl font-bold uppercase tracking-wider">Executive Profile</h2>
          <p className="text-center leading-relaxed">{personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-center text-xl font-bold uppercase tracking-wider">Professional Experience</h2>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <div key={index}>
                <div className="mb-2 text-center">
                  <h3 className="text-lg font-bold">{job.company}</h3>
                  <p className="text-gray-600">
                    {job.location} | {job.startDate} - {job.endDate}
                  </p>
                </div>
                <p className="mb-2 text-center font-semibold italic">{job.position}</p>
                <p className="whitespace-pre-line text-sm leading-relaxed">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-center text-xl font-bold uppercase tracking-wider">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="text-center">
                <h3 className="font-bold">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>
                <p>
                  {edu.institution}, {edu.location}
                </p>
                <p className="text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </p>
                {edu.description && <p className="mt-1 text-sm">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-center text-xl font-bold uppercase tracking-wider">Core Competencies</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {skills.map((skill, index) => (
              <div key={index} className="rounded border border-gray-300 p-2 text-center">
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div>
          <h2 className="mb-4 text-center text-xl font-bold uppercase tracking-wider">Key Projects</h2>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="mb-2 text-center">
                  <h3 className="text-lg font-bold">{project.name}</h3>
                  <p className="text-gray-600">
                    {project.startDate} - {project.endDate}
                  </p>
                </div>
                <p className="mb-2 text-center font-semibold italic">{project.role}</p>
                {project.url && <p className="text-center text-blue-600">{project.url}</p>}
                <p className="whitespace-pre-line text-sm leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

