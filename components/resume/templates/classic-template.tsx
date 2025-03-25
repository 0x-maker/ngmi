export function ClassicTemplate({ data }) {
  const { personal, experience, education, skills, projects } = data

  return (
    <div className="flex flex-col bg-white p-8 text-sm">
      {/* Header */}
      <div className="mb-6 border-b-2 border-gray-800 pb-2 text-center">
        <h1 className="text-2xl font-bold uppercase tracking-wider">{personal.name || "Your Name"}</h1>
        <div className="mt-2 flex flex-wrap justify-center gap-x-3 text-sm">
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.address && <div>{personal.address}</div>}
          {personal.website && <div>{personal.website}</div>}
          {personal.linkedin && <div>{personal.linkedin}</div>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-bold uppercase">Professional Summary</h2>
          <p>{personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-bold uppercase">Work Experience</h2>
          <div className="space-y-4">
            {experience.map((job, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between">
                  <h3 className="font-bold">{job.position}</h3>
                  <span>
                    {job.startDate} - {job.endDate}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between">
                  <span className="font-semibold">{job.company}</span>
                  <span>{job.location}</span>
                </div>
                <p className="mt-1 whitespace-pre-line">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-bold uppercase">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between">
                  <h3 className="font-bold">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <span>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between">
                  <span className="font-semibold">{edu.institution}</span>
                  <span>{edu.location}</span>
                </div>
                {edu.description && <p className="mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-bold uppercase">Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between">
                  <h3 className="font-bold">
                    {project.name} {project.role && `- ${project.role}`}
                  </h3>
                  <span>
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
                {project.url && <div className="font-semibold">{project.url}</div>}
                <p className="mt-1 whitespace-pre-line">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <h2 className="mb-2 text-lg font-bold uppercase">Skills</h2>
          <p>{skills.join(", ")}</p>
        </div>
      )}
    </div>
  )
}

