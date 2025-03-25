export function MinimalTemplate({ data }) {
  const { personal, experience, education, skills, projects } = data

  return (
    <div className="flex flex-col bg-white p-8 text-sm">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-medium">{personal.name || "Your Name"}</h1>
        <div className="mt-2 flex flex-wrap justify-center gap-x-3 text-sm text-gray-600">
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
          <p className="text-center">{personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-center text-lg font-medium">Experience</h2>
          <div className="space-y-4">
            {experience.map((job, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between">
                  <h3 className="font-medium">{job.position}</h3>
                  <span className="text-sm text-gray-600">
                    {job.startDate} - {job.endDate}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between">
                  <span>{job.company}</span>
                  <span className="text-sm text-gray-600">{job.location}</span>
                </div>
                <p className="mt-1 whitespace-pre-line text-sm">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-center text-lg font-medium">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between">
                  <h3 className="font-medium">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between">
                  <span>{edu.institution}</span>
                  <span className="text-sm text-gray-600">{edu.location}</span>
                </div>
                {edu.description && <p className="mt-1 text-sm">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-center text-lg font-medium">Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between">
                  <h3 className="font-medium">
                    {project.name} {project.role && `- ${project.role}`}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
                {project.url && <div className="text-sm">{project.url}</div>}
                <p className="mt-1 whitespace-pre-line text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <h2 className="mb-3 text-center text-lg font-medium">Skills</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="rounded-full border border-gray-200 px-3 py-1 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

